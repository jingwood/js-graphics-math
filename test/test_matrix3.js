const { Matrix3 } = require("../src/matrix3.js")
const { Vec2 } = require("../src/vec2.js")
const { Vec3 } = require("../src/vec3.js")
const { testSuite } = require("./framework.js")

testSuite("Matrix3")
  .test("rotate", function(t) {
    const v1 = new Vec2(3, -10);
    const mat = Matrix3.makeRotation(90);
    
    // t.assert(v1.mulMat(mat), (new Vec2(10, 3)));
    t.assert(v1.mulMat(mat).approxiEquals(new Vec2(10, 3)));
  })
  .test("invert", function(t) {
    const mat = new Matrix3();
    mat.a1 = 1; mat.b1 = 1; mat.c1 = -1;
    mat.a2 = -2; mat.b2 = -1; mat.c2 = 1;
    mat.a3 = -1; mat.b3 = -2; mat.c3 = 1;

    const inversedMat = new Matrix3();
    inversedMat.a1 = -1; inversedMat.b1 = -1; inversedMat.c1 = 0;
    inversedMat.a2 = -1; inversedMat.b2 = 0; inversedMat.c2 = -1;
    inversedMat.a3 = -3; inversedMat.b3 = -1; inversedMat.c3 = -1;

    t.assert(mat.inverse().equals(inversedMat));
  })
  .test("invert, vector", function(t) {
   
    const mat = new Matrix3();
    mat.a1 = 1; mat.b1 = 1; mat.c1 = -1;
    mat.a2 = -2; mat.b2 = -1; mat.c2 = 1;
    mat.a3 = -1; mat.b3 = -2; mat.c3 = 1;

    const v1 = new Vec3(2, 3, 0);
    const inversedMat = mat.inverse();
    const v1t = v1.mulMat(mat).mulMat(inversedMat);

    t.assert(v1.equals(v1t));
  })
  .stats()