import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { Vec3 } from "../src/vec3.js";
import { BoundingBox3D } from "../src/bbox3.js";

describe("BoundingBox3D", () => {
	test("containsPoint", () => {
		const bbox1 = BoundingBox3D.fromPoints([new Vec3(-10, -10, -10), new Vec3(10, 10, 10)]);
		const v1 = new Vec3(2, 3, -6);

		assert.ok(bbox1.containsPoint(v1));
	});
});
