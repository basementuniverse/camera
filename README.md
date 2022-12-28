# Game Component: Camera

A camera component for use in 2d browser games.

## How to use

Create a camera:

```ts
import Camera from '@basementuniverse/camera';

const camera = new Camera();
```

Update the camera transforms:

```ts
class Game {
  // ...

  public draw(context: CanvasRenderingContext2D) {
    context.save();

    // This updates context transforms based on the camera's position and scale
    this.camera.draw(context);

    // Draw everything else...

    context.restore();
  }
}
```

Move the camera by setting `camera.position`.

Zoom the camera by setting `camera.scale`.

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
} = camera.positionToWorld(screenPosition);
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
| `moveEaseAmount` | `number` | `0.9` | How quickly the camera moves to its target position |
| `scaleEaseAmount` | `number` | `0.9` | How quickly the camera zooms to its target scale |
