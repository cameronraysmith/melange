// Generated by Melange
'use strict';

var Caml_bytes = require("melange.js/caml_bytes.js");
var Caml_exceptions = require("melange.js/caml_exceptions.js");
var Caml_js_exceptions = require("melange.js/caml_js_exceptions.js");
var Caml_string = require("melange.js/caml_string.js");
var Curry = require("melange.js/curry.js");
var Ext_bytes_test = require("./ext_bytes_test.js");
var Stdlib__Bytes = require("melange/bytes.js");
var Stdlib__List = require("melange/list.js");
var Stdlib__String = require("melange/string.js");

function split_by(keep_emptyOpt, is_delim, str) {
  var keep_empty = keep_emptyOpt !== undefined ? keep_emptyOpt : false;
  var len = str.length;
  var _acc = /* [] */0;
  var _last_pos = len;
  var _pos = len - 1 | 0;
  while(true) {
    var pos = _pos;
    var last_pos = _last_pos;
    var acc = _acc;
    if (pos === -1) {
      if (last_pos === 0 && !keep_empty) {
        return acc;
      } else {
        return {
                hd: Stdlib__String.sub(str, 0, last_pos),
                tl: acc
              };
      }
    }
    if (Curry._1(is_delim, Caml_string.get(str, pos))) {
      var new_len = (last_pos - pos | 0) - 1 | 0;
      if (new_len !== 0 || keep_empty) {
        var v = Stdlib__String.sub(str, pos + 1 | 0, new_len);
        _pos = pos - 1 | 0;
        _last_pos = pos;
        _acc = {
          hd: v,
          tl: acc
        };
        continue ;
      }
      _pos = pos - 1 | 0;
      _last_pos = pos;
      continue ;
    }
    _pos = pos - 1 | 0;
    continue ;
  };
}

function trim(s) {
  var i = 0;
  var j = s.length;
  while((function () {
          var tmp = false;
          if (i < j) {
            var u = s.charCodeAt(i);
            tmp = u === /* '\t' */9 || u === /* '\n' */10 || u === /* ' ' */32;
          }
          return tmp;
        })()) {
    i = i + 1 | 0;
  };
  var k = j - 1 | 0;
  while((function () {
          var tmp = false;
          if (k >= i) {
            var u = s.charCodeAt(k);
            tmp = u === /* '\t' */9 || u === /* '\n' */10 || u === /* ' ' */32;
          }
          return tmp;
        })()) {
    k = k - 1 | 0;
  };
  return Stdlib__String.sub(s, i, (k - i | 0) + 1 | 0);
}

function split(keep_empty, str, on) {
  if (str === "") {
    return /* [] */0;
  } else {
    return split_by(keep_empty, (function (x) {
                  return x === on;
                }), str);
  }
}

function quick_split_by_ws(str) {
  return split_by(false, (function (x) {
                if (x === /* '\t' */9 || x === /* '\n' */10) {
                  return true;
                } else {
                  return x === /* ' ' */32;
                }
              }), str);
}

function starts_with(s, beg) {
  var beg_len = beg.length;
  var s_len = s.length;
  if (beg_len > s_len) {
    return false;
  }
  var i = 0;
  while(i < beg_len && s[i] === beg[i]) {
    i = i + 1 | 0;
  };
  return i === beg_len;
}

function ends_with_index(s, end_) {
  var s_finish = s.length - 1 | 0;
  var s_beg = end_.length - 1 | 0;
  if (s_beg > s_finish) {
    return -1;
  }
  var _j = s_finish;
  var _k = s_beg;
  while(true) {
    var k = _k;
    var j = _j;
    if (k < 0) {
      return j + 1 | 0;
    }
    if (s[j] !== end_[k]) {
      return -1;
    }
    _k = k - 1 | 0;
    _j = j - 1 | 0;
    continue ;
  };
}

function ends_with(s, end_) {
  return ends_with_index(s, end_) >= 0;
}

function ends_with_then_chop(s, beg) {
  var i = ends_with_index(s, beg);
  if (i >= 0) {
    return Stdlib__String.sub(s, 0, i);
  }
  
}

function check_any_suffix_case(s, suffixes) {
  return Stdlib__List.exists((function (x) {
                return ends_with(s, x);
              }), suffixes);
}

