  const Task = require("../models/Task");
  const taskRepository =require('../repositories/taskRepository');
  const bcrypt = require("bcrypt")
  
  exports.getAllTasks = async function (req, res) {
    try{
      const tasks = await taskRepository.findAll();
      res.status(200).json(tasks);
  }
  catch (error){
      res.status(400).json({ message: error.message})
  }
};
  
  exports.createTask = async function (req, res) {
    try {

        const newTask = new Task(req.body);
        console.log(newTask)
        const savedTask = await newTask.save();

        res.status(201).json({
            statusCode: 201,
            message: "Task criada com sucesso!",
            data: {
                savedTask
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
};
  
  exports.updateTask = async function (req, res) {
    try {
      const task = await taskRepository.updateById(req.params.id, req.body);
      res.status(200).json(task);
  }
  catch (error){
      res.status(400).json({ message: error.message})
  }
};
  
  exports.deleteTask = async function (req, res) {
    try {
      const deleteTasks = await taskRepository.deleteById(req.params.id);
      res.status(200).json({message: "Task deletada com sucesso"});
  }
  catch (error){
      res.status(400).json({ message: error.message})
  }

}