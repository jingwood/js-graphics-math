////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

const { Vec3 } = require("./vec3.js");
const { roundDigits } = require("./utility.js");
const { MathFunctions } = require("./functions.js");

class Vec4 {
	constructor(x, y, z, w) {
		
		let obj;

		switch (arguments.length) {
			default:
				this.x = 0;
				this.y = 0;
				this.z = 0;
				this.w = 0;
				break;
			
			case 1:
				obj = arguments[0];
			
				if (typeof obj === "object") {
					if (obj instanceof Vec3) {
						this.x = obj.x;
						this.y = obj.y;
						this.z = obj.z;
						this.w = 1.0;
					} else if (obj instanceof Vec4) {
						this.x = obj.x;
						this.y = obj.y;
						this.z = obj.z;
						this.w = obj.w;
					}
				}
				break;

			case 2:
				obj = arguments[0];
			
				if (typeof obj === "object") {
					this.x = obj.x;
					this.y = obj.y;
					this.z = obj.z;
					this.w = arguments[1];
				}
				break;

			case 3:
				this.x = x; this.y = y; this.z = z; this.w = 1.0;
				break;

			case 4:
				this.x = x; this.y = y; this.z = z; this.w = w;
				break;
		}
	}

	get xyz() {
		return new Vec3(this.x, this.y, this.z);
	}

	set(x, y, z, w) {
		this.x = x; this.y = y; this.z = z; this.w = w;
	}

	equals() {
		switch (arguments.length) {
			default:
				return false;

			case 1:
				var obj = arguments[0];
				return (typeof obj === "object")
					&& this.x == obj.x && this.y == obj.y && this.z == obj.z && this.w == obj.w;

			case 4:
				return this.x == arguments[0] && this.y == arguments[1]
					&& this.z == arguments[2] && this.w == arguments[3];
		}
	}

	almostSame() {
		switch (arguments.length) {
			default:
				return false;

			case 1:
				var obj = arguments[0];
				return (typeof obj === "object")
					&& Math.abs(this.x - obj.x) < 0.00001 && Math.abs(this.y - obj.y) < 0.00001
					&& Math.abs(this.z - obj.z) < 0.00001;

			case 3:
				return Math.abs(this.x - arguments[0]) < 0.00001 && Math.abs(this.y - arguments[1]) < 0.00001
					&& Math.abs(this.z - arguments[2]) < 0.00001;
		}
	}

	add(v) {
		return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
	}

	sub(v) {
		return new Vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
	}

	mul(s) {
		return new Vec4(this.x * s, this.y * s, this.z * s, this.w * s);
	}

	div(s) {
		return new Vec4(this.x / s, this.y / s, this.z / s, this.w / s);
	}

	mulMat(m) {
		return new Vec4(
			this.x * m.a1 + this.y * m.a2 + this.z * m.a3 + this.w * m.a4,
			this.x * m.b1 + this.y * m.b2 + this.z * m.b3 + this.w * m.b4,
			this.x * m.c1 + this.y * m.c2 + this.z * m.c3 + this.w * m.c4,
			this.x * m.d1 + this.y * m.d2 + this.z * m.d3 + this.w * m.d4);
  }
  
  static mulMat(v, m) {
    return new Vec4(
			v.x * m.a1 + v.y * m.a2 + v.z * m.a3 + v.w * m.a4,
			v.x * m.b1 + v.y * m.b2 + v.z * m.b3 + v.w * m.b4,
			v.x * m.c1 + v.y * m.c2 + v.z * m.c3 + v.w * m.c4,
			v.x * m.d1 + v.y * m.d2 + v.z * m.d3 + v.w * m.d4);
  }

	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	}

	neg() {
		return new Vec4(-this.x, -this.y, -this.z, -this.w);
	}

	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	normalize() {
		var scalar = 1 / this.length();
	
		if (isFinite(scalar)) {
			return new Vec4(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
		} else {
			return new Vec4();
		}
	}

	lerp(v2, t) {
		return this.add((v2.sub(this)).mul(t));
	}

	lerp(v1, v2, t) {
		return v1.lerp(v2, t);
	}
	
	clamp(min = 0, max = 1) {
		this.x = MathFunctions.clamp(this.x, min, max);
		this.y = MathFunctions.clamp(this.y, min, max);
		this.z = MathFunctions.clamp(this.z, min, max);
		this.w = MathFunctions.clamp(this.w, min, max);
	}

	static clamp(v, min = 0, max = 1) {
		return new Vec4(MathFunctions.clamp(v.x, min, max),
			MathFunctions.clamp(v.y, min, max),
			MathFunctions.clamp(v.z, min, max),
			MathFunctions.clamp(v.w, min, max));
	}

	clone() {
		return new Vec4(this.x, this.y, this.z, this.w);
	}

	toArray() {
		return [this.x, this.y, this.z, this.w];
	}

	toArrayDigits(digits) {
		return [roundDigits(this.x, digits), roundDigits(this.y, digits),
		roundDigits(this.z, digits), roundDigits(this.w, digits)];
	}
}

module.exports = { Vec4 };
