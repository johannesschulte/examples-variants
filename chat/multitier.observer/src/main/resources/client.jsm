/*
 *  Copyright 2018 Alexey Andreev.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
    let lineBuffer = "";
    function putwchar(charCode) {
        if (charCode === 10) {
            console.log(lineBuffer);
            lineBuffer = "";
        } else {
            lineBuffer += String.fromCharCode(charCode);
        }
    }
    function towlower(code) {
        return String.fromCharCode(code).toLowerCase().charCodeAt(0);
    }
    function towupper(code) {
        return String.fromCharCode(code).toUpperCase().charCodeAt(0);
    }
    function currentTimeMillis() {
        return new Date().getTime();
    }
    function getNativeOffset(instant) {
        return new Date(instant).getTimezoneOffset();
    }

    function importDefaults(obj) {
        obj.teavm = {
            currentTimeMillis: currentTimeMillis,
            isnan: isNaN,
            TeaVM_getNaN: function() { return NaN; },
            isinf: function(n) { return !isFinite(n) },
            isfinite: isFinite,
            putwchar: putwchar,
            towlower: towlower,
            towupper: towupper,
            getNativeOffset: getNativeOffset
        };

        obj.teavmMath = Math;
    }


// ugly hack to work around a TeaVM error, which produces "(import "" "<unknown>")"
let importObj = {'' : {
    '<unknown>' : function (){}
}};

importDefaults(importObj);

var buffer = new Uint8Array([__WASMCODE__])

var wasmExports = {}
// Load and compile WebAssembly before starting execution of scala.js code
WebAssembly.compile(buffer)
    .then(mod => WebAssembly.instantiate(mod, importObj))
    .then(ins =>  {
	wasmExports = ins.exports
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "../chatmultiobservejs-fastopt.js";
	document.body.appendChild(script);
    }
)
