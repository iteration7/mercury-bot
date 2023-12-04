{pkgs}: {
  deps = [
		pkgs.nodePackages.prettier
    pkgs.libuuid
  ];
  env = { LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];  }; 
}