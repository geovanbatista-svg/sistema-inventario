const pool = require('../db');

class Item {

  static async create(item) {

    const query = `
      INSERT INTO items(name, category, quantity)
      VALUES($1,$2,$3)
      RETURNING *;
    `;

    const values = [
      item.name,
      item.category,
      item.quantity
    ];

    try {

      const { rows } = await pool.query(query, values);

      return rows[0];

    } catch (err) {

      console.error('Erro ao criar item:', err.message);

      throw err;

    }

  }

  static async getAll() {

    const { rows } = await pool.query(
      'SELECT * FROM items ORDER BY id'
    );

    return rows;

  }

  static async delete(id) {

    await pool.query(
      'DELETE FROM items WHERE id = $1',
      [id]
    );

  }

}

module.exports = Item;
