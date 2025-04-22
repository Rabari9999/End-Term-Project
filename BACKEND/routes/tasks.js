const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const auth = require('../middleware/auth')

// All routes below require authentication
router.use(auth) 

// Get all tasks for logged-in user 
router.get('/',auth,async (req,res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


// Add new task
router.post('/',auth,async (req,res)=>{
    const task = new Task({
        user: req.userId,
        title:req.body.title,
        description:req.body.description
    })

    try{
        const newTask = await task.save();
        res.status(201).json(newTask);
    }catch(err){
        res.status(400).json({error:err.message})
    }
})


// Delete Task
router.delete('/:id',auth,async (req,res)=>{
    try{
       await Task.findByIdAndDelete(req.params.id);
       res.status(200).json({message:'Task deleted'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router;