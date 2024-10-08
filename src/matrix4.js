////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Vec3 } from "./vec3.js";
import { approxiEquals, MathFunctions } from "./functions.js";
import { EPSILON } from "./const.js";
import { Vec4 } from "./vec4.js";

export class Matrix4 {
	constructor(copySource) {
		this.arr = new Array(16);

		if (copySource) {
			this.copyFrom(copySource);
		}

		return this;
	}

	loadIdentity() {
		this.a1 = 1; this.b1 = 0; this.c1 = 0; this.d1 = 0;
		this.a2 = 0; this.b2 = 1; this.c2 = 0; this.d2 = 0;
		this.a3 = 0; this.b3 = 0; this.c3 = 1; this.d3 = 0;
		this.a4 = 0; this.b4 = 0; this.c4 = 0; this.d4 = 1;

		return this;
	}

	copyFrom(m) {
		this.a1 = m.a1; this.b1 = m.b1; this.c1 = m.c1; this.d1 = m.d1;
		this.a2 = m.a2; this.b2 = m.b2; this.c2 = m.c2; this.d2 = m.d2;
		this.a3 = m.a3; this.b3 = m.b3; this.c3 = m.c3; this.d3 = m.d3;
		this.a4 = m.a4; this.b4 = m.b4; this.c4 = m.c4; this.d4 = m.d4;

		return this;
	}

	clone() {
		return new Matrix4(this);
	}

	/*
	 * Makes a rotation matrix by given euler angles and multiplies by this matrix.
	 */
	rotate(x, yOrOrder = 'XYZ', z, order = 'XYZ') {

		if (typeof x === 'object') {
			order = yOrOrder || 'xyz';

			switch (order) {
				case 'XYZ':
					this.rotateX(x.x);
					this.rotateY(x.y);
					this.rotateZ(x.z);
					break;

				case 'XZY':
					this.rotateX(x.x);
					this.rotateZ(x.z);
					this.rotateY(x.y);
					break;

				case 'YXZ':
					this.rotateY(x.y);
					this.rotateX(x.x);
					this.rotateZ(x.z);
					break;

				case 'YZX':
					this.rotateY(x.y);
					this.rotateZ(x.z);
					this.rotateX(x.x);
					break;

				case 'ZXY':
					this.rotateZ(x.z);
					this.rotateX(x.x);
					this.rotateY(x.y);
					break;

				case 'ZYX':
					this.rotateZ(x.z);
					this.rotateY(x.y);
					this.rotateX(x.x);
					break;
			}
		} else if (!isNaN(x) && !isNaN(yOrOrder) && !isNaN(z)) {
			const y = yOrOrder;

			switch (order) {
				case 'XYZ':
					this.rotateX(x);
					this.rotateY(y);
					this.rotateZ(z);
					break;

				case 'XZY':
					this.rotateX(x);
					this.rotateZ(z);
					this.rotateY(y);
					break;

				case 'ZYX':
					this.rotateZ(z);
					this.rotateY(y);
					this.rotateX(x);
					break;

				case 'ZXY':
					this.rotateZ(z);
					this.rotateX(x);
					this.rotateY(y);
					break;

				case 'YXZ':
					this.rotateY(y);
					this.rotateX(x);
					this.rotateZ(z);
					break;

				case 'YZX':
					this.rotateY(y);
					this.rotateZ(z);
					this.rotateX(x);
					break;
			}
		}

		// TODO: Need to be optimized by combining Rx Ry Rz calculation
		// this.rotateCombine(x, y, z);

		return this;
	}

