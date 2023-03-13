// usersController.js

const User = require('../models/user');

async function getUsersByName(req, res) {
    const { name } = req.params;
    try {
      const users = await User.findByUserName(name);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar usuários por nome');
    }
}

async function addUser(req, res) {
  const { name, email } = req.body;
  const user = new User(name, email);
  console.log('teste' + name)
  console.log('teste' + email)
  try {
    await user.save(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao inserir o usuário no banco de dados');
  }
}


module.exports = { getUsersByName, addUser };
