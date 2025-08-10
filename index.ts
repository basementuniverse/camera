import { vec2 } from '@basementuniverse/vec';

export type CameraOptions = {
  /**
   * Optionally restrict camera position to bounds
   */
  bounds?: CameraBounds;

  /**
   * Allow the viewport to be scaled
   */
  allowScale: boolean;

  /**
   * Minimum viewport scale
   */
  minScale: number;

  /**
   * Maximum viewport scale
   */
  maxScale: number;

  /**
   * Camera movement ease amount
   *
   * Set to 0 for no easing
   */
  moveEaseAmount: number;

  /**
   * Camera scaling ease amount
   *
   * Set to 0 for no easing
   */
  scaleEaseAmount: number;
};

export type CameraBounds = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

function clamp(a: number, min = 0, max = 1) {
  return a < min ? min : a > max ? max : a;
}

export default class Camera {
  private static readonly DEFAULT_OPTIONS: CameraOptions = {
    allowScale: true,
    minScale: 0.5,
    maxScale: 4,
    moveEaseAmount: 0.1,
    scaleEaseAmount: 0.1,
  };

  private options: CameraOptions;
  private size: vec2 = vec2();
  private _actualPosition: vec2 = vec2();
  private targetPosition: vec2 = vec2();
  private _actualScale: number = 1;
  private targetScale: number = 1;

  public constructor(position: vec2, options?: Partial<CameraOptions>) {
    this._actualPosition = position;
    this.targetPosition = position;
    this.options = Object.assign({}, Camera.DEFAULT_OPTIONS, options ?? {});
  }

  public get position(): vec2 {
    return this.targetPosition;
  }

  public set position(value: vec2) {
    this.targetPosition = value;
  }

  public set positionImmediate(value: vec2) {
    this._actualPosition = value;
    this.targetPosition = value;
  }

  public get actualPosition(): vec2 {
    return this._actualPosition;
  }

  public get scale(): number {
    return this.targetScale;
  }

  public get actualScale(): number {
    return this._actualScale;
  }

  public set scale(value: number) {
    this.targetScale = clamp(
      value,
      this.options.minScale,
      this.options.maxScale
    );
  }

  public set scaleImmediate(value: number) {
    this._actualScale = clamp(
      value,
      this.options.minScale,
      this.options.maxScale
    );
    this.targetScale = this._actualScale;
  }

  /**
   * Get screen bounds based on the current camera position and scale
   */
  public get bounds(): CameraBounds {
    return {
      top: this._actualPosition.y - this.size.y / 2 / this._actualScale,
      bottom: this._actualPosition.y + this.size.y / 2 / this._actualScale,
      left: this._actualPosition.x - this.size.x / 2 / this._actualScale,
      right: this._actualPosition.x + this.size.x / 2 / this._actualScale,
    };
  }

  /**
   * Convert a screen position to a world position
   */
  public screenToWorld(position: vec2): vec2 {
    const bounds = this.bounds;

    return vec2.add(
      { x: bounds.left, y: bounds.top },
      vec2.mul(position, 1 / this.actualScale)
    );
  }

  /**
   * Convert a world position to a screen position
   */
  public worldToScreen(position: vec2): vec2 {
    const bounds = this.bounds;

    return vec2.mul(
      vec2.sub(position, { x: bounds.left, y: bounds.top }),
      this.actualScale
    );
  }

  /**
   * Update the camera
   */
  public update(screen: vec2) {
    this.size = vec2(screen);

    // Maybe clamp position to bounds
    if (this.options.bounds) {
      const screenScaled = vec2.map(
        vec2.mul(this.size, 1 / this._actualScale),
        Math.ceil
      );

      // If the scaled screen size is larger than allowed bounds, we resize
      // the bounds to prevent jittering
      const actualBounds = {
        ...this.options.bounds,
      };
      if (screenScaled.x > actualBounds.right - actualBounds.left) {
        const boundsWidth = actualBounds.right - actualBounds.left;
        const halfDiff = (screenScaled.x - boundsWidth) / 2;
        actualBounds.left -= halfDiff;
        actualBounds.right += halfDiff;
      }
      if (screenScaled.y > actualBounds.bottom - actualBounds.top) {
        const boundsHeight = actualBounds.bottom - actualBounds.top;
        const halfDiff = (screenScaled.y - boundsHeight) / 2;
        actualBounds.top -= halfDiff;
        actualBounds.bottom += halfDiff;
      }

      const halfScreenScaled = vec2.map(
        vec2.mul(screenScaled, 1 / 2),
        Math.ceil
      );
      const minPosition = vec2(
        actualBounds.left + halfScreenScaled.x,
        actualBounds.top + halfScreenScaled.y
      );
      const maxPosition = vec2(
        actualBounds.right - halfScreenScaled.x,
        actualBounds.bottom - halfScreenScaled.y
      );

      this.targetPosition.x = clamp(
        this.targetPosition.x,
        minPosition.x,
        maxPosition.x
      );
      this.targetPosition.y = clamp(
        this.targetPosition.y,
        minPosition.y,
        maxPosition.y
      );
    }

    const d = vec2.sub(this._actualPosition, this.targetPosition);
    this._actualPosition = vec2.add(
      this.position,
      vec2.mul(d, this.options.moveEaseAmount)
    );

    const s = clamp(
      this.targetScale,
      this.options.minScale,
      this.options.maxScale
    );
    this._actualScale =
      s + (this._actualScale - s) * this.options.scaleEaseAmount;
  }

  /**
   * Set the camera transforms on a canvas context
   */
  public setTransforms(context: CanvasRenderingContext2D) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(
      this.size.x / 2 - this._actualPosition.x * this._actualScale,
      this.size.y / 2 - this._actualPosition.y * this._actualScale
    );
    context.scale(this._actualScale, this._actualScale);
  }

  /**
   * Update the camera and then set transforms on a canvas context
   */
  public draw(context: CanvasRenderingContext2D, screen: vec2) {
    this.update(screen);
    this.setTransforms(context);
  }
}
