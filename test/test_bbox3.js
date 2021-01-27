const { Vec3 } = require("../src/vec3.js")
const { testSuite } = require("./framework.js")
const { BoundingBox3D } = require("../src/bbox3.js")

testSuite("BBox3")
  .test("containsPoint", function(t) {
    const bbox1 = BoundingBox3D.fromPoints([new Vec3(-10, -10, -10), new Vec3(10, 10, 10)]);
    const v1 = new Vec3(2, 3, -6);
    
    t.assert(bbox1.containsPoint(v1));
  })
  .stats()