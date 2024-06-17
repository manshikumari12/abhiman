const { ChatRoom } = require('../model/chat.model');
const express =require("express")
const messagerouter = express.Router()
messagerouter.exports("/message",async(req,res)=>{
 const { roomId, userId, message } = req.body;
  try {
    const room = await ChatRoom.findByPk(roomId);
    if (room) {
      room.chats.push({ userId, message });
      await room.save();
      res.status(200).json(room);
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
module.exports={messagerouter}