![npm](https://img.shields.io/npm/v/@jingwood/graphics-math.svg)

# js-graphics-math

Math library for JavaScript 2D/3D graphics rendering.

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

- tarumae-viewer - Optimized WebGL engine for Showcase application<br/>
  [https://github.com/bulbinc/tarumae-viewer](https://github.com/bulbinc/tarumae-viewer)

# Related Libraries

- cpp-graphics-module (A C++ version of this library)<br/>
  [https://github.com/jingwood/cpp-graphics-module](https://github.com/jingwood/cpp-graphics-module)

# License

Released under MIT License.

Copyright (C) Jingwood & unvell.com, all rights reserved.
