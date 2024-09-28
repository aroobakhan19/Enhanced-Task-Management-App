const router = require("express").Router;
const task = require("../models/task");
const User = require("../models/user");
const jwt =  require("jsowebtoken")
const authenticateToken = require("./auth");
router.post("/creat-task",authenticateToken, async(req,res)=>{
    try {
        const{title , desc}= req.body;
        const{id} = req.headers;
        const newTask = new task({title: title,desc : desc});
        const savetask = await newTask.save();
        const taskId = savetask._id;
        await User.findByIdAndUpdate(id,{$push:{tasks:taskId._id}});
        res.status(200).json({message :"task created"})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({message :"invalid error"})
    }
});

router.get('/get-all-tasks', authenticateToken, async (req, res) => {
    try {
      const id = req.headers.authorization.split(' ')[1]; // Extract the user ID from the token
      const userData = await User.findById(id).populate('tasks', { sort: { createdAt: -1 } });
      res.status(200).json({ data: userData });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Internal Server Error' });
    }
  });
  router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.headers.authorization.split(' ')[1];
  
      await Task.findByIdAndDelete(id);
      await User.findByIdAndUpdate(userId, { $pull: { tasks: id } });
  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });
  router.put("/update-task/:id", authenticateToken, async (req, res) => {
    try {
      const id = req.params.id;
      const { title, desc } = req.body;
  
      await Task.findByIdAndUpdate(id, { title, desc });
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });
  router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
    try {
      const id = req.params.id;
      const taskData = await Task.findById(id);
      const impTask = taskData.important;
      await Task.findByIdAndUpdate(id, { important: !impTask });
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });
  router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
    try {
      const id = req.params.id;
      const taskData = await Task.findById(id);
      const completeTask = taskData.complete;
      await Task.findByIdAndUpdate(id, { complete: !completeTask });
      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });
  router.get("/get-imp-tasks", authenticateToken, async (req, res) => {
    try {
      const id = req.headers.authorization.split(' ')[1];
      const userData = await User.findById(id).populate({
        path: "tasks",
        match: { important: true },
        options: { sort: { createdAt: -1 } }
      });
      const impTaskData = userData.tasks;
      res.status(200).json({ data: impTaskData });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });
  router.get("/get-complete-tasks", authenticateToken, async (req, res) => {
    try {
      const id = req.headers.authorization.split(' ')[1];
      const userData = await User.findById(id).populate({
        path: "tasks",
        match: { completed: true },
        options: { sort: { createdAt: -1 } }
      });
      const compTaskData = userData.tasks;
      res.status(200).json({ data: compTaskData });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });

  router.get("/get-incomplete-tasks", authenticateToken, async (req, res) => {
    try {
      const id = req.headers.authorization.split(' ')[1];
      const userData = await User.findById(id).populate({
        path: "tasks",
        match: { completed: false },
        options: { sort: { createdAt: -1 } }
      });
      const incompTaskData = userData.tasks;
      res.status(200).json({ data: incompTaskData });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Internal Server Error" });
    }
  });

 module.exports = router;