(function() {
const codeName = "Hello World!";
const code = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.";
const expectedResult = "Hello World!";
const model = new ExampleModel(
    codeName,
    code,
    "",
    expectedResult
);
Examples.add(model);
})();
