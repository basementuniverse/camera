# API Reference

Package: `@basementuniverse/camera`

## Browser usage

For direct browser usage, load `build/index.js` with a `<script>` tag and use
the namespaced global:

```html
<script src="build/index.js"></script>
<script>
	const instance = new BasementUniverseCamera(/* ... */);
</script>
```

The UMD build supports CommonJS `require()` and bundlers, but native ESM
imports require a separate ESM build that this package does not currently ship.

## Export

The module uses `export = Camera`, so the package itself *is* the `Camera`
class:

```ts
import Camera from '@basementuniverse/camera';
```

```js
const Camera = require('@basementuniverse/camera');
```

Its types are reachable through the merged namespace: `Camera.CameraOptions`
and `Camera.CameraBounds`.

## Constructor

```ts
new Camera(position: vec2, options?: Partial<CameraOptions>)
```

- `position`: Initial camera world position.
- `options`: Optional settings merged with defaults.

## Properties

- `position: vec2` (get/set)
  - Target position used for easing.
- `positionImmediate: vec2` (set)
  - Instantly sets both target and actual position.
- `actualPosition: vec2` (get)
  - Current interpolated camera position.
- `scale: number` (get/set)
  - Target scale; clamped to `minScale` and `maxScale`.
- `scaleImmediate: number` (set)
  - Instantly sets both target and actual scale (clamped).
- `actualScale: number` (get)
  - Current interpolated scale.
- `bounds: CameraBounds` (get)
  - Current visible world rectangle from actual position/scale.

## Methods

- `update(screen: vec2): void`
  - Updates viewport size and applies easing/clamping.
  - Call once per frame before `setTransforms`.
- `setTransforms(context: CanvasRenderingContext2D): void`
  - Resets and applies camera transform to the canvas context.
- `screenToWorld(position: vec2): vec2`
  - Converts canvas/screen coordinates to world coordinates.
- `worldToScreen(position: vec2): vec2`
  - Converts world coordinates to canvas/screen coordinates.
- `draw(context: CanvasRenderingContext2D, screen: vec2): void` (deprecated)
  - Compatibility method equivalent to `update(screen)` then `setTransforms(context)`.

## Defaults

- `allowScale: true`
- `minScale: 0.5`
- `maxScale: 4`
- `moveEaseAmount: 0.1`
- `scaleEaseAmount: 0.1`

## Notes

- `allowScale` exists in the options type but is not currently used to gate scaling behavior in implementation.
