![https://www.npmjs.com/package/@jingwood/graphics-math](https://img.shields.io/npm/v/@jingwood/graphics-math.svg)

# js-graphics-math

Math library for JavaScript 2D/3D graphics rendering.

# Installation

```sh
npm install @jingwood/graphics-math
```

# Usage

The package is published as native ES modules with no dependencies. It works as-is in modern browsers, Node.js, and bundlers.

```js
import { Vec3, Matrix4 } from "@jingwood/graphics-math";

const v = new Vec3(1, 2, 3).add(new Vec3(4, 5, 6));   // [5, 7, 9]
const m = new Matrix4().loadIdentity().rotateY(90);
const rotated = v.mulMat(m);                           // [9, 7, -5]
```

## Migrating from 1.x

- The source is no longer transpiled by Babel, and `@babel/runtime` is no longer a dependency. If you need to support legacy browsers, transpile the package in your own build.
- Only the package root (`@jingwood/graphics-math`) can be imported. Deep imports such as `@jingwood/graphics-math/dist/...` are no longer available.

# Development

Tests use the built-in Node.js test runner (Node.js 22 or later). No install step is needed.

```sh
npm test
```

# Classes

The following classes available under [src](src) folder.

- [Vector2](src/vec2.js)
- [Vector3](src/vec3.js)
- [Matrix3](src/matrix3.js)
- [Matrix4](src/matrix4.js)
- [Quaternion](src/quaternion.js)
- [BoundingBox 2D](src/bbox2.js)
- [BoundingBox 3D](src/bbox3.js)
- KDTree for 2D points
- KDTree for 3D points
- KDTree for 3D triangles
- [OCTree for 3D triangles](src/spacetree.js)
- [Ray](src/ray.js)
- [Color3 (RGB)](src/color3.js)
- [Color4 (RGBA)](src/color4.js)

# Functions

Functions below available at [src/functions.js](src/functions.js).

## Base math functions

- clamp (1D/2D/3D)
- smoothstep
- angleToArc

## Distance measuring

- distancePointToPoint (2D/3D)
- distancePointToLine (2D)
- distancePointToLineSegment (2D)
- distancePointToRect (2D)
- distancePointToPolygon (2D)
- findNearestPointToLineSegement (2D)
- findNearestPointToPolygon (2D)

## Intersecting test

- lineIntersectsLine (2D)
- lineIntersectsRect (2D)
- lineIntersectsPolygon (2D)
- rectIntersectsRect (2D)
- rectIntersectsPolygon (2D)
- checkLineParallel

## Containing test

- rectContainsPoint (2D)
- triangleContainsPoint (2D)
- polygonContainsPoint (2D)
- polygonContainsRect (2D)
- calcPolygonArea (2D)

## Ray test

- rayIntersectsPlane (3D)
- rayIntersectsTriangle (3D)
- rayIntersectsSphere (3D)
- rayIntersectsBox (3D)

## Vertex interpolation

- **calcVertexInterpolation (3D)**
  Calculate the interpolated vertex coordinate on a specified point of a 3D triangle with vertex coordinates.

# Software uses this library

- Yotei3D - A lightweight WebGL-based 3D rendering engine designed with simplicity and ease of use in mind—even for users with minimal 3D programming experience.<br/>
  [https://github.com/unvell/yotei3d](https://github.com/unvell/yotei3d)

# Related Libraries

- cpp-graphics-module (A C++ version of this library)<br/>
  [https://github.com/jingwood/cpp-graphics-module](https://github.com/jingwood/cpp-graphics-module)

# License

Released under MIT License.

Copyright (C) Jingwood & unvell.com, all rights reserved.
