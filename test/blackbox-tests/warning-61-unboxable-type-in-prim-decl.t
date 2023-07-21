Test showing unused record fields error with bs.deriving

  $ cat > main.ml <<EOF
  > type singleton
  > 
  > type singletonConfig = { overrides : string array }
  > 
  > external useSingletonWithConfig : singletonConfig -> singleton * singleton
  >   = "useSingleton"
  >   [@@bs.module "@tippyjs/react"] [@@bs.val]
  > EOF

  $ melc -ppx 'melppx -alert -deprecated' -nopervasives -w +61 main.ml
  // Generated by Melange
  /* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */
