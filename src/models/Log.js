const pool = require('../dbConfig');

class Log {
  constructor(userId, date) {
    this.userId = userId;
    this.date = date;
  }

  static async findByUserId(userId) {
    try {
      const result = await pool.query('SELECT * FROM log_batimentos WHERE usuario_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar logs de acesso');
    }
  }

  static async createLog(userId) {
    const res = await pool.query('INSERT INTO log_batimentos (usuario_id, data_hora) VALUES ($1, $2) RETURNING *', [userId, new Date]);
    return res.rows[0];
  }
}

module.exports = Log;
