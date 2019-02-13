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

var TeaVM = TeaVM || {};
TeaVM.wasm = function() {
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

    function run(path, options) {
        if (!options) {
            options = {};
        }

        let callback = typeof options.callback !== "undefined" ? options.callback : function() {};
        let errorCallback = typeof options.errorCallback !== "undefined" ? options.errorCallback : function() {};

        let importObj = {};
        importDefaults(importObj);
        if (typeof options.installImports !== "undefined") {
            options.installImports(importObj);
        }
	
	var buffer = new Uint8Array([0,97,115,109,1,0,0,0,1,19,4,96,1,127,1,127
,96,0,0,96,0,1,127,96,2,127,127,1,127,3,20,19
,0,1,1,2,3,0,0,0,0,0,0,0,0,0,0,0
,1,1,1,4,4,1,112,0,19,5,6,1,1,128,1,128
,1,7,45,3,18,115,121,115,36,99,97,116,99,104,69,120
,99,101,112,116,105,111,110,0,3,11,97,100,100,84,119,111
,83,99,97,108,97,0,4,6,109,101,109,111,114,121,2,0
,8,1,18,9,17,1,0,65,0,11,11,8,7,6,5,9
,10,11,12,13,14,15,10,174,6,19,190,1,1,1,127,2
,127,65,144,5,40,2,0,65,0,70,4,64,65,0,15,11
,2,64,2,64,3,64,65,136,5,40,2,0,32,0,106,65
,132,5,40,2,0,70,4,64,12,3,11,65,136,5,40,2
,0,32,0,65,8,106,106,65,132,5,40,2,0,73,4,64
,12,3,11,65,144,5,40,2,0,65,1,107,33,1,65,144
,5,32,1,54,2,0,32,1,65,0,70,4,64,12,2,11
,65,148,5,65,148,5,40,2,0,65,136,5,40,2,0,40
,2,4,107,54,2,0,65,140,5,65,140,5,40,2,0,65
,1,65,4,108,106,54,2,0,65,136,5,65,140,5,40,2
,0,40,2,0,54,2,0,65,132,5,65,136,5,40,2,0
,65,136,5,40,2,0,40,2,4,106,54,2,0,12,0,11
,11,65,0,15,11,65,1,15,11,11,113,0,2,64,65,148
,5,66,168,244,243,3,167,54,2,0,65,136,5,65,216,139
,12,54,2,0,65,136,5,40,2,0,65,0,54,2,0,65
,136,5,40,2,0,66,168,244,243,3,167,54,2,4,65,132
,5,65,136,5,40,2,0,65,136,5,40,2,0,40,2,4
,106,54,2,0,65,140,5,65,128,144,4,54,2,0,65,140
,5,40,2,0,65,136,5,40,2,0,54,2,0,65,144,5
,65,1,54,2,0,65,0,16,0,26,11,11,14,0,2,64
,65,156,7,65,128,16,54,2,0,11,11,26,1,1,127,2
,127,65,180,8,40,2,0,33,0,65,180,8,65,0,54,2
,0,32,0,15,11,11,8,0,32,1,65,2,106,15,11,37
,0,32,0,65,16,106,40,2,0,33,0,32,0,65,1,72
,4,64,65,0,15,11,32,0,65,3,74,4,64,65,0,15
,11,65,1,15,11,37,0,32,0,65,16,106,40,2,0,33
,0,32,0,65,0,72,4,64,65,0,15,11,32,0,65,44
,74,4,64,65,0,15,11,65,1,15,11,28,0,32,0,65
,28,106,40,2,0,33,0,32,0,65,0,70,4,127,65,0
,5,32,0,16,8,11,15,11,9,0,32,0,65,152,2,70
,15,11,37,0,32,0,65,16,106,40,2,0,33,0,32,0
,65,3,72,4,64,65,0,15,11,32,0,65,5,74,4,64
,65,0,15,11,65,1,15,11,37,0,32,0,65,16,106,40
,2,0,33,0,32,0,65,5,72,4,64,65,0,15,11,32
,0,65,7,74,4,64,65,0,15,11,65,1,15,11,37,0
,32,0,65,16,106,40,2,0,33,0,32,0,65,7,72,4
,64,65,0,15,11,32,0,65,9,74,4,64,65,0,15,11
,65,1,15,11,37,0,32,0,65,16,106,40,2,0,33,0
,32,0,65,31,72,4,64,65,0,15,11,32,0,65,33,74
,4,64,65,0,15,11,65,1,15,11,37,0,32,0,65,16
,106,40,2,0,33,0,32,0,65,33,72,4,64,65,0,15
,11,32,0,65,35,74,4,64,65,0,15,11,65,1,15,11
,37,0,32,0,65,16,106,40,2,0,33,0,32,0,65,35
,72,4,64,65,0,15,11,32,0,65,37,74,4,64,65,0
,15,11,65,1,15,11,37,0,32,0,65,16,106,40,2,0
,33,0,32,0,65,41,72,4,64,65,0,15,11,32,0,65
,43,74,4,64,65,0,15,11,65,1,15,11,33,0,2,64
,65,236,5,40,2,0,65,1,113,13,0,65,236,5,65,236
,5,40,2,0,65,1,114,54,2,0,16,1,11,11,33,0
,2,64,65,140,8,40,2,0,65,1,113,13,0,65,140,8
,65,140,8,40,2,0,65,1,114,54,2,0,16,2,11,11
,6,0,16,16,16,17,11,11,228,12,1,0,65,128,2,11
,220,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,80,1,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0
,0,0,0,0,0,0,174,170,170,170,0,0,0,0,24,1
,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,128,0,0,0,0,148,1
,0,0,0,0,0,0,42,0,0,128,0,0,0,0,16,0
,0,0,106,0,97,0,118,0,97,0,46,0,108,0,97,0
,110,0,103,0,46,0,79,0,98,0,106,0,101,0,99,0
,116,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0
,0,0,0,0,0,0,162,170,170,170,132,1,0,0,0,0
,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,128,0,0,0,0,4,2
,0,0,0,0,0,0,42,0,0,128,0,0,0,0,29,0
,0,0,111,0,114,0,103,0,46,0,116,0,101,0,97,0
,118,0,109,0,46,0,114,0,117,0,110,0,116,0,105,0
,109,0,101,0,46,0,83,0,104,0,97,0,100,0,111,0
,119,0,83,0,116,0,97,0,99,0,107,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0
,0,0,1,0,0,0,162,171,170,170,244,1,0,0,0,0
,0,0,0,0,0,0,3,0,0,0,192,1,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0
,0,0,168,2,0,0,0,0,0,0,42,0,0,128,0,0
,0,0,20,0,0,0,111,0,114,0,103,0,46,0,116,0
,101,0,97,0,118,0,109,0,46,0,114,0,117,0,110,0
,116,0,105,0,109,0,101,0,46,0,71,0,67,0,0,0
,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0
,0,0,3,0,0,0,162,169,170,170,152,2,0,0,0,0
,0,0,0,0,0,0,4,0,0,0,192,1,0,0,0,0
,0,0,0,0,0,0,0,0,0,128,0,0,0,0,36,3
,0,0,0,0,0,0,42,0,0,128,0,0,0,0,25,0
,0,0,111,0,114,0,103,0,46,0,116,0,101,0,97,0
,118,0,109,0,46,0,114,0,117,0,110,0,116,0,105,0
,109,0,101,0,46,0,77,0,117,0,116,0,97,0,116,0
,111,0,114,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,8,0,0,0,0,0,0,0,5,0,0,0,162,175
,170,170,20,3,0,0,0,0,0,0,0,0,0,0,5,0
,0,0,192,1,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,128,0,0,0,0,176,3,0,0,0,0
,0,0,42,0,0,128,0,0,0,0,34,0,0,0,111,0
,114,0,103,0,46,0,116,0,101,0,97,0,118,0,109,0
,46,0,98,0,97,0,99,0,107,0,101,0,110,0,100,0
,46,0,119,0,97,0,115,0,109,0,46,0,87,0,97,0
,115,0,109,0,82,0,117,0,110,0,116,0,105,0,109,0
,101,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0
,0,0,7,0,0,0,162,173,170,170,160,3,0,0,0,0
,0,0,0,0,0,0,6,0,0,0,192,1,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0
,0,0,72,4,0,0,0,0,0,0,42,0,0,128,0,0
,0,0,35,0,0,0,111,0,114,0,103,0,46,0,116,0
,101,0,97,0,118,0,109,0,46,0,114,0,117,0,110,0
,116,0,105,0,109,0,101,0,46,0,69,0,120,0,99,0
,101,0,112,0,116,0,105,0,111,0,110,0,72,0,97,0
,110,0,100,0,108,0,105,0,110,0,103,0,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0
,0,0,31,0,0,0,162,181,170,170,56,4,0,0,0,0
,0,0,0,0,0,0,7,0,0,0,192,1,0,0,0,0
,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,128,0,0,0,0,240,4,0,0,0,0
,0,0,42,0,0,128,0,0,0,0,27,0,0,0,111,0
,114,0,103,0,46,0,116,0,101,0,97,0,118,0,109,0
,46,0,114,0,117,0,110,0,116,0,105,0,109,0,101,0
,46,0,77,0,97,0,114,0,107,0,81,0,117,0,101,0
,117,0,101,0,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,8,0,0,0,0,0,0,0,33,0,0,0,162,139
,170,170,224,4,0,0,0,0,0,0,0,0,0,0,8,0
,0,0,192,1,0,0,0,0,0,0,0,0,0,0,0,0
,0,128,0,0,0,0,124,5,0,0,0,0,0,0,42,0
,0,128,0,0,0,0,26,0,0,0,97,0,100,0,100,0
,101,0,114,0,112,0,97,0,99,0,107,0,97,0,103,0
,101,0,46,0,84,0,119,0,111,0,65,0,100,0,100,0
,101,0,114,0,83,0,99,0,97,0,108,0,97,0,0,0
,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0
,0,0,35,0,0,0,162,137,170,170,108,5,0,0,0,0
,0,0,0,0,0,0,9,0,0,0,192,1,0,0,0,0
,0,0,0,0,0,0,0,0,0,128,0,0,0,0,4,6
,0,0,0,0,0,0,42,0,0,128,0,0,0,0,27,0
,0,0,111,0,114,0,103,0,46,0,116,0,101,0,97,0
,118,0,109,0,46,0,114,0,117,0,110,0,116,0,105,0
,109,0,101,0,46,0,65,0,108,0,108,0,111,0,99,0
,97,0,116,0,111,0,114,0,0,0,0,0,0,0,0,0
,0,0,8,0,0,0,0,0,0,0,41,0,0,0,162,131
,170,170,244,5,0,0,0,0,0,0,0,0,0,0,10,0
,0,0,192,1,0,0,0,0,0,0,0,0,0,0,0,0
,0,0,0,0,0,0,148,6,0,0,0,0,0,0,0,0
,0,0,64,7,0,0,164,6,0,0,244,5,0,0,0,7
,0,0,52,0,0,0,0,0,0,128,0,0,0,0,180,6
,0,0,0,0,0,0,42,0,0,128,0,0,0,0,32,0
,0,0,111,0,114,0,103,0,47,0,116,0,101,0,97,0
,118,0,109,0,47,0,114,0,117,0,110,0,116,0,105,0
,109,0,101,0,47,0,65,0,108,0,108,0,111,0,99,0
,97,0,116,0,111,0,114,0,46,0,106,0,97,0,118,0
,97,0,0,0,0,128,0,0,0,0,16,7,0,0,0,0
,0,0,42,0,0,128,0,0,0,0,18,0,0,0,97,0
,108,0,108,0,111,0,99,0,97,0,116,0,101,0,77,0
,117,0,108,0,116,0,105,0,65,0,114,0,114,0,97,0
,121,0,164,6,0,0,244,5,0,0,0,7,0,0,57,0
,0,0,1,0,0,0,0,0,0,0,52,4,0,0,0,227
,6,4,110,97,109,101,1,219,6,19,0,65,109,101,116,104
,111,100,36,50,48,111,114,103,95,103,116,101,97,118,109,95
,103,114,117,110,116,105,109,101,95,103,71,67,95,90,50,55
,95,103,101,116,65,118,97,105,108,97,98,108,101,67,104,117
,110,107,73,102,80,111,115,115,105,98,108,101,73,1,47,109
,101,116,104,111,100,36,50,48,111,114,103,95,103,116,101,97
,118,109,95,103,114,117,110,116,105,109,101,95,103,71,67,95
,86,49,48,95,95,104,99,108,105,110,105,116,95,105,2,62
,109,101,116,104,111,100,36,51,52,111,114,103,95,103,116,101
,97,118,109,95,103,98,97,99,107,101,110,100,95,103,119,97
,115,109,95,103,87,97,115,109,82,117,110,116,105,109,101,95
,86,49,48,95,95,104,99,108,105,110,105,116,95,105,3,89
,109,101,116,104,111,100,36,51,53,111,114,103,95,103,116,101
,97,118,109,95,103,114,117,110,116,105,109,101,95,103,69,120
,99,101,112,116,105,111,110,72,97,110,100,108,105,110,103,95
,49,57,95,106,97,118,97,95,103,108,97,110,103,95,103,84
,104,114,111,119,97,98,108,101,49,52,95,99,97,116,99,104
,69,120,99,101,112,116,105,111,110,4,47,109,101,116,104,111
,100,36,50,54,97,100,100,101,114,112,97,99,107,97,103,101
,95,103,84,119,111,65,100,100,101,114,83,99,97,108,97,95
,73,54,95,97,100,100,84,119,111,73,5,47,105,115,83,117
,112,101,114,116,121,112,101,36,50,57,95,111,114,103,95,103
,116,101,97,118,109,95,103,114,117,110,116,105,109,101,95,103
,83,104,97,100,111,119,83,116,97,99,107,6,33,105,115,83
,117,112,101,114,116,121,112,101,36,49,54,95,106,97,118,97
,95,103,108,97,110,103,95,103,79,98,106,101,99,116,7,14
,105,115,83,117,112,101,114,116,121,112,101,36,65,67,8,13
,105,115,83,117,112,101,114,116,121,112,101,36,67,9,38,105
,115,83,117,112,101,114,116,121,112,101,36,50,48,95,111,114
,103,95,103,116,101,97,118,109,95,103,114,117,110,116,105,109
,101,95,103,71,67,10,43,105,115,83,117,112,101,114,116,121
,112,101,36,50,53,95,111,114,103,95,103,116,101,97,118,109
,95,103,114,117,110,116,105,109,101,95,103,77,117,116,97,116
,111,114,11,53,105,115,83,117,112,101,114,116,121,112,101,36
,51,52,95,111,114,103,95,103,116,101,97,118,109,95,103,98
,97,99,107,101,110,100,95,103,119,97,115,109,95,103,87,97
,115,109,82,117,110,116,105,109,101,12,53,105,115,83,117,112
,101,114,116,121,112,101,36,51,53,95,111,114,103,95,103,116
,101,97,118,109,95,103,114,117,110,116,105,109,101,95,103,69
,120,99,101,112,116,105,111,110,72,97,110,100,108,105,110,103
,13,45,105,115,83,117,112,101,114,116,121,112,101,36,50,55
,95,111,114,103,95,103,116,101,97,118,109,95,103,114,117,110
,116,105,109,101,95,103,77,97,114,107,81,117,101,117,101,14
,42,105,115,83,117,112,101,114,116,121,112,101,36,50,54,95
,97,100,100,101,114,112,97,99,107,97,103,101,95,103,84,119
,111,65,100,100,101,114,83,99,97,108,97,15,45,105,115,83
,117,112,101,114,116,121,112,101,36,50,55,95,111,114,103,95
,103,116,101,97,118,109,95,103,114,117,110,116,105,109,101,95
,103,65,108,108,111,99,97,116,111,114,16,30,99,108,105,110
,105,116,36,111,114,103,95,103,116,101,97,118,109,95,103,114
,117,110,116,105,109,101,95,103,71,67,17,45,99,108,105,110
,105,116,36,111,114,103,95,103,116,101,97,118,109,95,103,98
,97,99,107,101,110,100,95,103,119,97,115,109,95,103,87,97
,115,109,82,117,110,116,105,109,101,18,9,95,95,115,116,97
,114,116,95,95]);
	var ins = new WebAssembly.Instance(new WebAssembly.Module(buffer), importObj);
	return ins.exports;
    }

    return { importDefaults: importDefaults, run: run };
}();

function stringToArrayBuffer(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);

    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }

    return buf;
}
