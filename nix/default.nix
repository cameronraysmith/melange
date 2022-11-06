{ stdenv, ocamlPackages, lib, tree, nix-filter }:

with ocamlPackages;

rec {
  melange = buildDunePackage rec {
    pname = "melange";
    version = "dev";
    duneVersion = "3";

    src = with nix-filter; filter {
      root = ./..;
      include = [
        "dune-project"
        "dune"
        "dune.mel"
        "melange.opam"
        "melange.opam.template"
        "bsconfig.json"
        "package.json"
        "jscomp"
        "lib"
        "test"
        "mel_workspace"
        "reactjs_jsx_ppx"
        "scripts"
      ];
      exclude = [ "jscomp/test" ];
    };

    buildPhase = ''
      runHook preBuild
      dune build -p ${pname} -j $NIX_BUILD_CORES --display=short
      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall
      dune install --prefix $out ${pname}
      runHook postInstall
    '';

    doCheck = true;
    checkInputs = [ ounit2 tree ];

    nativeBuildInputs = [ cppo ];
    propagatedBuildInputs = [
      melange-compiler-libs
      cmdliner
      base64
    ];
    meta.mainProgram = "melc";
  };

  mel = buildDunePackage rec {
    pname = "mel";
    version = "dev";
    duneVersion = "3";

    src = with nix-filter; filter {
      root = ./..;
      include = [
        "dune-project"
        "dune"
        "dune.mel"
        "mel.opam"
        "mel"
        "mel_test"
        "scripts"
        "jscomp/keywords.list"
        "jscomp/main"
        "jscomp/ext"
        "jscomp/bsb_helper"
        "jscomp/stubs"
        "jscomp/common"
        "jscomp/frontend"
        "reactjs_jsx_ppx"
        "jscomp/napkin"
        "jscomp/js_parser"
        "jscomp/outcome_printer"
        "mel_workspace"
      ];
    };

    nativeBuildInputs = [ cppo ];
    propagatedBuildInputs = [
      melange
      cmdliner
      luv
      ocaml-migrate-parsetree-2
    ];

    meta.mainProgram = "mel";
  };
}
