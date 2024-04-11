{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.postgresql_14
  ];

  env = {
    PGDATA = "${toString ./.}/.state/postgreql";
    PGHOST = "${toString ./.}/.state/run";
    LOCALE_ARCHIVE = if pkgs.stdenv.isLinux then "${pkgs.glibcLocales}/lib/locale/locale-archive" else "";
  };

  shellHook = ''
    if [ ! -d $PGHOST ]; then
      mkdir -p "$PGHOST"
    fi

    if [ ! -d $PGDATA ]; then
      mkdir -p $(dirname "$PGDATA")
      pg_ctl initdb -o "-U postgres"
    fi

    trap "pg_ctl -D $PGDATA stop" EXIT

    pg_ctl -D "$PGDATA" -w start -o "-c unix_socket_directories=$PGHOST -c listen_addresses= -p 5432"
  '';
}
