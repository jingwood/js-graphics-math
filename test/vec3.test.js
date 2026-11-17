import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { Vec3 } from "../src/vec3.js";

describe("Vec3", () => {
	test("add", () => {
		const v1 = new Vec3(1, 2, 3);
		const v2 = new Vec3(2, 3, -6);

		assert.ok(Vec3.add(v1, v2).equals(new Vec3(3, 5, -3)));
	});
});
