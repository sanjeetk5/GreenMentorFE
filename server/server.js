const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const taskRoute = require("./controllers/task.controller.js")
const connection = require("./config/db.config");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  return res.send("Hello from Server");
});

app.use("/user", userRouter);
app.use("/task" , taskRoute)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at Port - ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
