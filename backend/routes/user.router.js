const  {UserModel}  = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const express = require("express")
const userrouter = express.Router()
userrouter.post("/signup",async(req,res)=>{
     try {
      const {deviceId, name, phone, availCoins, password,isPrime } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({deviceId, name, phone, availCoins, password: hashedPassword,isPrime });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})
userrouter.post("/login",async(req,res)=>{
    try {
      const { id, password } = req.body;
      const user = await UserModel.findOne({ where: { id } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.secret, { expiresIn: '3h' });
      res.json({ message:"Login successfull",token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})
userrouter.get("/",async(req,res)=>{
    const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
userrouter.post("/request",async(req,res)=>{
     const { userId, friendId } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.friendsRequest.push(friendId);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports={userrouter}








