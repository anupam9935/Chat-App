import React , {useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import logo from "../assets/logo.svg"
import b2 from "../assets/b2.jpg";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes";

function Login() {

const navigate=useNavigate();
const [values,setValues]=useState({
      Username:"",
      password:"",
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
        // navigate("/");
       }
 },[]);

const handleSubmit=async(e)=>{
    e.preventDefault();
  if ( handleValidation()){
    const {password,Username}=values;
    const {data}=await axios.post(loginRoute,{
      Username,password
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
 const {password,Username}=values;
 if(password===""){
  toast("password  is required",toastOptions);
  return false;
 }
 else  if(Username.length===""){
  toast("username  is required",toastOptions);
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
     <form onSubmit={(event)=>handleSubmit(event)}>
           <div className='brand'>
                    <img src={logo} alt='logo' />
                    <h1>ChatWave</h1>
           </div>
           <input type='text' placeholder='Username' name='Username' onChange={(e)=>handleChange(e)}  />
           <input type='password' placeholder='password' name='password' onChange={(e)=>handleChange(e)}  />
           <button type='submit' >LOGIN User</button>
           <span>Don't  have an account? <a href="/register" >register</a></span>
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
        height:5rem;
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
        transition:1sec ease-in-out
    }
       span{
        color:white;
        a{
          color: #4e0eff;
          text-decoration:none;
          font-weight:bold;
        }
       }
    }
  
`;
export default Login;
