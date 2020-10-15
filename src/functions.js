////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Vec2 } from "./vec2.js"
import { Vec3 } from "./vec3.js"
import { Vec4 } from "./vec4.js"
import { MathFunctions3 } from "./functions3.js";
import { MathFunctions2 } from "./functions2.js";
import { EPSILON, PIAngleDelta } from "./const.js";

export function approxiEquals(v1, v2, epsilon = EPSILON) {
  if (v1 === v2) return true;
  return Math.abs(v1 - v2) < epsilon;
}

export class MathFunctions {
  static degreeToAngle(d) {
    return d * 180.0 / Math.PI;
  }

  static angleToDegree(a) {
    return a * PIAngleDelta;
  }

  static fixAngle(angle) {
    if (angle < 0) {
      while (angle < 0) angle += 360;
    } else {
      while (angle > 360) angle -= 360;
    }
    return angle;
  }
  
  static angleToArc(width, height, angle) {
    return (180.0 / Math.PI * Math.atan2(
      Math.sin(angle * PIAngleDelta) * height / width,
      Math.cos(angle * PIAngleDelta)));
  }

  static abs(v) {
    if (v instanceof Vec3) {
      return new Vec3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
    }
  }

  static clamp(v, min = 0, max = 1) {
    if (!isNaN(v)) {
      if (v < min) return min;
      else if (v > max) return max;
      else return v;
    } else if (v instanceof Vec2) {
      return MathFunctions2.clamp2(v, min, max);
    } else if (v instanceof Vec3) {
      return MathFunctions3.clamp3(v, min, max);
    } else if (v instanceof Vec4) {
      return new Vec4(MathFunctions.clamp(v.x, min, max),
        MathFunctions.clamp(v.y, min, max),
        MathFunctions.clamp(v.z, min, max),
        MathFunctions.clamp(v.w, min, max));
    }
  }

  static smoothstep(edge0, edge1, x) {
    var t = MathFunctions.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  } 
}