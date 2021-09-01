(function() {
    const codeName = "Fill registers with 1";
    const code = "+[++>-]+<---";
    const expectedResult = "";
    const model = new ExampleModel(
        codeName,
        code,
        "",
        expectedResult
    );
    Examples.add(model);
})();
    