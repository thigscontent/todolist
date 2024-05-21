const mongoose = require ('mongoose');

const connectDB = async ()=> {
  try {
      await mongoose.connect("mongodb+srv://root:root@testebug.ufokiw9.mongodb.net/?retryWrites=true&w=majority&appName=testebug");
    
      console.log('Conectado ao banco de dados');
  } catch (error) {
      console.log('Erro ao conectar ao banco de dados');
      process.exit(1);
  }
};

module.exports = connectDB;