	rotateX(angle) {
		if (angle === 0) return this;

		const d = MathFunctions.angleToDegree(angle);

		const sin = Math.sin(d);
		const cos = Math.cos(d);

		const m2b2 = cos, m2c2 = sin;
		const m2b3 = -sin, m2c3 = cos;

		const a2 = this.a2 * m2b2 + this.a3 * m2c2;
		const b2 = this.b2 * m2b2 + this.b3 * m2c2;
		const c2 = this.c2 * m2b2 + this.c3 * m2c2;
		const d2 = this.d2 * m2b2 + this.d3 * m2c2;

		const a3 = this.a2 * m2b3 + this.a3 * m2c3;
		const b3 = this.b2 * m2b3 + this.b3 * m2c3;
		const c3 = this.c2 * m2b3 + this.c3 * m2c3;
		const d3 = this.d2 * m2b3 + this.d3 * m2c3;

		this.a2 = a2; this.b2 = b2; this.c2 = c2; this.d2 = d2;
		this.a3 = a3; this.b3 = b3; this.c3 = c3; this.d3 = d3;

		return this;
	}

	rotateY(angle) {
		if (angle === 0) return this;

		const d = MathFunctions.angleToDegree(angle);

		const sin = Math.sin(d);
		const cos = Math.cos(d);

		const m2a1 = cos, m2c1 = -sin;
		const m2a3 = sin, m2c3 = cos;

		const a1 = this.a1 * m2a1 + this.a3 * m2c1;
		const b1 = this.b1 * m2a1 + this.b3 * m2c1;
		const c1 = this.c1 * m2a1 + this.c3 * m2c1;
		const d1 = this.d1 * m2a1 + this.d3 * m2c1;

		const a3 = this.a1 * m2a3 + this.a3 * m2c3;
		const b3 = this.b1 * m2a3 + this.b3 * m2c3;
		const c3 = this.c1 * m2a3 + this.c3 * m2c3;
		const d3 = this.d1 * m2a3 + this.d3 * m2c3;

		this.a1 = a1; this.b1 = b1; this.c1 = c1; this.d1 = d1;
		this.a3 = a3; this.b3 = b3; this.c3 = c3; this.d3 = d3;

		return this;
	}

	rotateZ(angle) {
		if (angle === 0) return this;

		const d = MathFunctions.angleToDegree(angle);

		const sin = Math.sin(d);
		const cos = Math.cos(d);

		const m2a1 = cos, m2b1 = sin;
		const m2a2 = -sin, m2b2 = cos;

		const a1 = this.a1 * m2a1 + this.a2 * m2b1;
		const b1 = this.b1 * m2a1 + this.b2 * m2b1;
		const c1 = this.c1 * m2a1 + this.c2 * m2b1;
		const d1 = this.d1 * m2a1 + this.d2 * m2b1;

		const a2 = this.a1 * m2a2 + this.a2 * m2b2;
		const b2 = this.b1 * m2a2 + this.b2 * m2b2;
		const c2 = this.c1 * m2a2 + this.c2 * m2b2;
		const d2 = this.d1 * m2a2 + this.d2 * m2b2;

		this.a1 = a1; this.b1 = b1; this.c1 = c1; this.d1 = d1;
		this.a2 = a2; this.b2 = b2; this.c2 = c2; this.d2 = d2;

		return this;
	}

