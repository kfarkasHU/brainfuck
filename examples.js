class Examples {};
Examples._cache = [];
Examples.add = function(registerMode) {
    Examples._cache.push(registerMode);
}
Examples.getAll = function() {
    return [...Examples._cache];
}
Examples.find = function(name) {
    return this._cache.find(m => m.name === name);
}
