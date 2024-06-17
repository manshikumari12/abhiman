const express = require("express")

const { ChatRoom } = require('../model/chat.model');
const { UserModel } = require('../model/user.model');
const chatroomrouter = express.Router()


chatroomrouter.post("/create",async(req,res)=>{
 const { name, id, pass } = req.body;
  try {
    const room = await ChatRoom.create({ roomId: id, creator: id });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
chatroomrouter.get("/",async(req,res)=>{
 const { id, pass } = req.body;
  try {
    const room = await ChatRoom.findByPk(id);
    if (room) {
      room.users.push(id);
      await room.save();
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports={chatroomrouter}