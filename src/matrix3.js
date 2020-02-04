////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

export class Matrix3 {
	constructor(copySource) {
		if (copySource) {
			this.copyFrom(copySource);
		}
	}

	loadIdentity() {
		this.a1 = 1.0; this.b1 = 0.0; this.c1 = 0.0;
		this.a2 = 0.0; this.b2 = 1.0; this.c2 = 0.0;
		this.a3 = 0.0; this.b3 = 0.0; this.c3 = 1.0;

		return this;
	}

	copyFrom(m) {
		this.a1 = m.a1; this.b1 = m.b1; this.c1 = m.c1;
		this.a2 = m.a2; this.b2 = m.b2; this.c2 = m.c2;
		this.a3 = m.a3; this.b3 = m.b3; this.c3 = m.c3;

		return this;
	}

	rotate(angle) {
		if (angle === 0) return this;

		const d = angle * Math.PI / 180;
		const sin = Math.sin(d), cos = Math.cos(d);

		const m2a1 = cos, m2b1 = sin;
		const m2a2 = -sin, m2b2 = cos;

		const a1 = this.a1 * m2a1 + this.a2 * m2b1;
		const b1 = this.b1 * m2a1 + this.b2 * m2b1;
		const c1 = this.c1 * m2a1 + this.c2 * m2b1;

		const a2 = this.a1 * m2a2 + this.a2 * m2b2;
		const b2 = this.b1 * m2a2 + this.b2 * m2b2;
		const c2 = this.c1 * m2a2 + this.c2 * m2b2;

		this.a1 = a1; this.b1 = b1; this.c1 = c1;
		this.a2 = a2; this.b2 = b2; this.c2 = c2;

		return this;
	}

	translate(x, y) {
		this.a3 += this.a1 * x + this.a2 * y;
		this.b3 += this.b1 * x + this.b2 * y;
		this.c3 += this.c1 * x + this.c2 * y;

		return this;
	}

	static makeTranslation(x, y) {
		const m = new Matrix3();
		m.a1 = 1, m.b1 = 0, m.c1 = 0;
		m.a2 = 0, m.b2 = 1, m.c2 = 0;
		m.a3 = x, m.b3 = y, m.c3 = 1;
		return m;
	}

	static makeRotation(angle, x, y) {
		const m = new Matrix3();
		const d = angle * Math.PI / 180;
		const sin = Math.sin(d), cos = Math.cos(d);
		m.a1 = cos, m.b1 = sin, m.c1 = 0;
		m.a2 = -sin, m.b2 = cos, m.c2 = 0;
		m.a3 = x || 0, m.b3 = y || 0, m.c3 = 1;
		return m;
	}

	static makeScale(x, y) {
		const m = new Matrix3();
		m.a1 = x; m.b1 = 0; m.c1 = 0;
		m.a2 = 0; m.b2 = y; m.c2 = 0;
		m.a3 = 0; m.b3 = 0; m.c3 = 1;
		return m;
	}

	scale(x, y) {
		if (x === 1 && y === 1) return this;
	
		this.a1 *= x; this.b1 *= x; this.c1 *= x;
		this.a2 *= y; this.b2 *= y; this.c2 *= y;

		return this;
	}

	inverse() {
		const detM
			= this.a1 * this.b2 * this.c3 + this.b1 * this.c2 * this.a3 + this.c1 * this.a2 * this.b3
			- this.c1 * this.b2 * this.a3 - this.b1 * this.a2 * this.c3 - this.a1 * this.c2 * this.b3;
		
		if (detM === 0) return this;

		const ka1 = this.b2 * this.c3 - this.c2 * this.b3;
		const ka2 = this.a2 * this.c3 - this.c2 * this.a3;
		const ka3 = this.a2 * this.b3 - this.b2 * this.a3;

		const kb1 = this.b1 * this.c3 - this.c1 * this.b3;
		const kb2 = this.a1 * this.c3 - this.c1 * this.a3;
		const kb3 = this.a1 * this.b3 - this.b1 * this.a3;

		const kc1 = this.b1 * this.c2 - this.c1 * this.b2;
		const kc2 = this.a1 * this.c2 - this.c1 * this.a2;
		const kc3 = this.a1 * this.b2 - this.b1 * this.a2;

		const q = 1 / detM, m = new Matrix3();
		m.a1 = q * ka1; m.b1 = -q * kb1; m.c1 = q * kc1;
		m.a2 = -q * ka2; m.b2 = q * kb2; m.c2 = -q * kc2;
		m.a3 = q * ka3, m.b3 = -q * kb3, m.c3 = q * kc3;
		
		return m;
	}

