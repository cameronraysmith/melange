Test `@mel.as` in inline records / record extensions

  $ . ./setup.sh
  $ cat > x.ml <<EOF
  > type user = { name : string [@mel.as "renamed"] }
  > let user = { name = "Corentin" }
  > type user2 = User of { name : string [@mel.as "renamed"] }
  > let user2 = User { name = "Corentin" }
  > exception UserException of { name : string [@mel.as "renamed"] }
  > let user3 () =
  >   try
  >     raise (UserException { name = "Corentin" })
  >   with | UserException { name } -> Js.log2 "name:" name
  > EOF
  $ melc -ppx melppx x.ml
  // Generated by Melange
  'use strict';
  
  var Caml_exceptions = require("melange.js/caml_exceptions.js");
  var Caml_js_exceptions = require("melange.js/caml_js_exceptions.js");
  
  var UserException = /* @__PURE__ */Caml_exceptions.create("X.UserException");
  
  function user3(param) {
    try {
      throw new Error(UserException, {
                cause: {
                  MEL_EXN_ID: UserException,
                  renamed: "Corentin"
                }
              });
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.MEL_EXN_ID === UserException) {
        console.log("name:", exn.renamed);
        return ;
      }
      throw new Error(exn.MEL_EXN_ID, {
                cause: exn
              });
    }
  }
  
  var user = {
    renamed: "Corentin"
  };
  
  var user2 = /* User */{
    renamed: "Corentin"
  };
  
  exports.user = user;
  exports.user2 = user2;
  exports.UserException = UserException;
  exports.user3 = user3;
  /* No side effect */