	rotateCombine(x, y, z) {
		x = MathFunctions.angleToDegree(x);
		y = MathFunctions.angleToDegree(y);
		z = MathFunctions.angleToDegree(z);

		var
			sinX = Math.sin(x), sinY = Math.sin(y), sinZ = Math.sin(z),
			cosX = Math.cos(x), cosY = Math.cos(y), cosZ = Math.cos(z),

			m2a1 = cosY * cosZ, m2b1 = cosY * sinZ, m2c1 = -sinY,
			m2a2 = sinX * sinY * cosZ, m2b2 = -cosX * sinZ, m2c2 = sinX * sinY,
			m2a3 = cosX * sinY * cosZ + sinX * sinZ, m2b3 = cosX * sinY * sinZ - sinX * cosZ, m2c3 = cosX * cosY;

		var m1 = this;

		var a1 = m1.a1 * m2a1 + m1.a2 * m2b1 + m1.a3 * m2c1;
		var a2 = m1.a1 * m2a2 + m1.a2 * m2b2 + m1.a3 * m2c2;
		var a3 = m1.a1 * m2a3 + m1.a2 * m2b3 + m1.a3 * m2c3;

		var b1 = m1.b1 * m2a1 + m1.b2 * m2b1 + m1.b3 * m2c1;
		var b2 = m1.b1 * m2a2 + m1.b2 * m2b2 + m1.b3 * m2c2;
		var b3 = m1.b1 * m2a3 + m1.b2 * m2b3 + m1.b3 * m2c3;

		var c1 = m1.c1 * m2a1 + m1.c2 * m2b1 + m1.c3 * m2c1;
		var c2 = m1.c1 * m2a2 + m1.c2 * m2b2 + m1.c3 * m2c2;
		var c3 = m1.c1 * m2a3 + m1.c2 * m2b3 + m1.c3 * m2c3;

		var d1 = m1.d1 * m2a1 + m1.d2 * m2b1 + m1.d3 * m2c1;
		var d2 = m1.d1 * m2a2 + m1.d2 * m2b2 + m1.d3 * m2c2;
		var d3 = m1.d1 * m2a3 + m1.d2 * m2b3 + m1.d3 * m2c3;

		this.a1 = a1; this.b1 = b1; this.c1 = c1; this.d1 = d1;
		this.a2 = a2; this.b2 = b2; this.c2 = c2; this.d2 = d2;
		this.a3 = a3; this.b3 = b3; this.c3 = c3; this.d3 = d3;

		return this;
	}

	static makeRotation(x, y, z) {
		const mat = new Matrix4().loadIdentity();
		mat.rotateCombine(x, y, z);
		return mat;
	}

	translate(x, y, z) {
		this.a4 += this.a1 * x + this.a2 * y + this.a3 * z;
		this.b4 += this.b1 * x + this.b2 * y + this.b3 * z;
		this.c4 += this.c1 * x + this.c2 * y + this.c3 * z;
		this.d4 += this.d1 * x + this.d2 * y + this.d3 * z;

		return this;
	}

	translateZ(z) {
		this.a4 += this.a3 * z;
		this.b4 += this.b3 * z;
		this.c4 += this.c3 * z;
		this.d4 += this.d3 * z;

		return this;
	}

	scale(x, y, z) {
		if (x == 1 && y == 1 && z == 1) return this;

		this.a1 *= x; this.b1 *= x; this.c1 *= x; this.d1 *= x;
		this.a2 *= y; this.b2 *= y; this.c2 *= y; this.d2 *= y;
		this.a3 *= z; this.b3 *= z; this.c3 *= z; this.d3 *= z;

		return this;
	}

	canInverse() {
		const
			a = this.a1, b = this.b1, c = this.c1, d = this.d1,
			e = this.a2, f = this.b2, g = this.c2, h = this.d2,
			i = this.a3, j = this.b3, k = this.c3, l = this.d3,
			m = this.a4, n = this.b4, o = this.c4, p = this.d4;

		const q = f * k * p + j * o * h + n * g * l - f * l * o - g * j * p - h * k * n;
		const r = e * k * p + i * o * h + m * g * l - e * l * o - g * i * p - h * k * m;
		const s = e * j * p + i * n * h + m * f * l - e * l * n - f * i * p - h * j * m;
		const t = e * j * o + i * n * g + m * f * k - e * k * n - f * i * o - g * j * m;

		const delta = (a * q - b * r + c * s - d * t);

		return (delta !== 0);
	}