function check_any_suffix_case_then_chop(s, suffixes) {
  var _suffixes = suffixes;
  while(true) {
    var suffixes$1 = _suffixes;
    if (!suffixes$1) {
      return ;
    }
    var id = ends_with_index(s, suffixes$1.hd);
    if (id >= 0) {
      return Stdlib__String.sub(s, 0, id);
    }
    _suffixes = suffixes$1.tl;
    continue ;
  };
}

function escaped(s) {
  var needs_escape = function (_i) {
    while(true) {
      var i = _i;
      if (i >= s.length) {
        return false;
      }
      var match = s.charCodeAt(i);
      if (match < 32) {
        return true;
      }
      if (match > 92 || match < 34) {
        if (match >= 127) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }
      if (match > 91 || match < 35) {
        return true;
      }
      _i = i + 1 | 0;
      continue ;
    };
  };
  if (needs_escape(0)) {
    return Caml_bytes.bytes_to_string(Ext_bytes_test.escaped(Caml_bytes.bytes_of_string(s)));
  } else {
    return s;
  }
}

function unsafe_for_all_range(s, _start, finish, p) {
  while(true) {
    var start = _start;
    if (start > finish) {
      return true;
    }
    if (!Curry._1(p, s.charCodeAt(start))) {
      return false;
    }
    _start = start + 1 | 0;
    continue ;
  };
}

function for_all_range(s, start, finish, p) {
  var len = s.length;
  if (start < 0 || finish >= len) {
    throw new Error("Invalid_argument", {
              cause: {
                MEL_EXN_ID: "Invalid_argument",
                _1: "Ext_string_test.for_all_range"
              }
            });
  }
  return unsafe_for_all_range(s, start, finish, p);
}

function for_all(p, s) {
  return unsafe_for_all_range(s, 0, s.length - 1 | 0, p);
}

function is_empty(s) {
  return s.length === 0;
}

function repeat(n, s) {
  var len = s.length;
  var res = Caml_bytes.caml_create_bytes(Math.imul(n, len));
  for(var i = 0; i < n; ++i){
    Stdlib__String.blit(s, 0, res, Math.imul(i, len), len);
  }
  return Stdlib__Bytes.to_string(res);
}

function unsafe_is_sub(sub, i, s, j, len) {
  if ((j + len | 0) <= s.length) {
    var _k = 0;
    while(true) {
      var k = _k;
      if (k === len) {
        return true;
      }
      if (sub[i + k | 0] !== s[j + k | 0]) {
        return false;
      }
      _k = k + 1 | 0;
      continue ;
    };
  } else {
    return false;
  }
}

var Local_exit = /* @__PURE__ */Caml_exceptions.create("Ext_string_test.Local_exit");

function find(startOpt, sub, s) {
  var start = startOpt !== undefined ? startOpt : 0;
  var n = sub.length;
  var s_len = s.length;
  var i = start;
  try {
    while((i + n | 0) <= s_len) {
      if (unsafe_is_sub(sub, 0, s, i, n)) {
        throw new Error(Local_exit, {
                  cause: {
                    MEL_EXN_ID: Local_exit
                  }
                });
      }
      i = i + 1 | 0;
    };
    return -1;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.MEL_EXN_ID === Local_exit) {
      return i;
    }
    throw new Error(exn.MEL_EXN_ID, {
              cause: exn
            });
  }
}

function contain_substring(s, sub) {
  return find(undefined, sub, s) >= 0;
}

function non_overlap_count(sub, s) {
  var sub_len = sub.length;
  if (sub.length === 0) {
    throw new Error("Invalid_argument", {
              cause: {
                MEL_EXN_ID: "Invalid_argument",
                _1: "Ext_string_test.non_overlap_count"
              }
            });
  }
  var _acc = 0;
  var _off = 0;
  while(true) {
    var off = _off;
    var acc = _acc;
    var i = find(off, sub, s);
    if (i < 0) {
      return acc;
    }
    _off = i + sub_len | 0;
    _acc = acc + 1 | 0;
    continue ;
  };
}

