////////////////////////////////////////////////////////////////////////////////
// js-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

export class Vec2 {
	constructor() {
		this.x = 0; this.y = 0;
		this.set(...arguments);
	}
	
	set() {
		switch (arguments.length) {
			case 1:
				const arg0 = arguments[0];
				if (arg0) {
					this.x = arg0.x;
					this.y = arg0.y;
				}
				break;
			
			case 2:
				this.x = arguments[0]; this.y = arguments[1];
				break;
		}
	}

	add(v2) {
		return new Vec2(this.x + v2.x, this.y + v2.y);
	}

	static add(v1, v2) {
		return new Vec2(v1.x + v2.x, v1.y + v2.y);
	}

	sub(v2) {
		return new Vec2(this.x - v2.x, this.y - v2.y);
	}
		
	static sub(v1, v2) {
		return new Vec2(v1.x - v2.x, v1.y - v2.y);
	}

	scale(scaleX, scaleY) {
		this.x *= scaleX;
		this.y *= scaleY;
	}

	mul(sx, sy) {
		switch (arguments.length) {
			case 1:
				if (typeof sx === "object") {
					return new Vec2(this.x * sx.x, this.y * sx.y);
				} else {
					return new Vec2(this.x * sx, this.y * sx);
				}

			case 2:
				return new Vec2(this.x * sx, this.y * sy);
		}
	}

	mulMat(m) {
		return new Vec2(
			this.x * m.a1 + this.y * m.a2 + m.a3,
			this.x * m.b1 + this.y * m.b2 + m.b3);
	}

	div(s) {
		return new Vec2(this.x / s, this.y / s);
	}

	neg() {
		return new Vec2(-this.x, -this.y);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	get magnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize() {
		const delta = 1 / this.length();
		return new Vec2(this.x * delta, this.y * delta);
	}

	clone() {
		return new Vec2(this.x, this.y);
	}

	toArray() {
		return [this.x, this.y];
	}

	toFloat32Array() {
		return new Float32Array(this.toArray());
	}

	toString() {
		const toStringDigits = Tarumae.Utility.NumberExtension.toStringWithDigits;
		return "[" + toStringDigits(this.x) + ", " + (this.y) + "]";
	}

	dot(v2) {
		return this.x * v2.x + this.y * v2.y;
	}

	static dot(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

	get angle() {
		let angle = Math.atan2(this.y, this.x) * 180 / Math.PI;
		if (angle < 0) angle += 360;
		return angle;
	}

	static angleOf(v1, v2) {
		let angle = Math.atan2((v2.y - v1.y), (v2.x - v1.x));
		angle = angle * 180 / Math.PI;
		return angle;
	}
}	

Vec2.zero = new Vec2(0, 0);
Vec2.one = new Vec2(1, 1);
