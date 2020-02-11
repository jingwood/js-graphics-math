import { Vec2 } from "../src/vec2.js";
import { BoundingBox2D } from "../src/bbox2.js";
import { testSuite } from "./framework.js";

testSuite("BBox2")
  .test("containsPoint", function(t) {
    const bbox1 = BoundingBox2D.fromPoints([new Vec2(-10, -10), new Vec2(10, 10)]);
    const v1 = new Vec2(2, 3);
    
    t.assert(bbox1.containsPoint(v1));
  })
  .stats()