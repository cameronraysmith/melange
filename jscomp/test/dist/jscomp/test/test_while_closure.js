// Generated by Melange
'use strict';

var Caml_array = require("melange.js/caml_array.js");
var Curry = require("melange.js/curry.js");
var Stdlib__Array = require("melange/array.js");

var v = {
  contents: 0
};

var arr = Caml_array.make(10, (function (param) {
        
      }));

function f(param) {
  var n = 0;
  while(n < 10) {
    var j = n;
    Caml_array.set(arr, j, (function(j){
        return function (param) {
          v.contents = v.contents + j | 0;
        }
        }(j)));
    n = n + 1 | 0;
  };
}

f(undefined);

Stdlib__Array.iter((function (x) {
        Curry._1(x, undefined);
      }), arr);

console.log(String(v.contents));

if (v.contents !== 45) {
  throw new Error("Assert_failure", {
            cause: {
              MEL_EXN_ID: "Assert_failure",
              _1: [
                "jscomp/test/test_while_closure.ml",
                63,
                4
              ]
            }
          });
}

var count = 10;

exports.v = v;
exports.count = count;
exports.arr = arr;
exports.f = f;
/*  Not a pure module */
