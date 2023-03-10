const express = require('express');

require('dotenv').config
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const usersController = require('./controllers/usersController');
const logController = require('./controllers/logController');


  //ADD USER
  app.post('/users', usersController.addUser);

  //GET USERS
  app.get('/users', usersController.getUsersByName);

  //GET LOGs
  app.get('/logs/:userId', logController.findByUserId);


  //ADD log
  app.get('/logs', logController.addLogs);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
