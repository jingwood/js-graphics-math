////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Matrix4 } from "./matrix4.js";
import { Vec2 } from "./vec2.js";
import { toStringWithDigits, roundDigits } from "./utility.js";
import { approxiEquals } from "./functions.js";

export class Vec3 {
	constructor() {
		this.x = 0; this.y = 0; this.z = 0;
		this.set(...arguments);
	}

	set() {
		switch (arguments.length) {
			case 1:
				const arg0 = arguments[0];
				if (typeof arg0 === "object") {
					this.x = arg0.x; this.y = arg0.y; this.z = arg0.z;
				} else if (Array.isArray(arg0)) {
					this.x = arg0[0]; this.y = arg0[1]; this.z = arg0[2];
				} else if (!isNaN(arg0)) {
					this.x = arg0; this.y = arg0; this.z = arg0;
				}
				break;
			
			case 3:
				this.x = arguments[0]; this.y = arguments[1]; this.z = arguments[2];
				break;
		}
	}

	get xy() {
		return new Vec2(this.x, this.y);
	}
	
	copyFrom(v) {
		this.x = v.x; this.y = v.y; this.z = v.z;
	}
	
	zero() {
		this.x = 0; this.y = 0; this.z = 0;
	}
	
	equals() {
		switch (arguments.length) {
			default:
				return false;
	
			case 1:
				var obj = arguments[0];
				return (typeof obj === "object")
					&& this.x == obj.x && this.y == obj.y && this.z == obj.z;
	
			case 3:
				return this.x == arguments[0] && this.y == arguments[1] && this.z == arguments[2];
		}
	}

	almostSame() {
		return this.approxiEquals(...arguments);
	}	

	approxiEquals() {
		switch (arguments.length) {
			default:
				return false;
	
			case 1:
				{
					const obj = arguments[0];
					return (typeof obj === "object")
						&& approxiEquals(this.x, obj.x)
						&& approxiEquals(this.y, obj.y)
						&& approxiEquals(this.z, obj.z);
				}
	
			case 3:
				return approxiEquals(this.x, arguments[0])
					&& approxiEquals(this.y, arguments[1])
					&& approxiEquals(this.z, arguments[2]);
		}
	}
	
	mulMat(m) {
		return new Vec3(
			this.x * m.a1 + this.y * m.a2 + this.z * m.a3,
			this.x * m.b1 + this.y * m.b2 + this.z * m.b3,
			this.x * m.c1 + this.y * m.c2 + this.z * m.c3);
	}
  
  get magnitude() {
		return Vec3.length(this);
	}

	static magnitude(v) {
		return Vec3.length(v);
  }
  
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  
  static length(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }

  static getLength(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  }
  
	normalize() {
		var scalar = 1 / this.length();
		
		if (isFinite(scalar)) {
			return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
		} else {
			return new Vec3();
		}
  }
  
	static normalize(v) {
		var scalar = 1 / Vec3.getLength(v);
	
		if (isFinite(scalar)) {
			return new Vec3(v.x * scalar, v.y * scalar, v.z * scalar);
		} else {
			return new Vec3();
		}
	}
	
	add(v) {
		return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
	}
	
	sub(v) {
		return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
	}
	
	mul(scalar) {
		var x, y, z;
	
		if (isFinite(scalar)) {
			return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
		} else {
			return new Vec3();
		}
	}
	
	div(s) {
		var scalar = 1 / s;
	
		if (isFinite(scalar)) {
			return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
		} else {
			return new Vec3();
		}
	}
	
	cross(v) {
		return new Vec3(this.y * v.z - this.z * v.y,
			-(this.x * v.z - this.z * v.x),
			this.x * v.y - this.y * v.x);
	}
	
	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	
	neg() {
		return new Vec3(-this.x, -this.y, -this.z);
	}
	
	abs() {
		return new Vec3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
	}
	
	lerp(v2, t) {
		return this.add((v2.sub(this)).mul(t));
	}
	
	static lerp(v1, v2, t) {
		return v1.lerp(v2, t);
	}
	
	fromEulers(e1, e2) {
		var v = MathFunctions.vectorFromEulerAngles(e1, e2);
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	}
	
	offset(x, y, z) {
		switch (arguments.length) {
			case 1:
				if (typeof x === "object") {
					this.x += x.x;
					this.y += x.y;
					this.z += x.z;
				}
				break;
			
			case 3:
				this.x += x;
				this.y += y;
				this.z += z;
				break;
		}
	
		return this;
	}
	
	clone() {
		return new Vec3(this.x, this.y, this.z);
	}
	
	toArray() {
		return [this.x, this.y, this.z];
	}
	
	toArrayDigits(digits) {
		return [roundDigits(this.x, digits), roundDigits(this.y, digits), roundDigits(this.z, digits)];
	}
	
	toFloat32Array() {
		return new Float32Array(this.toArray());
	}
		
	toString() {
		return "[" + toStringWithDigits(this.x) + ", " + toStringWithDigits(this.y) + ", "
			+ toStringWithDigits(this.z) + "]";
	}

	static add(v1, v2) {
		return new Vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
	}

	static sub(v1, v2) {
		return new Vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
	}

	static mul(v1, s) {
		return new Vec3(v1.x * s, v1.y * s, v1.z * s);
	}

	static div(v1, s) {
		return new Vec3(v1.x / s, v1.y / s, v1.z / s);
	}

	static neg(v1) {
		return new Vec3(-v1.x, -v1.y, -v1.z);
	}

	static dot(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}

	static cross(v1, v2) {
		return new Vec3(v1.y * v2.z - v1.z * v2.y,
			-(v1.x * v2.z - v1.z * v2.x),
			v1.x * v2.y - v1.y * v2.x);
	}
}

Vec3.createFromEulers = (function() {
	var m;

	return function(ex, ey, ez) {
		
		// TODO: might be replaced by Quaternion	
		if (m === undefined) m = new Matrix4();
		m.loadIdentity().rotate(ex, ey, ez);
		
		return new Vec3(-m.a3, -m.b3, -m.c3);
	};
})();

Vec3.fromArray = function(arr) {
	return new Vec3(arr[0], arr[1], arr[2]);
};

// deparacted
Vec3.zero = new Vec3(0, 0, 0);
Vec3.one = new Vec3(1, 1, 1);
Vec3.up = new Vec3(0, 1, 0);
Vec3.down = new Vec3(0, -1, 0);
Vec3.left = new Vec3(-1, 0, 0);
Vec3.right = new Vec3(1, 0, 0);
Vec3.forward = new Vec3(0, 0, -1);
Vec3.back = new Vec3(0, 0, 1);

Vec3.Zero = new Vec3(0, 0, 0);
Vec3.One = new Vec3(1, 1, 1);
Vec3.Up = new Vec3(0, 1, 0);
Vec3.Down = new Vec3(0, -1, 0);
Vec3.Left = new Vec3(-1, 0, 0);
Vec3.Right = new Vec3(1, 0, 0);
Vec3.Forward = new Vec3(0, 0, -1);
Vec3.Back = new Vec3(0, 0, 1);
