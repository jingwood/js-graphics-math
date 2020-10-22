////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { EPSILON } from "./const.js";
import { Matrix4 } from "./matrix4.js";

// Experimental!!
export class Quaternion {

  constructor(x, y, z, w) {
    if (typeof x === 'object') {
      this.copyFrom(x);
    } else {
      this.x = !isNaN(x) ? x : 0;
      this.y = !isNaN(y) ? y : 0;
      this.z = !isNaN(z) ? z : 0;
      this.w = !isNaN(w) ? w : 1;
    }
  }

  copyFrom(q2) {
		this.x = q2.x;
		this.y = q2.y;
		this.z = q2.z;
		this.w = q2.w;

		return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }

  normalize() {
    let len = this.length();

    if (len < EPSILON) {
      return Quaternion.Zero;
    }

    len = 1 / len;

    this.x *= len;
    this.y *= len;
    this.z *= len;
    this.w *= len;

    return this;
  }
  
  inverse() {
		this.x *= - 1;
		this.y *= - 1;
    this.z *= - 1;

    return this;
  }

  static inverse(q) {
    return new Quaternion(q.x * -1, q.y * -1, q.z * -1, q.w);
  }
  
  /*
   * original code copied from threejs
   * https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js
   * http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
   */
  static slerp(q1, q2, t) {

    if (t === 0) return q1;
    if (t === 1) return q2;

    const { x, y, z, w } = q1;
    let _x = x, _y = y, _z = z, _w = w;

    let cosHalfTheta = x * q2.x + y * q2.y + z * q2.z + w * q2.w;

    if (cosHalfTheta < 0) {
      _x = -q2.x;
      _y = -q2.y;
      _z = -q2.z;
      _w = -q2.w;

      cosHalfTheta = -cosHalfTheta;
    } else {
      _x = q2.x; _y = q2.y; _z = q2.z; _w = q2.w;
    }

    if (cosHalfTheta >= 1.0) {
      return new Quaternion(_x, _y, _z, _w);
    }

    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= EPSILON) {
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

    _x = (x * ratioA + _x * ratioB);
    _y = (y * ratioA + _y * ratioB);
    _z = (z * ratioA + _z * ratioB);
    _w = (w * ratioA + _w * ratioB);

    // this._onChangeCallback();
    return new Quaternion(_x, _y, _z, _w);
  }

  static add(q1, q2) {
    return new Quaternion(q1.x + q2.x, q1.y + q2.y, q1.z + q2.z, q1.w + q2.w);
  }

  // multiply(q) {
  //   return this.perfromMultiply(this, q);
  // }

  // premultiply(q) {
  //   return this.perfromMultiply(q, this);
  // }

	static mul(q1, q2) {
		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    const x =  q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
    const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
    const z =  q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
    const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;

    return new Quaternion(x, y, z, w);
	}

  // original code copied from threejs
  // https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js
  //
  setFromEuler(euler, order = 'XYZ') {

    if (typeof euler !== 'object') {
      throw new Error('Quaternion.setFromEuler() expects an object contains x, y, z properties');
    }

    const { x, y, z } = euler;

    // http://www.mathworks.com/matlabcentral/fileexchange/
    // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
    //	content/SpinCalc.m

    const cos = Math.cos;
    const sin = Math.sin;

    const c1 = cos(x / 2);
    const c2 = cos(y / 2);
    const c3 = cos(z / 2);

    const s1 = sin(x / 2);
    const s2 = sin(y / 2);
    const s3 = sin(z / 2);

    switch (order) {

      case 'XYZ':
        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'YXZ':
        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      case 'ZXY':
        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'ZYX':
        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      case 'YZX':
        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 + s1 * c2 * s3;
        this.z = c1 * c2 * s3 - s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;
        break;

      case 'XZY':
        this.x = s1 * c2 * c3 - c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 + s1 * s2 * s3;
        break;

      default:
        console.warn('Quaternion: .setFromEuler() encountered an unknown order: ' + order);
        break;
    }

    return this;
  }
  
  static fromEuler(euler, order = 'XYZ') {
    const q = new Quaternion();
    q.setFromEuler(euler, order);
    return q;
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

Quaternion.Zero = new Quaternion(0, 0, 0, 1);