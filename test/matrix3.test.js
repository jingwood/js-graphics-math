import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { Matrix3 } from "../src/matrix3.js";
import { Vec2 } from "../src/vec2.js";
import { Vec3 } from "../src/vec3.js";

function createTestMatrix() {
	const mat = new Matrix3();
	mat.a1 = 1; mat.b1 = 1; mat.c1 = -1;
	mat.a2 = -2; mat.b2 = -1; mat.c2 = 1;
	mat.a3 = -1; mat.b3 = -2; mat.c3 = 1;
	return mat;
}

describe("Matrix3", () => {
	test("rotate", () => {
		const v1 = new Vec2(3, -10);
		const mat = Matrix3.makeRotation(90);

		assert.ok(v1.mulMat(mat).approxiEquals(new Vec2(10, 3)));
	});

	test("invert", () => {
		const mat = createTestMatrix();

		const inversedMat = new Matrix3();
		inversedMat.a1 = -1; inversedMat.b1 = -1; inversedMat.c1 = 0;
		inversedMat.a2 = -1; inversedMat.b2 = 0; inversedMat.c2 = -1;
		inversedMat.a3 = -3; inversedMat.b3 = -1; inversedMat.c3 = -1;

		assert.ok(mat.inverse().equals(inversedMat));
	});

	test("invert, vector", () => {
		const mat = createTestMatrix();

		const v1 = new Vec3(2, 3, 0);
		const inversedMat = mat.inverse();
		const v1t = v1.mulMat(mat).mulMat(inversedMat);

		assert.ok(v1.equals(v1t));
	});
});
