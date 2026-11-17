import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { Quaternion } from "../src/quaternion.js";
import { Matrix4 } from "../src/matrix4.js";
import { Vec3 } from "../src/vec3.js";

describe("Quaternion", () => {
	test("toMatrix", () => {
		const q1 = new Quaternion(0.259, 0.0, 0.0, 0.966);
		const mat1 = q1.toMatrix();

		const mat2 = new Matrix4().loadIdentity();
		mat2.rotateX(30);

		assert.ok(mat1.approxiEquals(mat2, 0.001));
	});

	test("toMatrix ver.2", () => {
		const q1 = new Quaternion(-0.668, 0.153, 0.720, -0.112);
		const mat1 = q1.toMatrix();

		const mat2 = new Matrix4().loadIdentity();
		mat2.rotateX(-49.063);
		mat2.rotateY(-84.634);
		mat2.rotateZ(152.555);

		assert.ok(mat1.approxiEquals(mat2, 0.001));

		const angle1 = mat1.extractEulerAngles();
		const angle2 = mat2.extractEulerAngles();
		assert.ok(angle1.approxiEquals(angle2, 0.1));
	});

	test("fromMatrix", () => {
		const m1 = Matrix4.createLookAt(Vec3.zero, new Vec3(-1, 1, 0));

		const q = Quaternion.fromRotationMatrix(m1);
		const m2 = q.toMatrix();

		assert.ok(m1.approxiEquals(m2));
	});

	test("fromVector", () => {
		const v1 = new Vec3(0, 0, 0), v2 = new Vec3(1, 0, 1);

		const q = Quaternion.fromVectors(Vec3.normalize(v2), Vec3.forward);

		const m1 = Matrix4.createLookAt(v1, v2);
		const m2 = q.toMatrix();

		assert.ok(m1.approxiEquals(m2));
	});
});
