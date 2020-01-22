////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { Vec3 } from "./vec3.js";

export class Ray {
	constructor(origin, dir) {
		if (typeof origin === "undefined") {
			this.origin = new Vec3();
			this.dir = new Vec3();
		} else {
			this.origin = origin;
			this.dir = dir;
		}
	}
};

Ray.MaxDistance = Infinity;
