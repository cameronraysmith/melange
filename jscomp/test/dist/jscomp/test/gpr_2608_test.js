// Generated by Melange
'use strict';

var Mt = require("./mt.js");
var Stdlib__List = require("melange/stdlib_modules/list.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

var oppHeroes = {
  hd: 0,
  tl: /* [] */0
};

var huntGrootCondition = false;

if (Stdlib__List.length(/* [] */0) > 0) {
  var x = Stdlib__List.filter(function (h) {
          return Stdlib__List.hd(/* [] */0) <= 1000;
        })(oppHeroes);
  huntGrootCondition = Stdlib__List.length(x) === 0;
}

var huntGrootCondition2 = true;

if (Stdlib__List.length(/* [] */0) < 0) {
  var x$1 = Stdlib__List.filter(function (h) {
          return Stdlib__List.hd(/* [] */0) <= 1000;
        })(oppHeroes);
  huntGrootCondition2 = Stdlib__List.length(x$1) === 0;
}

eq("File \"gpr_2608_test.ml\", line 23, characters 5-12", huntGrootCondition, false);

eq("File \"gpr_2608_test.ml\", line 24, characters 5-12", huntGrootCondition2, true);

Mt.from_pair_suites("Gpr_2608_test", suites.contents);

var nearestGroots = /* [] */0;

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.nearestGroots = nearestGroots;
exports.oppHeroes = oppHeroes;
exports.huntGrootCondition = huntGrootCondition;
exports.huntGrootCondition2 = huntGrootCondition2;
/* huntGrootCondition Not a pure module */