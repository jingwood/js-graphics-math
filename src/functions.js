////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

const { EPSILON, PIAngleDelta } = require( "./const.js")

function approxiEquals(v1, v2, epsilon = EPSILON) {
  if (v1 === v2) return true;
  return Math.abs(v1 - v2) < epsilon;
}

class MathFunctions {
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

  static clamp(v, min = 0, max = 1) {
    if (!isNaN(v)) {
      if (v < min) return min;
      else if (v > max) return max;
      else return v;
    }
    
    return v;
  }

  static smoothstep(edge0, edge1, x) {
    var t = MathFunctions.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  } 
}

module.exports = { approxiEquals, MathFunctions };