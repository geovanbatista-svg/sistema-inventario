{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "inventory-system-env";

  buildInputs = [
    pkgs.nodejs_20
    pkgs.postgresql
    pkgs.git
  ];

  shellHook = ''
    echo "Ambiente para Sistema de Inventário/Doação"
    echo "Node.js: $(node --version)"
    echo "PostgreSQL: $(psql --version 2>&1 | head -n1)"

    # Configura variáveis para o Postgres rodar localmente no projeto
    export PGDATA="$PWD/.pgdata"
    export PGHOST="$PWD/.pgdata"
    export PGLOG="$PWD/.pgdata/server.log"

    # Inicializa o banco de dados se a pasta não existir
    if [ ! -d "$PGDATA" ]; then
      echo "Inicializando diretório de dados do PostgreSQL local..."
      initdb --auth=trust --no-locale -U postgres
      
      # Altera a porta ou configurações se necessário no $PGDATA/postgresql.conf
      echo "unix_socket_directories = '$PGHOST'" >> "$PGDATA/postgresql.conf"
    fi

    # Inicia o servidor local se ele não estiver rodando
    if ! pg_ctl status >/dev/null 2>&1; then
      echo "Iniciando PostgreSQL local..."
      pg_ctl -l "$PGLOG" -o "-k $PGHOST" start
    fi

    echo "Para conectar no banco use: psql -U postgres -h localhost"
    echo "Para iniciar o backend: cd backend && npm install && npm start"
  '';
}