	transpose() {
		var a2 = this.b1;
		var a3 = this.c1;
		var b1 = this.a2;
		var b3 = this.c2;
		var c1 = this.a3;
		var c2 = this.b3;

		this.b1 = b1; this.c1 = c1;
		this.a2 = a2; this.c2 = c2;
		this.a3 = a3; this.b3 = b3;

		return this;
	}

	mul(m2) {
		var m1 = this;
		var m3 = new Matrix3();

		m3.a1 = m1.a1 * m2.a1 + m1.b1 * m2.a2 + m1.c1 * m2.a3;
		m3.b1 = m1.a1 * m2.b1 + m1.b1 * m2.b2 + m1.c1 * m2.b3;
		m3.c1 = m1.a1 * m2.c1 + m1.b1 * m2.c2 + m1.c1 * m2.c3;

		m3.a2 = m1.a2 * m2.a1 + m1.b2 * m2.a2 + m1.c2 * m2.a3;
		m3.b2 = m1.a2 * m2.b1 + m1.b2 * m2.b2 + m1.c2 * m2.b3;
		m3.c2 = m1.a2 * m2.c1 + m1.b2 * m2.c2 + m1.c2 * m2.c3;

		m3.a3 = m1.a3 * m2.a1 + m1.b3 * m2.a2 + m1.c3 * m2.a3;
		m3.b3 = m1.a3 * m2.b1 + m1.b3 * m2.b2 + m1.c3 * m2.b3;
		m3.c3 = m1.a3 * m2.c1 + m1.b3 * m2.c2 + m1.c3 * m2.c3;

		return m3;
	}

	extractEulerAngles(order) {
		return MathFunctions.getEulerAnglesFromMatrix(this, order);
	}

	mulInv(m1) {
		var m2 = this;
		var m3 = new Matrix3();

		m3.a1 = m1.a1 * m2.a1 + m1.a2 * m2.b1 + m1.a3 * m2.c1;
		m3.b1 = m1.b1 * m2.a1 + m1.b2 * m2.b1 + m1.b3 * m2.c1;
		m3.c1 = m1.c1 * m2.a1 + m1.c2 * m2.b1 + m1.c3 * m2.c1;

		m3.a2 = m1.a1 * m2.a2 + m1.a2 * m2.b2 + m1.a3 * m2.c2;
		m3.b2 = m1.b1 * m2.a2 + m1.b2 * m2.b2 + m1.b3 * m2.c2;
		m3.c2 = m1.c1 * m2.a2 + m1.c2 * m2.b2 + m1.c3 * m2.c2;

		m3.a3 = m1.a1 * m2.a3 + m1.a2 * m2.b3 + m1.a3 * m2.c3;
		m3.b3 = m1.b1 * m2.a3 + m1.b2 * m2.b3 + m1.b3 * m2.c3;
		m3.c3 = m1.c1 * m2.a3 + m1.c2 * m2.b3 + m1.c3 * m2.c3;
	
		return m3;
	}

	equals(m2) {
		return this.a1 === m2.a1 && this.b1 === m2.b1 && this.c1 === m2.c1
			&& this.a2 === m2.a2 && this.b2 === m2.b2 && this.c2 === m2.c2
			&& this.a3 === m2.a3 && this.b3 === m2.b3 && this.c3 === m2.c3;
	}

	toArray() {
		return [
			this.a1, this.b1, this.c1,
			this.a2, this.b2, this.c2,
			this.a3, this.b3, this.c3,
		];
	}

	toFloat32Array() {
		return new Float32Array(this.toArray());
	}

	clone() {
		return new Matrix3(this);
	}
}

Matrix3.identity = new Matrix3().loadIdentity();
