const express = require("express")
const app = express()
const {userrouter}=require("./routes/user.router")
const {chatroomrouter}= require("./routes/chat.router")
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);
app.use(express.json())
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("Home page ")
})
app.use("/api",userrouter)
app.use("/chat",chatroomrouter)


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('message', (message) => {
    io.to(message.room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.listen(process.env.port,async()=>{
    try {
        console.log(`Server running on port no ${process.env.port}`)
    } catch (error) {

        
        console.log(" Error running server")
    }
  
})