	inverse() {
		const
			a = this.a1, b = this.b1, c = this.c1, d = this.d1,
			e = this.a2, f = this.b2, g = this.c2, h = this.d2,
			i = this.a3, j = this.b3, k = this.c3, l = this.d3,
			m = this.a4, n = this.b4, o = this.c4, p = this.d4;

		const q = f * k * p + j * o * h + n * g * l - f * l * o - g * j * p - h * k * n;
		const r = e * k * p + i * o * h + m * g * l - e * l * o - g * i * p - h * k * m;
		const s = e * j * p + i * n * h + m * f * l - e * l * n - f * i * p - h * j * m;
		const t = e * j * o + i * n * g + m * f * k - e * k * n - f * i * o - g * j * m;

		const delta = (a * q - b * r + c * s - d * t);

		if (delta === 0) return this;

		const detM = 1 / delta;

		// adj
		let m2a1 = q, m2b1 = r, m2c1 = s, m2d1 = t;
		let m2a2 = b * k * p + j * o * d + n * c * l - b * l * o - c * j * p - d * k * n;
		let m2b2 = a * k * p + i * o * d + m * c * l - a * l * o - c * i * p - d * k * m;
		let m2c2 = a * j * p + i * n * d + m * b * l - a * l * n - b * i * p - d * j * m;
		let m2d2 = a * j * o + i * n * c + m * b * k - a * k * n - b * i * o - c * j * m;
		let m2a3 = b * g * p + f * o * d + n * c * h - b * h * o - c * f * p - d * g * n;
		let m2b3 = a * g * p + e * o * d + m * c * h - a * h * o - c * e * p - d * g * m;
		let m2c3 = a * f * p + e * n * d + m * b * h - a * h * n - b * e * p - d * f * m;
		let m2d3 = a * f * o + e * n * c + m * b * g - a * g * n - b * e * o - c * f * m;
		let m2a4 = b * g * l + f * k * d + j * c * h - b * h * k - c * f * l - d * g * j;
		let m2b4 = a * g * l + e * k * d + i * c * h - a * h * k - c * e * l - d * g * i;
		let m2c4 = a * f * l + e * j * d + i * b * h - a * h * j - b * e * l - d * f * i;
		let m2d4 = a * f * k + e * j * c + i * b * g - a * g * j - b * e * k - c * f * i;

		m2b1 = -m2b1; m2d1 = -m2d1;
		m2a2 = -m2a2; m2c2 = -m2c2;
		m2b3 = -m2b3; m2d3 = -m2d3;
		m2a4 = -m2a4; m2c4 = -m2c4;

		// transpose
		const m3a1 = m2a1, m3b1 = m2a2, m3c1 = m2a3, m3d1 = m2a4;
		const m3a2 = m2b1, m3b2 = m2b2, m3c2 = m2b3, m3d2 = m2b4;
		const m3a3 = m2c1, m3b3 = m2c2, m3c3 = m2c3, m3d3 = m2c4;
		const m3a4 = m2d1, m3b4 = m2d2, m3c4 = m2d3, m3d4 = m2d4;

		this.a1 = m3a1 * detM; this.b1 = m3b1 * detM; this.c1 = m3c1 * detM; this.d1 = m3d1 * detM;
		this.a2 = m3a2 * detM; this.b2 = m3b2 * detM; this.c2 = m3c2 * detM; this.d2 = m3d2 * detM;
		this.a3 = m3a3 * detM; this.b3 = m3b3 * detM; this.c3 = m3c3 * detM; this.d3 = m3d3 * detM;
		this.a4 = m3a4 * detM; this.b4 = m3b4 * detM; this.c4 = m3c4 * detM; this.d4 = m3d4 * detM;

		return this;
	}

	transpose() {
		const a2 = this.b1, a3 = this.c1, a4 = this.d1;
		const b1 = this.a2, b3 = this.c2, b4 = this.d2;
		const c1 = this.a3, c2 = this.b3, c4 = this.d3;
		const d1 = this.a4, d2 = this.b4, d3 = this.c4;

		this.b1 = b1; this.c1 = c1; this.d1 = d1;
		this.a2 = a2; this.c2 = c2; this.d2 = d2;
		this.a3 = a3; this.b3 = b3; this.d3 = d3;
		this.a4 = a4; this.b4 = b4; this.c4 = c4;

		return this;
	}

