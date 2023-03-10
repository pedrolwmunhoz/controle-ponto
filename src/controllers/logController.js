const Log = require('../models/Log');

module.exports = {
  async findByUserId(req, res) {
    const userId = req.params.userId;
    try {
      const logs = await Log.findByUserId(userId);
      res.json(logs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar logs de acesso');
    }
  },

  async addLogs(req, res){
    const { userId } = req.body;
    try {
        const newLog = await Log.createLog(userId);
        res.status(201).json(newLog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
};
