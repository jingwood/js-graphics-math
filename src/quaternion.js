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
    if (typeof x === 'object') {
      this.copyFrom(x);
    } else {
      this.x = x !== undefined ? x : 0;
      this.y = y !== undefined ? y : 0;
      this.z = z !== undefined ? z : 0;
      this.w = w !== undefined ? w : 1;
    }
  }

  copyFrom(qb) {
		this.x = qb.x;
		this.y = qb.y;
		this.z = qb.z;
		this.w = qb.w;

		return this;
  }
  
  _sq() {

  }

  length() {
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }

  normalize() {
    let len = this.length();

    if (len < Quaternion.Epsilon) {
      return Quaternion.Zero;
    }

    len = 1 / len;

    this.x *= len;
    this.y *= len;
    this.z *= len;
    this.w *= len;
  }

  /*
   * copy from threejs
   * https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js
   */
  slerp(qb, t) {

    if (t === 0) return this;
    if (t === 1) return this.copyFrom(qb);

    const x = this.x, y = this.y, z = this.z, w = this.w;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    let cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

    if (cosHalfTheta < 0) {
      this.w = - qb.w;
      this.x = - qb.x;
      this.y = - qb.y;
      this.z = - qb.z;

      cosHalfTheta = - cosHalfTheta;
    } else {
      this.copyFrom(qb);
    }

    if (cosHalfTheta >= 1.0) {
      this.w = w;
      this.x = x;
      this.y = y;
      this.z = z;

      return this;
    }

    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      this.w = s * w + t * this.w;
      this.x = s * x + t * this.x;
      this.y = s * y + t * this.y;
      this.z = s * z + t * this.z;

      this.normalize();
      // this._onChangeCallback();

      return this;
    }

    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
      ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this.w = (w * ratioA + this.w * ratioB);
    this.x = (x * ratioA + this.x * ratioB);
    this.y = (y * ratioA + this.y * ratioB);
    this.z = (z * ratioA + this.z * ratioB);

    // this._onChangeCallback();
    return this;
  }

  // multiply(q) {
  //   return this.perfromMultiply(this, q);
  // }

  // premultiply(q) {
  //   return this.perfromMultiply(q, this);
  // }

	static multiply(a, b) {
		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		const qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
		const qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

		const x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		const y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		const z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    const w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    
    return new Quaternion(x, y, z, w);
	}

  toMatrix() {
    // https://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToMatrix/index.htm

    const q = this;

    const sqw = q.w * q.w;
    const sqx = q.x * q.x;
    const sqy = q.y * q.y;
    const sqz = q.z * q.z;

    // invs (inverse square length) is only required if quaternion is not already normalised
    const invs = 1 / (sqx + sqy + sqz + sqw);
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

Quaternion.Epsilon = 0.000001;
Quaternion.Zero = new Quaternion(0, 0, 0, 0);
Quaternion.One = new Quaternion(0, 0, 0, 1);