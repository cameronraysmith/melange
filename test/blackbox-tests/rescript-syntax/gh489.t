Repro for GitHub issue 489, first try setting values in nested objects with
OCaml syntax

  $ cat > foo.ml <<EOF
  > type person = < age :int [@bs.set ] > Js.t
  > type entry = < person :person [@bs.set ] > Js.t
  > external entry : entry = "entry"[@@bs.val ]
  > let () = ((entry ## person) ##  age) #= 99
  > EOF
  $ melc -ppx melppx foo.ml
  // Generated by Melange
  'use strict';
  
  
  entry.person.age = 99;
  
  /*  Not a pure module */

Now try with ReScript syntax

  $ cat > foo.res <<EOF
  > type person = {@set "age": int}
  > type entry = {@set "person": person}
  > type deep = {@set "deep": entry}
  > @val external deep: deep = "deep"
  > deep["deep"]["person"]["age"] = 99
  > EOF

  $ rescript-syntax -print=ml foo.res
  type nonrec person = < age: int [@set ]  >  Js.t
  type nonrec entry = < person: person [@set ]  >  Js.t
  type nonrec deep = < deep: entry [@set ]  >  Js.t
  external deep : deep = "deep"[@@val ]
  ;;(((deep ## deep) ## person) ## age) #= 99

  $ rescript_syntax -print=ml foo.res > foo.ml

  $ melc -ppx melppx foo.ml
  // Generated by Melange
  'use strict';
  
  
  deep.deep.person.age = 99;
  
  /*  Not a pure module */