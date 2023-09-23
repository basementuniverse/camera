import { vec } from '@basementuniverse/vec';

export type CameraOptions = {
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
   */
  moveEaseAmount: number;

  /**
   * Camera scaling ease amount
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
    moveEaseAmount: 0.9,
    scaleEaseAmount: 0.9,
  };

  private options: CameraOptions;

  private size: vec = vec();

  private actualPosition: vec = vec();

  private actualScale: number = 1;

  private targetScale: number = 1;

  public position: vec = vec();

  public constructor(position: vec, options?: Partial<CameraOptions>) {
    this.position = position;
    this.actualPosition = position;
    this.options = Object.assign(
      {},
      Camera.defaultOptions,
      options ?? {}
    );
  }

  public get scale(): number {
    return this.targetScale;
  }

  public set scale(value: number) {
    this.targetScale = clamp(value, this.options.minScale, this.options.maxScale);
  }

  /**
   * Get screen bounds based on the current camera position and scale
   */
  public get bounds(): CameraBounds {
    return {
      top: this.position.y - (this.size.y / 2) / this.scale,
      bottom: this.position.y + (this.size.y / 2) / this.scale,
      left: this.position.x - (this.size.x / 2) / this.scale,
      right: this.position.x + (this.size.x / 2) / this.scale
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
   * Update context transforms to match camera position and scale
   */
  public draw(context: CanvasRenderingContext2D, width: number, height: number) {
    this.size = vec(width, height);

    const d = vec.sub(this.actualPosition, this.position);
    this.actualPosition = vec.add(this.position, vec.mul(d, this.options.moveEaseAmount));

    const s = clamp(this.targetScale, this.options.minScale, this.options.maxScale);
    this.actualScale = s + (this.actualScale - s) * (1 - this.options.scaleEaseAmount);

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(
      (this.size.x / 2) - this.actualPosition.x * this.actualScale,
      (this.size.y / 2) - this.actualPosition.y * this.actualScale
    );
    context.scale(this.actualScale, this.actualScale);
  }
}
