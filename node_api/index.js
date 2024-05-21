const userRoutes = require("./src/routes/userRoutes");  
const taskRoutes = require("./src/routes/taskRoutes");
require('dotenv').config()
const connectDB = require("./database");
const express = require("express"); 
const cors = require("cors")
const app = express();  



const port = process.env.PORT; //criando rota

app.use(cors())
connectDB();


app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);


// Retorno da porta que o servidor está rodando
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


