const { Pool } = require('pg');


// ele tenta se conectar ao Postgres padrão da máquina.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/inventory_db'
});


module.exports = pool;

