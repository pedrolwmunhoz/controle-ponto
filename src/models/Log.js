const pool = require('../dbConfig');

class Log {
  constructor(userId, date) {
    this.userId = userId;
    this.date = date;
  }

  static async findByUserId(userId) {
    try {
      const result = await pool.query('SELECT * FROM log_batimentos WHERE usuario_id = $1', [userId]);
      return result.rows.map(row => new Log(row.id, row.user_id, row.date));
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar logs de acesso');
    }
  }


}

module.exports = Log;
