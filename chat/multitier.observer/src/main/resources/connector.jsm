function addTwoJS(inParam) {
    //return inParam+2;
    var exports = TeaVM.wasm.run("classes.wasm", {
            callback: function(result) {
                this.instance = result.instance;
            }.bind(this)
    });
    // Scala parameters seem one off
    return exports.addTwoScala(0, inParam);
}
