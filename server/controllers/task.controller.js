const express = require("express")
const router = express.Router()

const Task = require("../models/task.model.js");
const { authentication } = require("../middlewares/authentication.js");

router.get("/getTask" , async(req,res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

// router.post('/addTask', async (req, res) => {
//     const task = new Task({
//       title: req.body.title,
//       description: req.body.description
//     });
//     try {
//       const newTask = await task.save();
//       res.status(201).json(newTask);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });


router.post('/addTask', authentication , async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // Extract user ID from authenticated user
    console.log(userId)
    // Create a new task object with the provided data and user ID
    const newTask = new Task({
      title,
      description,
      userId
    });

    // Save the new task to the database
    await newTask.save();


    console.log(newTask)

    res.status(201).json({ message: 'Task created successfully', newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/usertask', authentication, async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from authenticated user

    // Find tasks associated with the user ID
    const tasks = await Task.find({ userId: userId });

    console.log(tasks)

    // If no tasks found for the user, return an empty array
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for the user' });
    }

    // Return tasks data for the user
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  router.patch('/updateTask/:id', async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  router.delete('/deleteTask/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;