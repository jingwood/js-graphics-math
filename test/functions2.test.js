import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { MathFunctions2 } from "../src/functions2.js";

const square = [
	{ x: 0, y: 0 },
	{ x: 20, y: 0 },
	{ x: 20, y: 20 },
	{ x: 0, y: 20 },
];

describe("MathFunctions2", () => {
	test("pointToNearestPolygon", () => {
		const rs = MathFunctions2.pointToNearestPolygon({ x: 15, y: 19 }, square);

		assert.equal(rs.dist, 1);
		assert.equal(rs.lineIndex, 2);
		assert.equal(rs.ip.x, 15);
		assert.equal(rs.ip.y, 20);
	});

	test("distancePointToPolygon", () => {
		const rs = MathFunctions2.distancePointToPolygon({ x: 15, y: 15 }, square);

		assert.equal(rs, 5);
	});

	test("distancePointToPoint", () => {
		const rs = MathFunctions2.distancePointToPoint({ x: 15, y: 10 }, { x: 20, y: 20 });

		assert.equal(rs, Math.sqrt(5 * 5 + 10 * 10));
	});

	test("distancePointToLine", () => {
		const rs = MathFunctions2.distancePointToLine({ x: 0, y: 0 }, { start: { x: 10, y: 10 }, end: { x: 20, y: 10 } });

		assert.equal(rs, Math.sqrt(0 * 0 + 10 * 10));
	});
});
