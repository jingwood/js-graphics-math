import { Matrix3 } from "../src/matrix3.js";
import { Vec2 } from "../src/vec2.js";
import { testSuite } from "./framework.js";

testSuite("Matrix3")
  .test("rotate", function(t) {
    const v1 = new Vec2(3, -10);
    const mat = Matrix3.makeRotation(90);
    
    // t.assert(v1.mulMat(mat), (new Vec2(10, 3)));
    t.assert(v1.mulMat(mat).approxiEquals(new Vec2(10, 3)));
  })
  .stats()