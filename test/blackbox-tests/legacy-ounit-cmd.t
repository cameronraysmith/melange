
  $ . ./setup.sh
  $ cat > x.ml <<EOF
  > type 'a arra = 'a array
  > external
  >   f :
  >   int -> int -> int arra -> unit
  >   = ""
  >   [@@bs.send.pipe:int]
  >   [@@bs.splice]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  File "x.ml", lines 2-7, characters 0-15:
  2 | external
  3 |   f :
  4 |   int -> int -> int arra -> unit
  5 |   = ""
  6 |   [@@bs.send.pipe:int]
  7 |   [@@bs.splice]
  Error: @bs.variadic expect the last type to be an array
  [2]

  $ cat > x.ml <<EOF
  > external
  >   f2 :
  >   int -> int -> ?y:int array -> unit
  >   = ""
  >   [@@bs.send.pipe:int]
  >   [@@bs.splice]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  File "x.ml", lines 1-6, characters 0-15:
  1 | external
  2 |   f2 :
  3 |   int -> int -> ?y:int array -> unit
  4 |   = ""
  5 |   [@@bs.send.pipe:int]
  6 |   [@@bs.splice]
  Error: @bs.variadic expects the last type to be a non optional
  [2]

Skip over the temporary file name printed in the error trace

  $ melc -ppx melppx -bs-eval 'let bla4 foo x y= foo##(method1 x y [@bs])' 2>&1 | grep -v File
  1 | let bla4 foo x y= foo##(method1 x y [@bs])
                                            ^^
  Alert unused: Unused attribute [@bs]
  This means such annotation is not annotated properly.
  For example, some annotations are only meaningful in externals
  
  // Generated by Melange
  'use strict';
  
  
  function bla4(foo, x, y) {
    return foo.method1(x, y);
  }
  
  exports.bla4 = bla4;
  /* No side effect */


  $ melc -ppx 'melppx -alert -deprecated' -bs-eval 'external mk : int -> ([`a|`b [@bs.string]]) = "mk" [@@bs.val]' 2>&1 | grep -v File
  1 | external mk : int -> ([`a|`b [@bs.string]]) = "mk" [@@bs.val]
                                     ^^^^^^^^^
  Alert unused: Unused attribute [@bs.string]
  This means such annotation is not annotated properly.
  For example, some annotations are only meaningful in externals
  
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */


  $ cat > x.ml <<EOF
  > external ff :
  >     resp -> (_ [@bs.as "x"]) -> int -> unit =
  >     "x" [@@bs.set]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  File "x.ml", lines 1-3, characters 0-18:
  1 | external ff :
  2 |     resp -> (_ [@bs.as "x"]) -> int -> unit =
  3 |     "x" [@@bs.set]
  Error: Ill defined attribute @set (two args required)
  [2]

  $ cat > x.ml <<EOF
  > external v3 :
  >   int -> int -> (int -> int -> int [@bs.uncurry]) = "v3"[@@bs.val]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  File "x.ml", line 2, characters 37-47:
  2 |   int -> int -> (int -> int -> int [@bs.uncurry]) = "v3"[@@bs.val]
                                           ^^^^^^^^^^
  Alert unused: Unused attribute [@bs.uncurry]
  This means such annotation is not annotated properly.
  For example, some annotations are only meaningful in externals
  
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

  $ cat > x.ml <<EOF
  > external v4 :
  >   (int -> int -> int [@bs.uncurry]) = ""
  >   [@@bs.val]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  File "x.ml", lines 1-3, characters 0-12:
  1 | external v4 :
  2 |   (int -> int -> int [@bs.uncurry]) = ""
  3 |   [@@bs.val]
  Error: @uncurry can not be applied to the whole definition
  [2]

  $ melc -ppx melppx -bs-eval '{js| \uFFF|js}' 2>&1 | grep -v File
  1 | {js| \uFFF|js}
          ^^^^^^
  Error: Offset: 3, Invalid \u escape

  $ melc -ppx 'melppx -alert -fragile -alert -deprecated' -bs-eval 'external mk : int -> ([`a|`b] [@bs.string]) = "" [@@bs.val]' 2>&1 | grep -v File
  1 | external mk : int -> ([`a|`b] [@bs.string]) = "" [@@bs.val]
                                      ^^^^^^^^^
  Alert unused: Unused attribute [@bs.string]
  This means such annotation is not annotated properly.
  For example, some annotations are only meaningful in externals
  
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */


  $ melc -ppx 'melppx -alert -deprecated' -bs-eval 'external mk : int -> ([`a|`b] ) = "mk" [@@bs.val]' 2>&1 | grep -v File
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

  $ cat > x.ml <<EOF
  > type t
  > external mk : int -> (_ [@bs.as {json| { x : 3 } |json}]) ->  t = "mk" [@@bs.val]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

  $ cat > x.ml <<EOF
  > type t
  > external mk : int -> (_ [@bs.as {json| { "x" : 3 } |json}]) ->  t = "mk" [@@bs.val]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

  $ melc -ppx 'melppx -alert -deprecated' -bs-eval 'let should_fail = fun [@bs.this] (Some x) y u -> y + u' 2>&1 | grep -v File
  1 | let should_fail = fun [@bs.this] (Some x) y u -> y + u
                                       ^^^^^^^^
  Error: @this expect its pattern variable to be simple form

  $ melc -ppx 'melppx -alert -deprecated' -bs-eval 'let should_fail = fun [@bs.this] (Some x as v) y u -> y + u' 2>&1 | grep -v File
  1 | let should_fail = fun [@bs.this] (Some x as v) y u -> y + u
                                       ^^^^^^^^^^^^^
  Error: @this expect its pattern variable to be simple form

  $ cat > x.ml <<EOF
  > (* let rec must be rejected *)
  > type t10 = A of t10 [@@ocaml.unboxed];;
  > let rec x = A x;;
  > EOF
  $ melc -ppx melppx x.ml
  File "x.ml", line 3, characters 12-15:
  3 | let rec x = A x;;
                  ^^^
  Error: This kind of expression is not allowed as right-hand side of `let rec'
  [2]

  $ cat > x.ml <<EOF
  > type t = {x: int64} [@@unboxed];;
  > let rec x = {x = y} and y = 3L;;
  > EOF
  $ melc -ppx melppx x.ml
  File "x.ml", line 2, characters 12-19:
  2 | let rec x = {x = y} and y = 3L;;
                  ^^^^^^^
  Error: This kind of expression is not allowed as right-hand side of `let rec'
  [2]

  $ cat > x.ml <<EOF
  > type r = A of r [@@unboxed];;
  > let rec y = A y;;
  > EOF
  $ melc -ppx melppx x.ml
  File "x.ml", line 2, characters 12-15:
  2 | let rec y = A y;;
                  ^^^
  Error: This kind of expression is not allowed as right-hand side of `let rec'
  [2]

  $ melc -ppx melppx -bs-eval 'external f : int = "%identity"' 2>&1 | grep -v File
  1 | external f : int = "%identity"
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Error: %identity expect its type to be of form 'a -> 'b (arity 1)

  $ melc -ppx melppx -bs-eval 'external f : int -> int = "%identity"'
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

  $ melc -ppx melppx -bs-eval 'external f : int -> int -> int = "%identity"' 2>&1 | grep -v File
  1 | external f : int -> int -> int = "%identity"
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Error: %identity expect its type to be of form 'a -> 'b (arity 1)

  $ melc -ppx melppx -bs-eval 'external f : (int -> int) -> int = "%identity"'
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

  $ melc -ppx melppx -bs-eval 'external f : int -> (int-> int) = "%identity"' 2>&1 | grep -v File
  1 | external f : int -> (int-> int) = "%identity"
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  Error: %identity expect its type to be of form 'a -> 'b (arity 1)

  $ cat > x.ml <<EOF
  > external foo_bar :
  >  (_ [@bs.as "foo"]) ->
  >  string ->
  >  string = "bar"
  >  [@@bs.send]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  File "x.ml", lines 1-5, characters 0-12:
  1 | external foo_bar :
  2 |  (_ [@bs.as "foo"]) ->
  3 |  string ->
  4 |  string = "bar"
  5 |  [@@bs.send]
  Error: Ill defined attribute @send(first argument can't be const)
  [2]

  $ melc -ppx 'melppx -alert -deprecated' -bs-eval 'let bla4 foo x y = foo##(method1 x y [@bs])' 2>&1 | grep -v File
  1 | let bla4 foo x y = foo##(method1 x y [@bs])
                                             ^^
  Alert unused: Unused attribute [@bs]
  This means such annotation is not annotated properly.
  For example, some annotations are only meaningful in externals
  
  // Generated by Melange
  'use strict';
  
  
  function bla4(foo, x, y) {
    return foo.method1(x, y);
  }
  
  exports.bla4 = bla4;
  /* No side effect */


  $ cat > x.ml <<EOF
  >   external mk : int ->
  > (
  >   [\`a|\`b]
  >    [@bs.string]
  > ) = "mk" [@@bs.val]
  > EOF
  $ melc -ppx 'melppx -alert -deprecated' x.ml
  File "x.ml", line 4, characters 5-14:
  4 |    [@bs.string]
           ^^^^^^^^^
  Alert unused: Unused attribute [@bs.string]
  This means such annotation is not annotated properly.
  For example, some annotations are only meaningful in externals
  
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

  $ melc -ppx melppx -bs-eval 'let u = [||]' 2>&1 | grep -v File
  1 | let u = [||]
          ^
  Error: The type of this expression, '_weak1 array,
         contains type variables that cannot be generalized

  $ cat > x.ml <<EOF
  > external push : 'a array -> 'a -> unit = "push" [@@send]
  > let a = [||]
  > let () =
  >   push a 3 |. ignore ;
  >   push a "3" |. ignore
  > EOF
  $ melc -ppx melppx x.ml
  File "x.ml", line 5, characters 9-12:
  5 |   push a "3" |. ignore
               ^^^
  Error: This expression has type string but an expression was expected of type
           int
  [2]
