import { testSuite } from "./framework.js";
import { Quaternion } from "../src/quaternion.js";
import { Matrix4 } from "../src/matrix4.js";

testSuite("Quaternion")
  .test("toMat", function(t) {
    const q1 = new Quaternion(0.259, 0.0, 0.0, 0.966);
   
    const tmat = new Matrix4().loadIdentity();
    tmat.rotateX(30);

    console.log(q1.toMatrix());
    console.log(tmat);


    // t.assert(Vec3.add(v1, v2), new Vec3(3, 5, -3));
  })
  .stats()