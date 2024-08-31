const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const userRoutes=require("./routes/userRoutes");
const messageRoute=require("./routes/messagesRoute");
const socket = require ("socket.io");


const app=express();
require('dotenv').config({ path: '../.env' });

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute);
const host = process.env.REACT_APP_HOST;
//console.log(host);

mongoose.connect(process.env.MONGO_URL)

  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((error) => {
    console.log("Mongoose not connected", error);
  });


const server=app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
})

const io=socket(server,{
    cors:{
        origin:process.env.ORIGIN,
        credentials:true,
    },
})
global.onlineUsers=new Map();

io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
          onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    });
})

 module.exports = host;