function rfind(sub, s) {
  var n = sub.length;
  var i = s.length - n | 0;
  try {
    while(i >= 0) {
      if (unsafe_is_sub(sub, 0, s, i, n)) {
        throw new Error(Local_exit, {
                  cause: {
                    MEL_EXN_ID: Local_exit
                  }
                });
      }
      i = i - 1 | 0;
    };
    return -1;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.MEL_EXN_ID === Local_exit) {
      return i;
    }
    throw new Error(exn.MEL_EXN_ID, {
              cause: exn
            });
  }
}

function tail_from(s, x) {
  var len = s.length;
  if (x <= len) {
    return Stdlib__String.sub(s, x, len - x | 0);
  }
  var s$1 = "Ext_string_test.tail_from " + (s + (" : " + String(x)));
  throw new Error("Invalid_argument", {
            cause: {
              MEL_EXN_ID: "Invalid_argument",
              _1: s$1
            }
          });
}

function digits_of_str(s, offset, x) {
  var _i = 0;
  var _acc = 0;
  while(true) {
    var acc = _acc;
    var i = _i;
    if (i >= x) {
      return acc;
    }
    _acc = (Math.imul(10, acc) + Caml_string.get(s, offset + i | 0) | 0) - 48 | 0;
    _i = i + 1 | 0;
    continue ;
  };
}

function starts_with_and_number(s, offset, beg) {
  var beg_len = beg.length;
  var s_len = s.length;
  var finish_delim = offset + beg_len | 0;
  if (finish_delim > s_len) {
    return -1;
  }
  var i = offset;
  while(i < finish_delim && s[i] === beg[i - offset | 0]) {
    i = i + 1 | 0;
  };
  if (i === finish_delim) {
    return digits_of_str(s, finish_delim, 2);
  } else {
    return -1;
  }
}

function equal(x, y) {
  return x === y;
}

