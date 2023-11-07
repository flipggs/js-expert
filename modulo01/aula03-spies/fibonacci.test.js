const { createSandbox } = require("sinon");
const sinon = createSandbox();
const Fibonacci = require("./fibonacci");
const assert = require("assert");

const fibonacci = new Fibonacci();

;(async () => {
  {
    const spy = sinon.spy(
      fibonacci,
      fibonacci.execute.name
    )

    for (const sequence of fibonacci.execute(5)) {}
    const expectedCallCount = 6;
    
    const { args } = spy.getCall(2);
    const expectedParams = [3, 1, 2];
    
    assert.strictEqual(spy.callCount, expectedCallCount);
    assert.deepStrictEqual(args, expectedParams);
  }

})();