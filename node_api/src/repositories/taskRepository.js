const Task = require("../models/Task");

class TaskRepository {
  
  async create(taskData){
    const task = new task(taskData);
    await task.save();
    return task;
} 
  async findAll() {
    return Task.find();
  } 
  
  async updateById(id, taskData) {
      return Task.findByIdAndUpdate(id, taskData, { new: true })
  } 

  async deleteById(id) {
        return Task.findByIdAndDelete(id)
    }
}
module.exports = new TaskRepository();
