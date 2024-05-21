const User = require("../../src/models/User");

class UserRepository {
  // crud é necessario implementar um método para cada ação do controller, assim como as regras do sql
  async create(userData){
    const user = new User(userData);
    await user.save();
    return user;
} // criar novo elemento
  async findAll() {
    return User.find();
  } // slecionar tudo, tipo select *
  
  async updateById(id, userData) {
      return User.findByIdAndUpdate(id, userData, { new: true })
  } // atuallizar

  async deleteById(id) {
        return User.findByIdAndDelete(id)
    }
}
module.exports = new UserRepository();
