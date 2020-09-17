////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Matrix4 } from "./matrix4.js";

// Experimental!!
export class Quaternion {

  constructor(x, y, z, w) {
    this.x = x !== undefined ? x : 0;
    this.y = y !== undefined ? y : 0;
    this.z = z !== undefined ? z : 0;
    this.w = w !== undefined ? w : 1;

  }

  toMatrix() {
    // https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToMatrix/index.htm

    const q = this;

    const sqw = q.w * q.w;
    const sqx = q.x * q.x;
    const sqy = q.y * q.y;
    const sqz = q.z * q.z;

    // invs (inverse square length) is only required if quaternion is not already normalised
    const invs = 1 / (sqx + sqy + sqz + sqw)
    const m00 = (sqx - sqy - sqz + sqw) * invs; // since sqw + sqx + sqy + sqz =1/invs*invs
    const m11 = (-sqx + sqy - sqz + sqw) * invs;
    const m22 = (-sqx - sqy + sqz + sqw) * invs;
    
    let tmp1 = q.x * q.y;
    let tmp2 = q.z * q.w;
    const m10 = 2.0 * (tmp1 + tmp2) * invs;
    const m01 = 2.0 * (tmp1 - tmp2) * invs;
    
    tmp1 = q.x * q.z;
    tmp2 = q.y * q.w;
    const m20 = 2.0 * (tmp1 - tmp2) * invs;
    const m02 = 2.0 * (tmp1 + tmp2) * invs;
    tmp1 = q.y * q.z;
    tmp2 = q.x * q.w;
    const m21 = 2.0 * (tmp1 + tmp2) * invs;
    const m12 = 2.0 * (tmp1 - tmp2) * invs;

    const mat = new Matrix4();
    mat.a1 = m00; mat.b1 = m10; mat.c1 = m20; mat.d1 = 0;
    mat.a2 = m01; mat.b2 = m11; mat.c2 = m21; mat.d2 = 0;
    mat.a3 = m02; mat.b3 = m12; mat.c3 = m22; mat.d3 = 0;
    mat.a4 = 0; mat.b4 = 0; mat.c4 = 0; mat.d4 = 1;
    
    return mat;
  }
};