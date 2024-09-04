import React , {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import logo from "../assets/logo.svg"
import b2 from "../assets/b2.jpg"
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes";

function Register() {

  const navigate=useNavigate();
const [values,setValues]=useState({
      Username:"",
      email:"",
      password:"",
      confirmPassword:"",
})
const toastOptions={
  position:"bottom-right",
  autoClose:8000,
  pauseOnHover:true,
  draggable:true,
  theme:"dark",
 };
 useEffect(()=>{
  if(localStorage.getItem("chat-app-user")){
   navigate("/");
  }
},[]);

const handleSubmit=async(e)=>{
    e.preventDefault();
  if ( handleValidation()){
    const {password,Username,email}=values;
    const {data}=await axios.post(registerRoute,{
      Username,email,password
    });

    if(data.status==false){
      toast.error(data.msg,toastOptions);
    }
    if(data.status==true){
      localStorage.setItem("chat-app-user",JSON.stringify(data.user));
      navigate("/");
    }
  }
};
const handleValidation=()=>{
 const {password,confirmPassword,Username,email}=values;
 if(password!==confirmPassword){
     toast("password and confirm password should be same",toastOptions);
     return false;
 }
 else  if(Username.length<3){
  toast("username should contain minimum three characters",toastOptions);
  return false;
 }
 else  if(password.length<8){
  toast("password should contain minimum eight characters",toastOptions);
  return false;
 }
 else if(email===""){
    toast("email is required" ,toastOptions);
    return false;
 }
 return true;

};



const handleChange=(event)=>{
       setValues({...values,[event.target.name]:event.target.value});
}
  return (
   <>
   <FormContainer>
     <form  onSubmit={(event)=>handleSubmit(event)}>
           <div className='brand'>
                    <img src={logo} alt='logo'/>
                    <h1>ChatWave</h1>
           </div>
           <input type='text' placeholder='Username' name='Username' onChange={(e)=>handleChange(e)}  />
           <input type='email' placeholder='email' name='email' onChange={(e)=>handleChange(e)}  />
           <input type='password' placeholder='password' name='password' onChange={(e)=>handleChange(e)}  />
           <input type='password' placeholder='confirm password' name='confirmPassword' onChange={(e)=>handleChange(e)}  />
           <button type='submit' >Create User</button>
           <span>Already have an account? <a href="/login" >login</a></span>
     </form>
   </FormContainer>
   <ToastContainer/>
   </>
  )
}
const FormContainer=styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  background-color:red;
  background-image: url(${b2}); // Apply the background image
  background-size: cover; // Ensure the image covers the entire area
  background-position: center; // Center the image
  gap:1rem;
  align-items:center;
  background-color:blue;
  .brand{
      display:flex;
      align-items:center;
      gap:1rem;
      justify-content:center;
      img{
        height:5rem;;
      }
      h1{
        color:white;
        text-transform:uppercase;
      }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:black;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0%.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
          background-color:#997af0;
          color:white;
          padding:1rem 2rem;
          border:none;
          font-weight:bold;
          cursor: pointer;
          border-radius:0.4rem;
          font-size:1rem;
          text-transform:uppercase;
    }
    button:hover{
        background-color:#4e0eff;
        transition:1sec ease-in-out;
    }
       span{
        color:white;
        text-transform:uppercase;
        a{
          color: #4e0eff;
          text-decoration:none;
          font-weight:bold;
        }
       }
    }
  
`;
export default Register;