	mul(m2) {
		const m1 = this;
		let m3 = new Matrix4();

		m3.a1 = m1.a1 * m2.a1 + m1.b1 * m2.a2 + m1.c1 * m2.a3 + m1.d1 * m2.a4;
		m3.a2 = m1.a2 * m2.a1 + m1.b2 * m2.a2 + m1.c2 * m2.a3 + m1.d2 * m2.a4;
		m3.a3 = m1.a3 * m2.a1 + m1.b3 * m2.a2 + m1.c3 * m2.a3 + m1.d3 * m2.a4;
		m3.a4 = m1.a4 * m2.a1 + m1.b4 * m2.a2 + m1.c4 * m2.a3 + m1.d4 * m2.a4;

		m3.b1 = m1.a1 * m2.b1 + m1.b1 * m2.b2 + m1.c1 * m2.b3 + m1.d1 * m2.b4;
		m3.b2 = m1.a2 * m2.b1 + m1.b2 * m2.b2 + m1.c2 * m2.b3 + m1.d2 * m2.b4;
		m3.b3 = m1.a3 * m2.b1 + m1.b3 * m2.b2 + m1.c3 * m2.b3 + m1.d3 * m2.b4;
		m3.b4 = m1.a4 * m2.b1 + m1.b4 * m2.b2 + m1.c4 * m2.b3 + m1.d4 * m2.b4;

		m3.c1 = m1.a1 * m2.c1 + m1.b1 * m2.c2 + m1.c1 * m2.c3 + m1.d1 * m2.c4;
		m3.c2 = m1.a2 * m2.c1 + m1.b2 * m2.c2 + m1.c2 * m2.c3 + m1.d2 * m2.c4;
		m3.c3 = m1.a3 * m2.c1 + m1.b3 * m2.c2 + m1.c3 * m2.c3 + m1.d3 * m2.c4;
		m3.c4 = m1.a4 * m2.c1 + m1.b4 * m2.c2 + m1.c4 * m2.c3 + m1.d4 * m2.c4;

		m3.d1 = m1.a1 * m2.d1 + m1.b1 * m2.d2 + m1.c1 * m2.d3 + m1.d1 * m2.d4;
		m3.d2 = m1.a2 * m2.d1 + m1.b2 * m2.d2 + m1.c2 * m2.d3 + m1.d2 * m2.d4;
		m3.d3 = m1.a3 * m2.d1 + m1.b3 * m2.d2 + m1.c3 * m2.d3 + m1.d3 * m2.d4;
		m3.d4 = m1.a4 * m2.d1 + m1.b4 * m2.d2 + m1.c4 * m2.d3 + m1.d4 * m2.d4;

		return m3;
	}

