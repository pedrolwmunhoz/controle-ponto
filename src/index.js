const express = require('express');
const { Pool } = require('pg');
require('dotenv').config

const app = express();

const pool = new Pool({
    user: 'nhemqdot',
    host: 'babar.db.elephantsql.com',
    database: 'nhemqdot',
    password: 'fkPqvHRH56rss2OCMZSN9pc85rgXQN7m',
  });
  
  
  //ADD USER
  app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    try {
      const { rows } = await db.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *', [nome, email]);
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao cadastrar usuário');
    }
  });

  //GET USERS
  app.get('/usuarios', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM usuarios');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar usuários');
    }
  });

  //GET LOGs
  app.get('/logs/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    try {
      const { rows } = await pool.query('SELECT * FROM log_batimentos WHERE id_usuario = $1', [id_usuario]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar logs de acesso');
    }
  });

  app.post('/logs', async (req, res) => {
    const { usuario_id } = req.body;
    const query = 'INSERT INTO log_batimentos (usuario_id, data_hora) VALUES ($1, CURRENT_TIMESTAMP)';
  
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
