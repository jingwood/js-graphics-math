import { testSuite } from "./framework.js";
import { Quaternion } from "../src/quaternion.js";
import { Matrix4 } from "../src/matrix4.js";

testSuite("Quaternion")
  .test("toMatrix", function(t) {
    const q1 = new Quaternion(0.259, 0.0, 0.0, 0.966);
    const mat1 = q1.toMatrix();
   
    const mat2 = new Matrix4().loadIdentity();
    mat2.rotateX(30);

    // console.log(mat1, mat2);
    // t.assert(mat1.approxiEquals(mat2));
  })
  .stats()