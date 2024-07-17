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
export default class Camera {
    private static readonly defaultOptions;
    private options;
    private size;
    private _actualPosition;
    private targetPosition;
    private _actualScale;
    private targetScale;
    constructor(position: vec, options?: Partial<CameraOptions>);
    get position(): vec;
    set position(value: vec);
    set positionImmediate(value: vec);
    get actualPosition(): vec;
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
    positionToWorld(position: vec): vec;
    /**
     * Update context transforms to match camera position and scale
     */
    draw(context: CanvasRenderingContext2D, screen: vec): void;
}
