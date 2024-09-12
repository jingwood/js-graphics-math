import { Vec2 } from "../src/vec2.js";
import { BoundingBox2D } from "../src/bbox2.js";
import { testSuite } from "./framework.js";

testSuite("BBox2")
	.test("containsPoint", function (t) {
		const bbox1 = BoundingBox2D.fromPoints([new Vec2(-10, -10), new Vec2(10, 10)]);
		const v1 = new Vec2(2, 3);

		t.assert(bbox1.containsPoint(v1));
	})
	.test("inflate", function (t) {
		const bbox1 = BoundingBox2D.fromPoints([new Vec2(-10, -10), new Vec2(10, 10)]);
		bbox1.inflate(10);
		t.assert(Vec2.equals(bbox1.min, { x: -20, y: -20 }));
	})
	.test("createFromAnotherBBox2D", function (t) {
		const bbox1 = BoundingBox2D.fromPoints([new Vec2(-10, -20), new Vec2(30, 40)]);
		const bbox2 = new BoundingBox2D(bbox1);
		t.assert(Vec2.equals(bbox2.min, { x: -10, y: -20 }));
	})
	.stats()