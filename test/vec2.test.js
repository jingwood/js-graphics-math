import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { Vec2 } from "../src/vec2.js";
import { approxiEquals } from "../src/functions.js";

describe("Vec2", () => {
	test("add", () => {
		const v1 = new Vec2(1, 2);
		const v2 = new Vec2(2, 3);

		assert.ok(Vec2.add(v1, v2).equals(new Vec2(3, 5)));
	});

	test("sub", () => {
		const v1 = new Vec2(1, 2);
		const v2 = new Vec2(2, 5);

		assert.ok(Vec2.sub(v1, v2).equals(new Vec2(-1, -3)));
	});

	test("mul scale1", () => {
		const v1 = new Vec2(1, 2);
		const v2 = -5;

		assert.ok(Vec2.mul(v1, v2).equals(new Vec2(-5, -10)));
	});

	test("mul scale2", () => {
		const v1 = new Vec2(1, 2);
		const v2 = new Vec2(2, 5);

		assert.ok(Vec2.mul(v1, v2).equals(new Vec2(2, 10)));
	});

	test("div scale1", () => {
		const v1 = new Vec2(1, 2);
		const v2 = -5;

		assert.ok(Vec2.div(v1, v2).equals(new Vec2(-0.2, -0.4)));
	});

	test("div scale2", () => {
		const v1 = new Vec2(1, 2);
		const v2 = new Vec2(2, 5);

		assert.ok(Vec2.div(v1, v2).equals(new Vec2(0.5, 0.4)));
	});

	test("length, normalize", () => {
		const v1 = new Vec2(3, 4);
		assert.equal(v1.length(), 5);

		const n1 = v1.normalize();
		assert.ok(approxiEquals(n1.x, 3 / 5));
		assert.ok(approxiEquals(n1.y, 4 / 5));
	});
});
