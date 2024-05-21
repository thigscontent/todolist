  const User = require("../../src/models/User");
  const userRepository =require('../../src/repositories/userRepository');
  const bcrypt = require("bcrypt")
  // import selecaoRepository from "../repositories/userRepository.js";
  
  exports.getAllUsers = async function (req, res) {
    try{
      const users = await userRepository.findAll();
      res.status(200).json(users);
  }
  catch (error){
      res.status(400).json({ message: error.message})
  }
};
  
  exports.createUser = async function (req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword; // Trocando o valor da senha para a hashed

    try {

        const newUser = new User(req.body);

        const savedUser = await newUser.save();

        res.status(201).json({
            statusCode: 201,
            message: "Usuário criado com sucesso!",
            data: {
                savedUser
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};
  
  exports.updateUser = async function (req, res) {
    try {
      const user = await userRepository.updateById(req.params.id, req.body);
      res.status(200).json(user);
  }
  catch (error){
      res.status(400).json({ message: error.message})
  }
};
  
  exports.deleteUser = async function (req, res) {
    try {
      const deleteUsers = await userRepository.deleteById(req.params.id);
      res.status(200).json({message: "Usuario deletado com sucesso"});
  }
  catch (error){
      res.status(400).json({ message: error.message})
  }
};

exports.authRoute = async function(req, res) {
  res.status(200).json({
      statusCode: 200,
      message: "Rota autenticada com sucesso!",
  });
}