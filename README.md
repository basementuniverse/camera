# Game Component: Camera

A camera component for use in 2d browser games.

## Installation

```bash
npm install @basementuniverse/camera
```

## How to use

Create a camera:

```ts
import Camera from '@basementuniverse/camera';

const camera = new Camera();
```

Update the camera transforms:

```ts
class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private camera: Camera;

  public constructor() {
    this.camera = new Camera();
  }

  public update() {
    // We should update the camera every frame...
    this.camera.update({
      x: this.canvas.width,
      y: this.canvas.height,
    });
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save();

    // This applies the camera's transforms...
    this.camera.setTransforms(context);

    // Draw everything else...

    context.restore();
  }
}
```

Move the camera by setting `camera.position`.

Get the camera's current "real" position (after easing) by reading `camera.actualPosition`.

Snap the camera to a new position (without easing) by setting `camera.positionImmediate`.

Zoom the camera by setting `camera.scale`.

Get the camera's current "real" zoom level (after easing) by reading `camera.actualScale`.

Snap the camera to a new zoom level (without easing) by setting `camera.scaleImmediate`.

Fetch the camera's world-space bounds:

```ts
const bounds: {
  top: number;
  bottom: number;
  left: number;
  right: number;
} = camera.bounds;
```

Convert a screen-space position to world-space:

```ts
const worldPosition: {
  x: number;
  y: number;
} = camera.screenToWorld(screenPosition);
```

Convert a world-space position to screen-space:

```ts
const screenPosition: {
  x: number;
  y: number;
} = camera.worldToScreen(worldPosition);
```

## Options

```ts
const options = { ... };
const camera = new Camera(options);
```

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `allowScale` | `boolean` | `true` | Allow the camera to zoom |
| `minScale` | `number` | `0.5` | Minimum zoom level |
| `maxScale` | `number` | `4` | Maximum zoom level |
| `moveEaseAmount` | `number` | `0.1` | Position easing amount, set to 0 for no easing |
| `scaleEaseAmount` | `number` | `0.1` | Scale easing amount, set to 0 for no easing |
| `bounds` | `Bounds` | `undefined` | Optional movement bounds |

```ts
type Bounds = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};
```

## Backwards compatibility

This camera component used to work like so:

```ts
class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private camera: Camera;

  public constructor() {
    this.camera = new Camera();
  }

  public update() {
    // ...
  }

  public draw(context: CanvasRenderingContext2D) {
    context.save();

    this.camera.draw(context, { x: this.canvas.width, y: this.canvas.height });

    // Draw everything else...

    context.restore();
  }
}
```

More specifically, it had a `draw()` method which updated the camera's internal state _and_ applied the context transforms all in one go.

This method still exists for backwards compatibility, but it is now deprecated and might be removed in a future version.
