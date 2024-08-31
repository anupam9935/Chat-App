const User=require("../model/userModel");
const bcrypt=require("bcrypt");//it is used for the encryption of the password
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId; 

async function register(req,res,next){
  try{
    const {Username,email,password}=req.body;
    const usernameCheck=await User.findOne({Username});
    if(usernameCheck){
      return res.json({msg:"username already used",status:false});
    }
    const emailCheck=await User.findOne({email});
    if(emailCheck){
      return res.json({msg:"email already used",status:false});
    }
   const hashPassword=await bcrypt.hash(password,10);
    const user=await User.create({Username,email,password:hashPassword});
    delete user.password;
    return res.json({status:true,user});
  }
  catch(ex){
     next(ex);
  }
}
async function login(req,res,next){
  const {Username,password}=req.body;
  const user=await User.findOne({Username});
  if(!user){
    return res.json({msg:"incorrect username ",status:false});
  }
  const isPasswordValid=await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.json({msg:"incorrect password ",status:false});
  }
  delete user.password;
  return res.json({status:true,user});
}// Import ObjectId from mongoose

async function setAvatar(req, res, next) {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    // console.log(userData);
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({}).select([
      "email",
      "Username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
}


module.exports={register,login,setAvatar,getAllUsers};