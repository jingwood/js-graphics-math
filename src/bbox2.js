
import { Vec2 } from "./vec2.js"

export class BBox2D {
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
				if (bbox2 instanceof BBox2D) {
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
				throw new Error("BBox2D: unsupported arguments to set");
		}
	}

  get size() {
    return { width: this.width, height: this.height };
	}

	get width() {
		return this.max.x - this.min.x;
	}

	get height() {
		return this.max.y - this.min.y;
	}

	get origin() {
		const size = this.size;
		return new Vec2(this.min.x + size.width * 0.5, this.min.y + size.height * 0.5);
	}

	get rect() {
    const { x, y } = this.min;
    const { width, height } = this.size;
    return { x, y, width, height };
	}

	expendToBBox(bbox) {
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

	// @deprecate
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
		const bbox = new BBox2D();
		bbox.updateFromTwoPoints(v1, v2);
		return bbox;
	}

	static from4Points(p1, p2, p3, p4) {
		const bbox = new BBox2D();
		bbox.updateFrom4Points(p1, p2, p3, p4);
		return bbox;
	}

	static fromTwoBoundingBoxes(b1, b2) {
		const bbox = new BBox2D();
		bbox.updateFromTwoBoundingBoxes(b1, b2);
		return bbox;
	}

	static fromPoints(vertices) {
		const bbox = new BBox2D();
		bbox.updateFromPoints(vertices);
		return bbox;
	}

	static fromPolygon(p) {
		const bbox = new BBox2D();
		bbox.updateFromPolygon(p);
		return bbox;
	}
}