import { Vec3 } from "../src/vec3.js";
import { testSuite } from "./framework.js";
import { BoundingBox3D } from "../src/bbox3.js";

testSuite("BBox3")
	.test("containsPoint", function (t) {
		const bbox1 = BoundingBox3D.fromPoints([new Vec3(-10, -10, -10), new Vec3(10, 10, 10)]);
		const v1 = new Vec3(2, 3, -6);

		t.assert(bbox1.containsPoint(v1));
	})
	.stats()