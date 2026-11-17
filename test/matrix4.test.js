import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { Matrix4 } from "../src/matrix4.js";
import { Vec3 } from "../src/vec3.js";

describe("Matrix4", () => {
	test("rotate", () => {
		const v1 = new Vec3(3, -10, 2);
		const mat = new Matrix4().loadIdentity().rotateX(90).rotateZ(45);
		const res = v1.mulMat(mat);

		assert.ok(res.approxiEquals(new Vec3(9.19239, -2.00000, -4.94975)));
	});
});
