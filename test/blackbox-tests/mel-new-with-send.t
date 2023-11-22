Test the interaction between `[@@mel.new]` and `[@@mel.send]`

  $ . ./setup.sh
  $ cat > x.ml <<EOF
  > type blue
  > type red
  > external blue : blue = "path/to/blue.js" [@@mel.module]
  > external red : blue -> string -> red = "Red" [@@mel.send] [@@mel.new]
  > let _ = red blue "foo"
  > EOF
  $ melc -ppx melppx x.ml
  // Generated by Melange
  'use strict';
  
  var BlueJs = require("path/to/blue.js");
  
  new (BlueJs.Red)("foo");
  
  /*  Not a pure module */

Test `@mel.splice` integration

  $ cat > x.ml <<EOF
  > type blue
  > type red
  > external blue : blue = "path/to/blue.js" [@@mel.module]
  > external red : blue -> string array -> red = "Red"
  >  [@@mel.send] [@@mel.new] [@@mel.splice]
  > let _ = red blue [| "foo"; "bar" |]
  > EOF
  $ melc -ppx melppx x.ml
  // Generated by Melange
  'use strict';
  
  var BlueJs = require("path/to/blue.js");
  
  new (BlueJs.Red)("foo", "bar");
  
  /*  Not a pure module */

`@mel.send.pipe` also works

  $ cat > x.ml <<EOF
  > type blue
  > type red
  > external blue : blue = "path/to/blue.js" [@@mel.module]
  > external red : string -> red = "Red" [@@mel.send.pipe: blue] [@@mel.new]
  > let _ = blue |> red "foo"
  > EOF
  $ melc -ppx melppx x.ml
  // Generated by Melange
  'use strict';
  
  var BlueJs = require("path/to/blue.js");
  
  new (BlueJs.Red)("foo");
  
  /*  Not a pure module */

Test `@mel.splice` + `@mel.send.pipe` integration

  $ cat > x.ml <<EOF
  > type blue
  > type red
  > external blue : blue = "path/to/blue.js" [@@mel.module]
  > external red : string array -> red = "Red"
  >   [@@mel.send.pipe: blue] [@@mel.new] [@@mel.splice]
  > let _ = blue |> red [| "foo"; "bar" |]
  > EOF
  $ melc -ppx melppx x.ml
  // Generated by Melange
  'use strict';
  
  var BlueJs = require("path/to/blue.js");
  
  new (BlueJs.Red)("foo", "bar");
  
  /*  Not a pure module */