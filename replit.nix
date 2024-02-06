{pkgs}: {
  deps = [
		pkgs.nodePackages.prettier
    pkgs.libuuid
    pkgs.docker
  ];
  env = { LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];  }; 
}
