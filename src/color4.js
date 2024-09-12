////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Color3 } from "./color3.js";

export class Color4 {
	constructor(r, g, b, a) {
		switch (arguments.length) {
			default:
			case 0:
				this.r = 0; this.g = 0; this.b = 0; this.a = 0;
				break;

			case 1:
				if (typeof r === "object") {
					if (r instanceof Color3) {
						this.r = r.r;
						this.g = r.g;
						this.b = r.b;
						this.a = g;
					} else if (r instanceof Color4) {
						this.r = r.r;
						this.g = r.g;
						this.b = r.b;
						this.a = r.a;
					}
				} else if (typeof r === "number") {
					this.r = r;
					this.g = r;
					this.b = r;
					this.a = r;
				}
				break;

			case 3:
				this.r = r; this.g = g; this.b = b; this.a = 1;
				break;

			case 4:
				this.r = r; this.g = g; this.b = b; this.a = a;
				break;
		}
	}

	rgb() {
		return new Color3(this.r, this.g, this.b);
	}

	clone() {
		return new Color4(this.r, this.g, this.b, this.a);
	}

	add(c) {
		return new Color4(this.r + c.r, this.g + c.g, this.b + c.b, this.a + c.a);
	}

	sub(c) {
		return new Color4(this.r - c.r, this.g - c.g, this.b - c.b, this.a - c.a);
	}

	mul(s) {
		return new Color4(this.r * s, this.g * s, this.b * s, this.a * s);
	}

	lerp(c2, t) {
		return this.add((c2.sub(this)).mul(t));
	}

	static lerp(c1, c2, t) {
		return c1.lerp(c2, t);
	}

	toArray() {
		return [this.r, this.g, this.b, this.a];
	}

	toFloat32Array() {
		return new Float32Array(this.toArray());
	}
}

Color4.white = new Color4(Color3.white, 1.0);
Color4.black = new Color4(Color3.black, 1.0);
