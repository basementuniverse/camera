import { vec } from '@basementuniverse/vec';

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
  return a < min ? min : (a > max ? max : a);
}

export default class Camera {
  private static readonly defaultOptions: CameraOptions = {
    allowScale: true,
    minScale: 0.5,
    maxScale: 4,
    moveEaseAmount: 0.1,
    scaleEaseAmount: 0.1,
  };

  private options: CameraOptions;

  private size: vec = vec();

  private _actualPosition: vec = vec();

  private targetPosition: vec = vec();

  private _actualScale: number = 1;

  private targetScale: number = 1;

  public constructor(position: vec, options?: Partial<CameraOptions>) {
    this._actualPosition = position;
    this.targetPosition = position;
    this.options = Object.assign(
      {},
      Camera.defaultOptions,
      options ?? {}
    );
  }

  public get position(): vec {
    return this.targetPosition;
  }

  public set position(value: vec) {
    this.targetPosition = value;
  }

  public set positionImmediate(value: vec) {
    this._actualPosition = value;
    this.targetPosition = value;
  }

  public get actualPosition(): vec {
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
      top: this._actualPosition.y - (this.size.y / 2) / this._actualScale,
      bottom: this._actualPosition.y + (this.size.y / 2) / this._actualScale,
      left: this._actualPosition.x - (this.size.x / 2) / this._actualScale,
      right: this._actualPosition.x + (this.size.x / 2) / this._actualScale
    };
  }

  /**
   * Convert a screen position to a world position
   */
  public positionToWorld(position: vec): vec {
    const bounds = this.bounds;

    return vec.add(
      { x: bounds.left, y: bounds.top },
      vec.mul(position, 1 / this.scale)
    );
  }

  /**
   * Update the camera
   */
  public update(screen: vec) {
    this.size = vec(screen);

    // Maybe clamp position to bounds
    if (this.options.bounds) {
      const screenScaled = vec.map(
        vec.mul(this.size, 1 / this._actualScale),
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

      const halfScreenScaled = vec.map(
        vec.mul(screenScaled, 1 / 2),
        Math.ceil
      );
      const minPosition = vec(
        actualBounds.left + halfScreenScaled.x,
        actualBounds.top + halfScreenScaled.y
      );
      const maxPosition = vec(
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

    const d = vec.sub(this._actualPosition, this.targetPosition);
    this._actualPosition = vec.add(this.position, vec.mul(d, this.options.moveEaseAmount));

    const s = clamp(this.targetScale, this.options.minScale, this.options.maxScale);
    this._actualScale = s + (this._actualScale - s) * this.options.scaleEaseAmount;
  }

  /**
   * Set the camera transforms on a canvas context
   */
  public setTransforms(context: CanvasRenderingContext2D) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(
      (this.size.x / 2) - this._actualPosition.x * this._actualScale,
      (this.size.y / 2) - this._actualPosition.y * this._actualScale
    );
    context.scale(this._actualScale, this._actualScale);
  }

  /**
   * Update the camera and then set transforms on a canvas context
   */
  public draw(context: CanvasRenderingContext2D, screen: vec) {
    this.update(screen);
    this.setTransforms(context);
  }
}
