const express = require('express');

require('dotenv').config
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const usersController = require('./controllers/usersController');

  //ADD USER
  app.post('/users', usersController.addUser);

  //GET USERS
  app.get('/users/:name', usersController.getUsersByName);

  //GET LOGs
  app.get('/logs/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
      const { rows } = await pool.query('SELECT * FROM log_batimentos WHERE id = $1', [id_usuario]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar logs de acesso');
    }
  });

  //ADD log
  app.post('/logs', async (req, res) => {
    const { usuario_id } = req.body;
    const query = 'INSERT INTO log_batimentos (id, data_hora) VALUES ($1, CURRENT_TIMESTAMP)';
  
    try {
      await pool.query(query, [usuario_id]);
      res.status(200).json({ message: 'Log de acesso registrado com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao registrar log de acesso.' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
