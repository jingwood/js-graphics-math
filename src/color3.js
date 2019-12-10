////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { toStringWithDigits } from "./utility";

export class Color3 {
	constructor(r, g, b) {
		switch (arguments.length) {
			case 0:
				this.r = 0; this.g = 0; this.b = 0;
				break;
			
			case 1:
				if (typeof r === "number") {
					this.r = r; this.g = r; this.b = r;
				} else if (typeof r === "object") {
					this.r = r.r; this.g = r.g; this.b = r.b;
				}
				break;

			case 3:
				this.r = r; this.g = g; this.b = b;
				break;
		}
	}

	clone() {
		const c = new Color3();
		c.copyFrom(this);
		return c;
	}

	copyFrom(c) {
		this.r = c.r; this.g = c.g; this.b = c.b;
		return this;
	}

	set(r, g, b) {
		switch (arguments.length) {
			case 0:
				this.r = 0; this.g = 0; this.b = 0;
				break;
			
			case 1:
				if (typeof r === "number") {
					this.r = r; this.g = r; this.b = r;
				} else if (typeof r === "object") {
					this.r = r.r; this.g = r.g; this.b = r.b;
				}
				break;

			case 3:
				this.r = r; this.g = g; this.b = b;
				break;
		}
	}

	add(c) {
		return new Color3(this.r + c.r, this.g + c.g, this.b + c.b);
	}
	
	sub(c) {
		return new Color3(this.r - c.r, this.g - c.g, this.b - c.b);
	}
	
	mul(s) {
		return new Color3(this.r * s, this.g * s, this.b * s);
	}
	
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	
	normalize() {
		const scalar = 1 / this.length();
		
		if (isFinite(scalar)) {
			return new Color3(this.x * scalar, this.y * scalar, this.z * scalar);
		} else {
			return new Color3();
		}
	};
	
	lerp(v2, t) {
		return this.add((v2.sub(this)).mul(t));
	}
	
	static lerp(v1, v2, t) {
		return v1.lerp(v2, t);
	}
	
	toArray() {
		return [this.r, this.g, this.b];
	}
	
	toFloat32Array() {
		return new Float32Array(this.toArray());
	}
	
	toString() {
		return "[" + toStringWithDigits(this.r) + ", " + toStringWithDigits(this.g) + ", "
			+ toStringWithDigits(this.b) + "]";
	}

	static fromArray(arr) {
		return new Color3(arr[0], arr[1], arr[2]);
	}

	static randomly() {
		return new Color3(Math.random(), Math.random(), Math.random());
	};
	
	static randomlyLight() {
		return new Color3(0.3 + Math.random() * 0.7, 0.3 + Math.random() * 0.7, 0.3 + Math.random() * 0.7);
	};
	
	static randomlyDark() {
		return new Color3(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
	};
}

Color3.white = new Color3(1.0, 1.0, 1.0);
Color3.silver = new Color3(0.7, 0.7, 0.7);
Color3.gray = new Color3(0.5, 0.5, 0.5);
Color3.dimgray = new Color3(0.3, 0.3, 0.3);
Color3.black = new Color3(0.0, 0.0, 0.0);
Color3.red = new Color3(1.0, 0.0, 0.0);
Color3.green = new Color3(0.0, 1.0, 0.0);
Color3.blue = new Color3(0.0, 0.0, 1.0);
