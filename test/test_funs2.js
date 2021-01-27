const { testSuite } = require("./framework.js")
const { MathFunctions2 } = require("../src/functions2.js")

testSuite("MathFunctions")
  .test("pointToNearestPolygon", function(t) {
    const rs = MathFunctions2.pointToNearestPolygon({ x: 15, y: 19 }, [
      { x: 0, y: 0 },
      { x: 20, y: 0 },
      { x: 20, y: 20 },
      { x: 0, y: 20 }]);
    t.assert(rs.dist === 1);
    t.assert(rs.lineIndex === 2);
    t.assert(rs.ip.x === 15 && rs.ip.y === 20);
  })
  
  .test("distancePointToPolygon", function(t) {
    const rs = MathFunctions2.distancePointToPolygon({ x: 15, y: 15 }, [
      { x: 0, y: 0 },
      { x: 20, y: 0 },
      { x: 20, y: 20 },
      { x: 0, y: 20 }]);
    
    t.assert(rs === 5);
  })

  .test("distancePointToPoint", function(t) {
    const rs = MathFunctions2.distancePointToPoint({ x: 15, y: 10 }, { x: 20, y: 20 });
    t.assert(rs === Math.sqrt(5*5+10*10));
  })

  .test("distancePointToLine", function(t) {
    const rs = MathFunctions2.distancePointToLine({ x: 0, y: 0 }, { start: { x: 10, y: 10 }, end: { x: 20, y: 10 } });
    t.assert(rs === Math.sqrt(0*0+10*10));
  })

  .test("distancePointToLine", function(t) {
    const rs = MathFunctions2.distancePointToLine({ x: 0, y: 0 }, { start: { x: 10, y: 10 }, end: { x: 20, y: 10 } });
    t.assert(rs === Math.sqrt(0*0+10*10));
  })
  
  .stats();