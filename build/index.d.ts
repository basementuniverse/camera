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
export default class Camera {
    private static readonly DEFAULT_OPTIONS;
    private options;
    private size;
    private _actualPosition;
    private targetPosition;
    private _actualScale;
    private targetScale;
    constructor(position: vec2, options?: Partial<CameraOptions>);
    get position(): vec2;
    set position(value: vec2);
    set positionImmediate(value: vec2);
    get actualPosition(): vec2;
    get scale(): number;
    get actualScale(): number;
    set scale(value: number);
    set scaleImmediate(value: number);
    /**
     * Get screen bounds based on the current camera position and scale
     */
    get bounds(): CameraBounds;
    /**
     * Convert a screen position to a world position
     */
    screenToWorld(position: vec2): vec2;
    /**
     * Convert a world position to a screen position
     */
    worldToScreen(position: vec2): vec2;
    /**
     * Update the camera
     */
    update(screen: vec2): void;
    /**
     * Set the camera transforms on a canvas context
     */
    setTransforms(context: CanvasRenderingContext2D): void;
    /**
     * Update the camera and then set transforms on a canvas context
     */
    draw(context: CanvasRenderingContext2D, screen: vec2): void;
}
