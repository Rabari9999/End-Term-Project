const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

//Register
router.post('/register',async (req,res)=>{
    try{  
        const {email,password} = req.body;
        if(!email || !password || password.length<6){
            return res.status(400).json({error:'Email and password (min 6 char required'})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({error:'Email already registered'})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({email,password: hashedPassword})
        await user.save();
        res.status(201).json({message: 'User created'})
    } catch(err){
        res.status(500).json({error: 'Registration failed'})
    }
})


//login
router.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({error:'Invalid credentials'})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:'1h'
        })
        res.json({token})
    }catch(err){
        res.status(500).json({error:'Login failed'})
    }
})

module.exports = router

