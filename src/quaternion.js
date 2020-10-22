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
   * original code copied from threejs
   * https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js
   * http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
   */
  static slerp(qa, qb, t) {

    if (t === 0) return qa;
    if (t === 1) return qb;

    const { x, y, z, w } = qa;
    let _x = x, _y = y, _z = z, _w = w;

    let cosHalfTheta = x * qb.x + y * qb.y + z * qb.z + w * qb.w;

    if (cosHalfTheta < 0) {
      _x = -qb.x;
      _y = -qb.y;
      _z = -qb.z;
      _w = -qb.w;

      cosHalfTheta = -cosHalfTheta;
    } else {
      _x = qb.x; _y = qb.y; _z = qb.z; _w = qb.w;
    }

    if (cosHalfTheta >= 1.0) {
      return new Quaternion(_x, _y, _z, _w);
    }

    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      _x = s * x + t * _x;
      _y = s * y + t * _y;
      _z = s * z + t * _z;
      _w = s * w + t * _w;

      return new Quaternion(_x, _y, _z, _w).normalize();
    }

    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
      ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    _x = (x * ratioA + this.x * ratioB);
    _y = (y * ratioA + this.y * ratioB);
    _z = (z * ratioA + this.z * ratioB);
    _w = (w * ratioA + this.w * ratioB);

    // this._onChangeCallback();
    return new Quaternion(_x, _y, _z, _w);
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