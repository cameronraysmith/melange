

  $ . ./setup.sh
  $ cat > x.ml <<EOF
  > let x = {j| Hello, \$()|j}
  > EOF
  $ melc -ppx melppx x.ml
  File "x.ml", line 1, characters 20-23:
  1 | let x = {j| Hello, $()|j}
                          ^^^
  Error: `' is not a valid syntax of interpolated identifer
  [2]

  $ cat > x.ml <<EOF
  > let x = {j| Hello, \$(   )|j}
  > EOF
  $ melc -ppx melppx x.ml
  File "x.ml", line 1, characters 20-26:
  1 | let x = {j| Hello, $(   )|j}
                          ^^^^^^
  Error: `   ' is not a valid syntax of interpolated identifer
  [2]