	mulInv(m1) {
		const m2 = this;
		let m3 = new Matrix4();

		m3.a1 = m1.a1 * m2.a1 + m1.a2 * m2.b1 + m1.a3 * m2.c1 + m1.a4 * m2.d1;
		m3.a2 = m1.a1 * m2.a2 + m1.a2 * m2.b2 + m1.a3 * m2.c2 + m1.a4 * m2.d2;
		m3.a3 = m1.a1 * m2.a3 + m1.a2 * m2.b3 + m1.a3 * m2.c3 + m1.a4 * m2.d3;
		m3.a4 = m1.a1 * m2.a4 + m1.a2 * m2.b4 + m1.a3 * m2.c4 + m1.a4 * m2.d4;

		m3.b1 = m1.b1 * m2.a1 + m1.b2 * m2.b1 + m1.b3 * m2.c1 + m1.b4 * m2.d1;
		m3.b2 = m1.b1 * m2.a2 + m1.b2 * m2.b2 + m1.b3 * m2.c2 + m1.b4 * m2.d2;
		m3.b3 = m1.b1 * m2.a3 + m1.b2 * m2.b3 + m1.b3 * m2.c3 + m1.b4 * m2.d3;
		m3.b4 = m1.b1 * m2.a4 + m1.b2 * m2.b4 + m1.b3 * m2.c4 + m1.b4 * m2.d4;

		m3.c1 = m1.c1 * m2.a1 + m1.c2 * m2.b1 + m1.c3 * m2.c1 + m1.c4 * m2.d1;
		m3.c2 = m1.c1 * m2.a2 + m1.c2 * m2.b2 + m1.c3 * m2.c2 + m1.c4 * m2.d2;
		m3.c3 = m1.c1 * m2.a3 + m1.c2 * m2.b3 + m1.c3 * m2.c3 + m1.c4 * m2.d3;
		m3.c4 = m1.c1 * m2.a4 + m1.c2 * m2.b4 + m1.c3 * m2.c4 + m1.c4 * m2.d4;

		m3.d1 = m1.d1 * m2.a1 + m1.d2 * m2.b1 + m1.d3 * m2.c1 + m1.d4 * m2.d1;
		m3.d2 = m1.d1 * m2.a2 + m1.d2 * m2.b2 + m1.d3 * m2.c2 + m1.d4 * m2.d2;
		m3.d3 = m1.d1 * m2.a3 + m1.d2 * m2.b3 + m1.d3 * m2.c3 + m1.d4 * m2.d3;
		m3.d4 = m1.d1 * m2.a4 + m1.d2 * m2.b4 + m1.d3 * m2.c4 + m1.d4 * m2.d4;

		return m3;
	}

	equals(m2) {
		return this.a1 === m2.a1 && this.b1 === m2.b1 && this.c1 === m2.c1 && this.d1 === m2.d1
			&& this.a2 === m2.a2 && this.b2 === m2.b2 && this.c2 === m2.c2 && this.d2 === m2.d2
			&& this.a3 === m2.a3 && this.b3 === m2.b3 && this.c3 === m2.c3 && this.d3 === m2.d3
			&& this.a4 === m2.a4 && this.b4 === m2.b4 && this.c4 === m2.c4 && this.d4 === m2.d4;
	}

	approxiEquals(mat2, epsilon = EPSILON) {
		return approxiEquals(this.a1, mat2.a1, epsilon) && approxiEquals(this.b1, mat2.b1, epsilon)
			&& approxiEquals(this.c1, mat2.c1, epsilon) && approxiEquals(this.d1, mat2.d1, epsilon)
			&& approxiEquals(this.a2, mat2.a2, epsilon) && approxiEquals(this.b2, mat2.b2, epsilon)
			&& approxiEquals(this.c2, mat2.c2, epsilon) && approxiEquals(this.d2, mat2.d2, epsilon)
			&& approxiEquals(this.a3, mat2.a3, epsilon) && approxiEquals(this.b3, mat2.b3, epsilon)
			&& approxiEquals(this.c3, mat2.c3, epsilon) && approxiEquals(this.d3, mat2.d3, epsilon)
			&& approxiEquals(this.a4, mat2.a4, epsilon) && approxiEquals(this.b4, mat2.b4, epsilon)
			&& approxiEquals(this.c4, mat2.c4, epsilon) && approxiEquals(this.d4, mat2.d4, epsilon);
	}

	frustum(left, right, top, bottom, near, far) {
		const x = right - left, y = bottom - top, z = far - near;

		this.a1 = near * 2 / x; this.b1 = 0; this.c1 = 0; this.d1 = 0;
		this.a2 = 0; this.b2 = near * 2 / y; this.c2 = 0; this.d2 = 0;
		this.a3 = (right + left) / x; this.b3 = (bottom + top) / y; this.c3 = -(far + near) / z; this.d3 = -1;
		this.a4 = 0; this.b4 = 0; this.c4 = -(far * near * 2) / z; this.d4 = 0;

		return this;
	}

