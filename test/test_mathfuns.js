import { MathFunctions } from "../src/functions.js";
import { testSuite } from "./framework.js";

testSuite("MathFunctions")
  .test("pointToNearestPolygon", function(t) {
    const rs = MathFunctions.pointToNearestPolygon({ x: 15, y: 19 }, [
      { x: 0, y: 0 },
      { x: 20, y: 0 },
      { x: 20, y: 20 },
      { x: 0, y: 20 }]);
    
    t.assert(rs.dist === 1);
    t.assert(rs.lineIndex === 2);
    t.assert(rs.ip.x === 15 && rs.ip.y === 20);
  })
  .test("distancePointToPolygon", function(t) {
    const rs = MathFunctions.distancePointToPolygon({ x: 15, y: 15 }, [
      { x: 0, y: 0 },
      { x: 20, y: 0 },
      { x: 20, y: 20 },
      { x: 0, y: 20 }]);
    
    t.assert(rs === 5);
  })
  .test("distancePointToPoint2D", function(t) {
    const rs = MathFunctions.distancePointToPoint2D({ x: 15, y: 10 }, { x: 20, y: 20 });
    t.assert(rs === Math.sqrt(5*5+10*10));
  })
  .stats();