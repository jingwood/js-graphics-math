import { testSuite } from "./framework.js";
import { Quaternion } from "../src/quaternion.js";
import { Matrix4 } from "../src/matrix4.js";
import { approxiEquals } from "../src/functions.js";

testSuite("Quaternion")
  .test("toMatrix", function(t) {
    const q1 = new Quaternion(0.259, 0.0, 0.0, 0.966);
    const mat1 = q1.toMatrix();
   
    const mat2 = new Matrix4().loadIdentity();
    mat2.rotateX(30);

    t.assert(mat1.approxiEquals(mat2, 0.001));
  }).test("toMatrix ver.2", function(t) {
    const q1 = new Quaternion(-0.668, 0.153, 0.720, -0.112);
    const mat1 = q1.toMatrix();
   
    const mat2 = new Matrix4().loadIdentity();
    mat2.rotateX(-49.063);
    mat2.rotateY(-84.634);
    mat2.rotateZ(152.555);

    // console.log(mat1, mat2);
    t.assert(mat1.approxiEquals(mat2, 0.001));
    
    const angle1 = mat1.extractEulerAngles();
    const angle2 = mat2.extractEulerAngles();
    console.log(angle1, angle2);
    t.assert(angle1.approxiEquals(angle2, 0.1));
  })
  .stats()