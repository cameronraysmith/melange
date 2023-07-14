{ ocamlVersion }:

let
  lock = builtins.fromJSON (builtins.readFile ./../../flake.lock);
  findFlakeSrc = name: fetchGit {
    url = with lock.nodes.${name}.locked;"https://github.com/${owner}/${repo}";
    inherit (lock.nodes.${name}.locked) rev;
  };

  src = findFlakeSrc "nixpkgs";
  nix-filter-src = findFlakeSrc "nix-filter";
  melange-compiler-libs-src = findFlakeSrc "melange-compiler-libs";
  nix-filter = import "${nix-filter-src}";

  pkgs = import src {
    extraOverlays = [
      (self: super: {
        ocamlPackages = super.ocaml-ng."ocamlPackages_${ocamlVersion}".overrideScope' (oself: osuper: {
          sedlex = osuper.sedlex.overrideAttrs (_: {
            # depends on ppx_expect, which is not available for 4.13
            doCheck = false;
          });
        });
      })
    ];
  };
  inherit (pkgs) stdenv nodejs yarn git lib nodePackages ocamlPackages tree;
  packages = rec {
    melange = pkgs.callPackage ./.. {
      inherit nix-filter;
      melange-compiler-libs-vendor-dir = melange-compiler-libs-src;
    };
    rescript-syntax = pkgs.lib.callPackageWith pkgs.ocamlPackages ../rescript-syntax.nix {
      inherit nix-filter melange;
    };
  };
  inputString =
    builtins.substring
      11 32
      (builtins.unsafeDiscardStringContext packages.melange.outPath);
in

with ocamlPackages;

stdenv.mkDerivation {
  name = "melange-tests-${inputString}";

  src = ../../jscomp/test;

  phases = [ "unpackPhase" "checkPhase" "installPhase" ];

  installPhase = ''
    mkdir -p $out/lib
    cp -r dist dist-es6 $out/lib
  '';

  doCheck = true;
  nativeBuildInputs = [
    ocaml
    findlib
    dune
    git
    nodePackages.mocha
    ocamlPackages.reason
    tree
    nodejs
    yarn
  ];
  buildInputs = [
    packages.melange
    packages.rescript-syntax
    reason-react-ppx
    js_of_ocaml-compiler
  ];

  checkPhase = ''
    cat > dune-project <<EOF
    (lang dune 3.8)
    (using melange 0.1)
    EOF
    dune build @melange-runtime-tests --display=short

    mocha "_build/default/dist/*_test.js"
  '';
}
