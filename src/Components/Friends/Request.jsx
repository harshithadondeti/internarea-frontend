import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Friends.css'

function Request() {
    const [UserList,setUserList]=useState([]);
    const [show,setshow]=useState("all-users");
    const setfriends=()=>{
        setshow('friends')
    }
    const setusers=()=>{
        setshow('all-users')
    }
    useEffect(() =>{
        const fetchData=async() => {
            try{
                const response=await axios.get("https://internarea-backend-t8di.onrender.com/api/User");
                setUserList(response.data);
            }catch(error){
                console.log(error);
            }
        };
        fetchData();

    },[]);
  return (
    <div className='p-4 page'>
    <p><span className={`text-purple-800 text-xl p-2  mr-4 ${show ==='all-users'?"active":""} `} onClick={setusers}>All Users </span> <span className={`text-purple-800 text-xl p-2  ml-4 ${show==='friends'?"active":""} `} onClick={setfriends}>My Friends</span></p>
        <div>
        {
            
            UserList.map((user)=>(
                <div  className='flex flex-col box justify-center'>
                <div className='flex justify-between userbox bg-slate-50 border-2 rounded-l border-purple-500' >
                    <span>{user.email}</span><span><button className='bg-purple-500 rounded p-1 pr-2 pl-2'>Make Friend</button></span>
                </div>

                </div>

             ) )

        }
        </div>
    </div>
  )
}

export default Request