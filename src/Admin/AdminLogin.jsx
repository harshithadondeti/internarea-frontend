import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./admin.css";
import { Link } from 'react-router-dom';
import { auth } from '../Components/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
function AdminLogin() {
    const [email,setemail]=useState("")
    const [username,setusername]=useState("")
    const [password,setPassword]=useState("")
const navigate=useNavigate()

    const LoginAdmin= async()=>{
if (email===""||password==="") {
    alert("fill the blanks")
}
else{
    const bodyjson={
        username:email,
        password:password
    }
    axios.post("https://internarea-backend-t8di.onrender.com/api/admin/adminLogin",bodyjson).then((res)=>{
      if(res.data.status==="success"){
        
        signInWithEmailAndPassword(auth,email,password).then((res)=>{
            alert("success")
          navigate("/adminpanel")
        })
      }else{
        alert("Invalid username or password")
      }
       
    }).catch((err)=>{
        console.log(err)
    })
}
    }
  return (
    <div>
    <Link to={"/"}> <button id="cross" >
              <i class="bi bi-x-circle"></i>
            </button>
            </Link>
      <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
   
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      {/* <div className="flex flex-wrap -m-2"> */}
        <div className="p-2 w-2/3">
          <div className="relative">
            <label for="name" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="text"  value={email} onChange={(e)=>setemail(e.target.value)} id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <br/>
        <div className="p-2 w-2/3 ">
          <div className="relative">
            <label for="username" className="leading-7 text-sm text-gray-600">username</label>
            <input type="username" id="username" name="username"  value={username} onChange={(e)=>setusername(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <br/>
        <div className="p-2 w-2/3 ">
        <div className="relative">
            <label for="pass" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="pass" id="pass" name="password"  value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          </div>
        <div className="p-2 w-2/3 ">
        <div className="relative">
        <button onClick={LoginAdmin} className='bt-3 mt-4 w-full '>Login</button>
        </div>
        </div>
     
      {/* </div>  */}
    </div>
  </div>
</section>
    </div>
  )
}

export default AdminLogin