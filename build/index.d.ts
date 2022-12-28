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
export default class Camera {
    private static readonly defaultOptions;
    private options;
    private size;
    private actualPosition;
    private actualScale;
    private targetScale;
    position: vec;
    constructor(position: vec, options?: Partial<CameraOptions>);
    get scale(): number;
    set scale(value: number);
    /**
     * Get screen bounds based on the current camera position and scale
     */
    get bounds(): CameraBounds;
    /**
     * Convert a screen position to a world position
     */
    positionToWorld(position: vec): vec;
    /**
     * Update context transforms to match camera position and scale
     */
    draw(context: CanvasRenderingContext2D, width: number, height: number): void;
}