	perspective(angle, widthRate, near, far) {
		const topRate = near * Math.tan(angle * Math.PI / 360);
		widthRate = topRate * widthRate;
		this.frustum(-widthRate, widthRate, -topRate, topRate, near, far);

		return this;
	}

	ortho(left, right, bottom, top, near, far) {
		const x = right - left, y = top - bottom, z = far - near;

		this.a1 = 2 / x; this.b1 = 0; this.c1 = 0; this.d1 = 0;
		this.a2 = 0; this.b2 = 2 / y; this.c2 = 0; this.d2 = 0;
		this.a3 = 0; this.b3 = 0; this.c3 = -2 / z; this.d3 = 0;

		this.a4 = -(left + right) / x;
		this.b4 = -(top + bottom) / y;
		this.c4 = -(far + near) / z;
		this.d4 = 1;

		return this;
	}

	/*
	 * Make a lookat matrix. This method does not require an identity matrix.
	 */
	lookAt(location, target, up) {
		const zaxis = Vec3.sub(location, target).normalize();    // forward
		const xaxis = Vec3.cross(up, zaxis).normalize();    // right
		const yaxis = Vec3.cross(zaxis, xaxis);             // up

		this.a1 = xaxis.x; this.b1 = yaxis.x; this.c1 = zaxis.x; this.d1 = 0;
		this.a2 = xaxis.y; this.b2 = yaxis.y; this.c2 = zaxis.y; this.d2 = 0;
		this.a3 = xaxis.z; this.b3 = yaxis.z; this.c3 = zaxis.z; this.d3 = 0;

		// this.a4 = -xaxis.dot(eye); this.b4 = -yaxis.dot(eye); this.c4 = -zaxis.dot(eye); this.d4 = 1;

		// maybe we can ignore the row 4 like below to get more better performance
		this.a4 = 0; this.b4 = 0; this.c4 = 0; this.d4 = 1;

		return this;
	}

	static createLookAt(location, target, up = Vec3.up) {
		const mat = new Matrix4();
		mat.lookAt(location, target, up);
		return mat;
	}

	extractEulerAngles() {
		const
			m11 = this.a1, m12 = this.b1, m13 = this.c1,
			m21 = this.a2, m22 = this.b2, m23 = this.c2,
			m31 = this.a3, m32 = this.b3, m33 = this.c3;

		var x, y, z;

		if (m21 > 0.99999 || m21 < -0.99999) {
			x = 0;
			y = Math.atan2(m13, m33);
			z = -Math.PI / 2;
		} else {
			x = Math.atan2(m23, m22);
			y = Math.atan2(m31, m11);
			z = Math.asin(-m21);
		}

		return new Vec3(MathFunctions.degreeToAngle(x),
			MathFunctions.degreeToAngle(y),
			MathFunctions.degreeToAngle(z));
	}

	extractLookAtVectors() {
		return {
			dir: new Vec3(this.c1, this.c2, -this.c3).normalize(),
			up: new Vec3(this.b1, this.b2, -this.b3).normalize()
		};
	}

	updateArray() {
		this.arr[0] = this.a1;
		this.arr[1] = this.b1;
		this.arr[2] = this.c1;
		this.arr[3] = this.d1;

		this.arr[4] = this.a2;
		this.arr[5] = this.b2;
		this.arr[6] = this.c2;
		this.arr[7] = this.d2;

		this.arr[8] = this.a3;
		this.arr[9] = this.b3;
		this.arr[10] = this.c3;
		this.arr[11] = this.d3;

		this.arr[12] = this.a4;
		this.arr[13] = this.b4;
		this.arr[14] = this.c4;
		this.arr[15] = this.d4;
	}

	toArray() {
		this.updateArray();
		return this.arr;
	}

	toFloat32Array() {
		return new Float32Array(this.toArray());
	}
}

Matrix4.Identity = new Matrix4().loadIdentity();
Matrix4.IdentityArray = new Matrix4().loadIdentity().toArray();
