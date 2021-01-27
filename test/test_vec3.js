const { Vec3 } = require("../src/vec3.js")
const { testSuite } = require("./framework.js")

testSuite("Vec3")
  .test("add", function(t) {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(2, 3, -6);
    
    t.assert(Vec3.add(v1, v2), new Vec3(3, 5, -3));
  })
  .stats()