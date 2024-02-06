{pkgs}: {
  deps = [
		pkgs.nodePackages.prettier
    pkgs.libuuid
    pkgs.docker
  ];
}
