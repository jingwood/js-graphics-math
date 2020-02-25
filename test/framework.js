import { approxiEquals } from "../src/functions.js";

function compare(a, b) {
  if (typeof a.equals === "function") {
    return a.equals(b);
  } else {
    return a == b;
  }
}

class _TestSuite {
  constructor(name) {
    this.name = name;
    this.cases = [];

    this._currentTestCase = null;

    this.tested = 0;
    this.successed = 0;
    this.failed = 0;
  }

  test(name, callback) {
    if (this.tested === 0) {
      console.log(`test suite ${this.name}:`);
    }

    this._currentTestName = name;
    this._currentTestSuccess = true;

    try {
      callback(this);
    } catch (ex) {
      console.log(` - '${this._currentTestName}' failed: ${ex}`);
      this._currentTestSuccess = false;
    }
     
    this.tested++;
   
    if (this._currentTestSuccess) {
      this.successed++;
    } else {
      this.failed++;
    }
    
    return this;
  }
  
  stats() {
    console.log(` done ${this.tested} tested, ${this.successed} successed, ${this.failed} failed.\n`);
  }

  assertTrue(res) {
    if (!res) {
      this._currentTestSuccess = false;
      console.log(` - '${this._currentTestName}' failed, expect ${expect} but ${ret}`);
    }
  }

  assert(ret, expect = true) {
    return this.assertTrue(compare(ret, expect));
  }

  approxiAssert(ret, expect = true) {
    return this.assertTrue(approxiEquals(ret, expect));
  }
}

function testSuite(name, cases) {
  return new _TestSuite(name, cases);
}

export { testSuite };