const express = require('express');

require('dotenv').config
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const usersController = require('./controllers/usersController');
const logController = require('./controllers/logController');

  //GET USERS
  app.get('/users/:name', usersController.getUsersByName);

  //ADD USER
  app.post('/users', usersController.addUser);

  //GET LOGs
  app.get('/logs/:userId', logController.findByUserId);

  //ADD log
  app.post('/logs/:userId', logController.addLogs);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