function unsafe_concat_with_length(len, sep, l) {
  if (!l) {
    return "";
  }
  var hd = l.hd;
  var r = Caml_bytes.caml_create_bytes(len);
  var hd_len = hd.length;
  var sep_len = sep.length;
  Caml_bytes.caml_blit_string(hd, 0, r, 0, hd_len);
  var pos = {
    contents: hd_len
  };
  Stdlib__List.iter((function (s) {
          var s_len = s.length;
          Caml_bytes.caml_blit_string(sep, 0, r, pos.contents, sep_len);
          pos.contents = pos.contents + sep_len | 0;
          Caml_bytes.caml_blit_string(s, 0, r, pos.contents, s_len);
          pos.contents = pos.contents + s_len | 0;
        }), l.tl);
  return Caml_bytes.bytes_to_string(r);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      return i;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_rec_opt(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      return ;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_neg(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_opt(s, c) {
  return rindex_rec_opt(s, s.length - 1 | 0, c);
}

function is_valid_module_file(s) {
  var len = s.length;
  if (len <= 0) {
    return false;
  }
  var match = s.charCodeAt(0);
  if (match >= 91) {
    if (match > 122 || match < 97) {
      return false;
    }
    
  } else if (match < 65) {
    return false;
  }
  return unsafe_for_all_range(s, 1, len - 1 | 0, (function (x) {
                if (x >= 65) {
                  if (x > 96 || x < 91) {
                    return x < 123;
                  } else {
                    return x === 95;
                  }
                } else if (x >= 48) {
                  return x < 58;
                } else {
                  return x === 39;
                }
              }));
}

function is_valid_npm_package_name(s) {
  var len = s.length;
  if (len > 214) {
    return false;
  }
  if (len <= 0) {
    return false;
  }
  var match = s.charCodeAt(0);
  if (match >= 97) {
    if (match >= 123) {
      return false;
    }
    
  } else if (match !== 64) {
    return false;
  }
  return unsafe_for_all_range(s, 1, len - 1 | 0, (function (x) {
                if (x >= 58) {
                  if (x >= 97) {
                    return x < 123;
                  } else {
                    return x === 95;
                  }
                } else if (x !== 45) {
                  return x >= 48;
                } else {
                  return true;
                }
              }));
}

function is_valid_source_name(name) {
  var x = check_any_suffix_case_then_chop(name, {
        hd: ".ml",
        tl: {
          hd: ".re",
          tl: {
            hd: ".mli",
            tl: {
              hd: ".rei",
              tl: /* [] */0
            }
          }
        }
      });
  if (x !== undefined) {
    if (is_valid_module_file(x)) {
      return /* Good */0;
    } else {
      return /* Invalid_module_name */1;
    }
  } else {
    return /* Suffix_mismatch */2;
  }
}

function unsafe_no_char(x, ch, _i, last_idx) {
  while(true) {
    var i = _i;
    if (i > last_idx) {
      return true;
    }
    if (x.charCodeAt(i) === ch) {
      return false;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function unsafe_no_char_idx(x, ch, _i, last_idx) {
  while(true) {
    var i = _i;
    if (i > last_idx) {
      return -1;
    }
    if (x.charCodeAt(i) === ch) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function no_char(x, ch, i, len) {
  var str_len = x.length;
  if (i < 0 || i >= str_len || len >= str_len) {
    throw new Error("Invalid_argument", {
              cause: {
                MEL_EXN_ID: "Invalid_argument",
                _1: "Ext_string_test.no_char"
              }
            });
  }
  return unsafe_no_char(x, ch, i, len);
}

function no_slash(x) {
  return unsafe_no_char(x, /* '/' */47, 0, x.length - 1 | 0);
}

function no_slash_idx(x) {
  return unsafe_no_char_idx(x, /* '/' */47, 0, x.length - 1 | 0);
}

function replace_slash_backward(x) {
  var len = x.length;
  if (unsafe_no_char(x, /* '/' */47, 0, len - 1 | 0)) {
    return x;
  } else {
    return Stdlib__String.map((function (x) {
                  if (x !== 47) {
                    return x;
                  } else {
                    return /* '\\' */92;
                  }
                }), x);
  }
}

function replace_backward_slash(x) {
  var len = x.length;
  if (unsafe_no_char(x, /* '\\' */92, 0, len - 1 | 0)) {
    return x;
  } else {
    return Stdlib__String.map((function (x) {
                  if (x !== 92) {
                    return x;
                  } else {
                    return /* '/' */47;
                  }
                }), x);
  }
}

var empty = "";

var single_space = " ";

function concat_array(sep, s) {
  var s_len = s.length;
  if (s_len === 0) {
    return empty;
  }
  if (s_len === 1) {
    return s[0];
  }
  var sep_len = sep.length;
  var len = 0;
  for(var i = 0; i < s_len; ++i){
    len = len + s[i].length | 0;
  }
  var target = Caml_bytes.caml_create_bytes(len + Math.imul(s_len - 1 | 0, sep_len) | 0);
  var hd = s[0];
  var hd_len = hd.length;
  Caml_bytes.caml_blit_string(hd, 0, target, 0, hd_len);
  var current_offset = hd_len;
  for(var i$1 = 1; i$1 < s_len; ++i$1){
    Caml_bytes.caml_blit_string(sep, 0, target, current_offset, sep_len);
    var cur = s[i$1];
    var cur_len = cur.length;
    var new_off_set = current_offset + sep_len | 0;
    Caml_bytes.caml_blit_string(cur, 0, target, new_off_set, cur_len);
    current_offset = new_off_set + cur_len | 0;
  }
  return Caml_bytes.bytes_to_string(target);
}

function concat3(a, b, c) {
  var a_len = a.length;
  var b_len = b.length;
  var c_len = c.length;
  var len = (a_len + b_len | 0) + c_len | 0;
  var target = Caml_bytes.caml_create_bytes(len);
  Caml_bytes.caml_blit_string(a, 0, target, 0, a_len);
  Caml_bytes.caml_blit_string(b, 0, target, a_len, b_len);
  Caml_bytes.caml_blit_string(c, 0, target, a_len + b_len | 0, c_len);
  return Caml_bytes.bytes_to_string(target);
}

function concat4(a, b, c, d) {
  var a_len = a.length;
  var b_len = b.length;
  var c_len = c.length;
  var d_len = d.length;
  var len = ((a_len + b_len | 0) + c_len | 0) + d_len | 0;
  var target = Caml_bytes.caml_create_bytes(len);
  Caml_bytes.caml_blit_string(a, 0, target, 0, a_len);
  Caml_bytes.caml_blit_string(b, 0, target, a_len, b_len);
  Caml_bytes.caml_blit_string(c, 0, target, a_len + b_len | 0, c_len);
  Caml_bytes.caml_blit_string(d, 0, target, (a_len + b_len | 0) + c_len | 0, d_len);
  return Caml_bytes.bytes_to_string(target);
}

function concat5(a, b, c, d, e) {
  var a_len = a.length;
  var b_len = b.length;
  var c_len = c.length;
  var d_len = d.length;
  var e_len = e.length;
  var len = (((a_len + b_len | 0) + c_len | 0) + d_len | 0) + e_len | 0;
  var target = Caml_bytes.caml_create_bytes(len);
  Caml_bytes.caml_blit_string(a, 0, target, 0, a_len);
  Caml_bytes.caml_blit_string(b, 0, target, a_len, b_len);
  Caml_bytes.caml_blit_string(c, 0, target, a_len + b_len | 0, c_len);
  Caml_bytes.caml_blit_string(d, 0, target, (a_len + b_len | 0) + c_len | 0, d_len);
  Caml_bytes.caml_blit_string(e, 0, target, ((a_len + b_len | 0) + c_len | 0) + d_len | 0, e_len);
  return Caml_bytes.bytes_to_string(target);
}

function inter2(a, b) {
  return concat3(a, single_space, b);
}

function inter3(a, b, c) {
  return concat5(a, single_space, b, single_space, c);
}

function inter4(a, b, c, d) {
  return concat_array(single_space, [
              a,
              b,
              c,
              d
            ]);
}

var check_suffix_case = ends_with;

var check_suffix_case_then_chop = ends_with_then_chop;

var single_colon = ":";

var parent_dir_lit = "..";

var current_dir_lit = ".";

exports.split_by = split_by;
exports.trim = trim;
exports.split = split;
exports.quick_split_by_ws = quick_split_by_ws;
exports.starts_with = starts_with;
exports.ends_with_index = ends_with_index;
exports.ends_with = ends_with;
exports.ends_with_then_chop = ends_with_then_chop;
exports.check_suffix_case = check_suffix_case;
exports.check_suffix_case_then_chop = check_suffix_case_then_chop;
exports.check_any_suffix_case = check_any_suffix_case;
exports.check_any_suffix_case_then_chop = check_any_suffix_case_then_chop;
exports.escaped = escaped;
exports.unsafe_for_all_range = unsafe_for_all_range;
exports.for_all_range = for_all_range;
exports.for_all = for_all;
exports.is_empty = is_empty;
exports.repeat = repeat;
exports.unsafe_is_sub = unsafe_is_sub;
exports.Local_exit = Local_exit;
exports.find = find;
exports.contain_substring = contain_substring;
exports.non_overlap_count = non_overlap_count;
exports.rfind = rfind;
exports.tail_from = tail_from;
exports.digits_of_str = digits_of_str;
exports.starts_with_and_number = starts_with_and_number;
exports.equal = equal;
exports.unsafe_concat_with_length = unsafe_concat_with_length;
exports.rindex_rec = rindex_rec;
exports.rindex_rec_opt = rindex_rec_opt;
exports.rindex_neg = rindex_neg;
exports.rindex_opt = rindex_opt;
exports.is_valid_module_file = is_valid_module_file;
exports.is_valid_npm_package_name = is_valid_npm_package_name;
exports.is_valid_source_name = is_valid_source_name;
exports.unsafe_no_char = unsafe_no_char;
exports.unsafe_no_char_idx = unsafe_no_char_idx;
exports.no_char = no_char;
exports.no_slash = no_slash;
exports.no_slash_idx = no_slash_idx;
exports.replace_slash_backward = replace_slash_backward;
exports.replace_backward_slash = replace_backward_slash;
exports.empty = empty;
exports.single_space = single_space;
exports.single_colon = single_colon;
exports.concat_array = concat_array;
exports.concat3 = concat3;
exports.concat4 = concat4;
exports.concat5 = concat5;
exports.inter2 = inter2;
exports.inter3 = inter3;
exports.inter4 = inter4;
exports.parent_dir_lit = parent_dir_lit;
exports.current_dir_lit = current_dir_lit;
/* Ext_bytes_test Not a pure module */
