import { Vec2 } from "../src/vec2.js";
import { testSuite } from "./framework.js";

testSuite("Vec2")
  .test("add", function(t) {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(2, 3);
    
    t.assert(Vec2.add(v1, v2), new Vec2(3, 5));
  })
  .test("sub", function(t) {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(2, 5);
    
    t.assert(Vec2.sub(v1, v2), new Vec2(-1, -3));
  })
  .test("mul scale1", function(t) {
    const v1 = new Vec2(1, 2);
    const v2 = -5;
    
    t.assert(Vec2.mul(v1, v2), new Vec2(-5, -10));
  })
  .test("mul scale2", function(t) {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(2, 5);
    
    t.assert(Vec2.mul(v1, v2), new Vec2(2, 10));
  })
  .test("div scale1", function(t) {
    const v1 = new Vec2(1, 2);
    const v2 = -5;
    
    t.assert(Vec2.div(v1, v2), new Vec2(-0.2, -0.4));
  })
  .test("div scale2", function(t) {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(2, 5);
    
    t.assert(Vec2.div(v1, v2), new Vec2(0.5, 0.4));
  })
  .stats();
