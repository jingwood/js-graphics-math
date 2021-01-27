////////////////////////////////////////////////////////////////////////////////
// js-graphics-mathlib
// Math library for JavaScript 2D/3D graphics rendering.
//
// MIT License (c) 2015-2019 Jingwood, All rights reserved.
////////////////////////////////////////////////////////////////////////////////

const { Vec2 } = require("./vec2.js");
const { MathFunctions2 = _mf2 } = require("./functions2.js");

class BoundingBox2D {
	constructor() {
		this.set(...arguments);
	}

	set() {
		switch (arguments.length) {
			case 0:
				this.min = Vec2.zero.clone();
				this.max = Vec2.zero.clone();
				break;
			
			case 1:
				const bbox2 = arguments[0];
				if (typeof bbox2.min === "object" && typeof bbox2.max === "object") {
					this.set(bbox2.min, bbox2.max);
				}
				break;
			
			case 2:
				this.min = arguments[0].clone();
				this.max = arguments[1].clone();
				break;
			
			case 4:
				this.min.x = arguments[0];
				this.min.y = arguments[1];
				this.max.x = arguments[2];
				this.max.y = arguments[3];
				break;
			
			default:
				throw new Error("BoundingBox2D: unsupported arguments to set");
		}
	}

	clone() {
		return new BoundingBox2D(this);
	}

  get size() {
    return { width: this.width, height: this.height };
	}

	set size({ width, height }) {
		this.width = width;
		this.height = height;
	}

	get width() {
		return this.max.x - this.min.x;
	}

	set width(v) {
		this.max.x = this.min.x + v;
	}

	get height() {
		return this.max.y - this.min.y;
	}

	set height(v) {
		this.max.y = this.min.y + v;
	}

	get origin() {
		const size = this.size;
		return new Vec2(this.min.x + size.width * 0.5, this.min.y + size.height * 0.5);
	}

	set origin({ x, y }) {
		const { width, height } = this.size;
		const hw = width * 0.5, hh = height * 0.5;
		
		this.min.x = x - hw; this.max.x = x + hw;
		this.min.y = y - hh; this.max.y = y + hh;
	}

	get rect() {
    const { x, y } = this.min;
    const { width, height } = this.size;
    return { x, y, width, height };
	}

	inflate(x, y) {
		if (x === undefined) x = 0;
		if (y === undefined) y = x;

		this.min.x -= x;
		this.min.y -= y;
		this.max.x += x;
		this.max.y += y;
	}

	expandToBBox(bbox) {
		if (this.min.x > bbox.min.x) this.min.x = bbox.min.x;
		if (this.min.y > bbox.min.y) this.min.y = bbox.min.y;
		if (this.max.x < bbox.max.x) this.max.x = bbox.max.x;
		if (this.max.y < bbox.max.y) this.max.y = bbox.max.y;
	}

	updateFromTwoPoints(p1, p2) {
		this.min.x = Math.min(p1.x, p2.x);
		this.min.y = Math.min(p1.y, p2.y);
		this.max.x = Math.max(p1.x, p2.x);
		this.max.y = Math.max(p1.y, p2.y);
	}

	updateFrom4Points(p1, p2, p3, p4) {
		this.min.x = Math.min(p1.x, p2.x, p3.x, p4.x);
		this.min.y = Math.min(p1.y, p2.y, p3.y, p4.y);
		this.max.x = Math.max(p1.x, p2.x, p3.x, p4.x);
		this.max.y = Math.max(p1.x, p2.x, p3.x, p4.x);
	}

	updateFromTwoBoundingBoxes(b1, b2) {
		this.updateFrom4Points(b1.min, b1.max, b2.min, b2.max);
	}

  updateFromPoints(vertices) {
    if (vertices.length < 1) {
      throw new Error("number of arguments must be greater than 1");
    }

    const { x, y } = vertices[0];

		this.min.x = x; this.min.y = y;
		this.max.x = x; this.max.y = y;

		for (let i = 1; i < vertices.length; i++) {
      const { x, y } = vertices[i];
			if (this.min.x > x) this.min.x = x;
			if (this.min.y > y) this.min.y = y;			
			if (this.max.x < x) this.max.x = x;
			if (this.max.y < y) this.max.y = y;
		}
	}

	// @deprecate by containsPoint
	contains(p) {
		return this.containsPoint(p);
	}

	containsPoint(p) {
		return p.x >= this.min.x && p.x <= this.max.x
			&& p.y >= this.min.y && p.y <= this.max.y;
	}

	containsRect(rect) {
		return rect.x >= this.min.x && rect.y >= this.min.y
			&& rect.right < this.max.x && rect.bottom < this.max.y;
  }
  
  intersectsRect(rect) { 
    return _mf2.rectIntersectsRect(this.rect, rect);
  }

	intersectsBBox2D(box2) {
		if (this.max.x < box2.min.x) return false;
		if (this.min.x > box2.max.x) return false;
		if (this.max.y < box2.min.y) return false;
		if (this.min.y > box2.max.y) return false;
	}

	toString() {
		return `[${this.min.x}, ${this.min.y}] - [${this.max.x}, ${this.max.y}]`;
	}

	static fromTwoPoints(v1, v2) {
		const bbox = new BoundingBox2D();
		bbox.updateFromTwoPoints(v1, v2);
		return bbox;
	}

	static from4Points(p1, p2, p3, p4) {
		const bbox = new BoundingBox2D();
		bbox.updateFrom4Points(p1, p2, p3, p4);
		return bbox;
	}

	static fromTwoBoundingBoxes(b1, b2) {
		const bbox = new BoundingBox2D();
		bbox.updateFromTwoBoundingBoxes(b1, b2);
		return bbox;
	}

	static fromPoints(vertices) {
		const bbox = new BoundingBox2D();
		bbox.updateFromPoints(vertices);
		return bbox;
	}

	static fromPolygon(p) {
		const bbox = new BoundingBox2D();
		bbox.updateFromPolygon(p);
		return bbox;
	}

  applyTransform(matrix) {
    const v1 = this.min.mulMat(matrix);
		const v2 = new Vec2(this.max.x, this.min.y).mulMat(matrix);
		const v3 = new Vec2(this.min.x, this.max.y).mulMat(matrix);
		const v4 = this.max.mulMat(matrix);

		this.min.x = Math.min(v1.x, v2.x, v3.x, v4.x);
		this.min.y = Math.min(v1.y, v2.y, v3.y, v4.y);
		this.max.x = Math.max(v1.x, v2.x, v3.x, v4.x);
		this.max.y = Math.max(v1.y, v2.y, v3.y, v4.y);
  }

	transform(matrix) {
		return BoundingBox2D.transform(this, matrix);
	}

	static transform(bbox, matrix) {
		const v1 = bbox.min.mulMat(matrix);
		const v2 = new Vec2(bbox.max.x, bbox.min.y).mulMat(matrix);
		const v3 = new Vec2(bbox.min.x, bbox.max.y).mulMat(matrix);
		const v4 = bbox.max.mulMat(matrix);

		const minx = Math.min(v1.x, v2.x, v3.x, v4.x);
		const miny = Math.min(v1.y, v2.y, v3.y, v4.y);
		const maxx = Math.max(v1.x, v2.x, v3.x, v4.x);
		const maxy = Math.max(v1.y, v2.y, v3.y, v4.y);

		return new BoundingBox2D(new Vec2(minx, miny), new Vec2(maxx, maxy));
	}
}

module.exports = { BoundingBox2D };