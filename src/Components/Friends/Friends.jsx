import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Friends.css'
import {useSelector} from 'react-redux'
import {selectUser} from '../../feature/UserSlice'


function Friends() {
    const user=useSelector(selectUser)
    const [UserList,setUserList]=useState([]);
    const [show,setshow]=useState("all-users");
    const[friendsList,setFriendsList]=useState([]);
    const[requestList,setRequestList]=useState([]);
    const [displaydata,setdisplayData]=useState([]);

    const [currentuser,setcurrentuser]=useState( user)
   
    const [state,setState]=useState(false);

    const changestate=()=>{
        setState(!state)
    }
    
    const setfriends=()=>{
        setshow('friends')
        setdisplayData(friendsList)
        
    }
    const setusers=()=>{
        setshow('all-users')
        setdisplayData(UserList)
       
    }
    const setrequests=()=>{
        setshow('requests')
        setdisplayData(requestList)
    }

      
   useEffect(()=>{
    const fetchData=async() => {
        try{
            const response=await axios.get("https://internarea-backend-t8di.onrender.com/api/User").then((res)=>{
                setUserList(res.data);
                const u= (res.data.find((data)=> data.fid == user.fid))
                setcurrentuser(u)
                setdisplayData(res.data);
            })
        }catch(error){
            console.log(error);
        }
    };

    fetchData();

   },[user])
       
        
   useEffect(()=>{

    const filterFriends=()=>{
        const list=UserList.filter((data)=>
           currentuser?.friends.includes(data.fid)
        )
        setFriendsList(list)
       }

       filterFriends();

   },[UserList,currentuser,user])

      

       useEffect(()=>{
        const filterRequests=()=>{
            const list=UserList.filter((data)=>
               currentuser?.requests.includes(data.fid)
            )
            setRequestList(list)
           }

           filterRequests();
       },[UserList,currentuser,user])

      
  
    // useEffect(() =>{
    //     const fetchData=async() => {
    //         try{
    //             const response=await axios.get("https://internarea-backend-t8di.onrender.com/api/User");
    //            await setUserList(response.data);
    //             setcurrentuser(UserList.find((data)=>data.fid === user.uid))
    //             setdisplayData(UserList);
    //             console.log("current user",currentuser)
    //         }catch(error){
    //             console.log(error);
    //         }
    //     };
    //     fetchData().then(()=>console.log("users fetch"))
        


    // },[state]);

    // useEffect(() =>{
    //    const filterFriends=()=>{
    //     const list=UserList.filter((data)=>
    //        currentuser?.friends.includes(data.fid)
    //     )
    //     setFriendsList(list)
    //     console.log("friends filter ",friendsList)
    //    }
    //    const filterRequests=()=>{
    //     const list=UserList.filter((data)=>
    //        currentuser?.requests.includes(data.fid)
    //     )
    //     setRequestList(list)
    //     console.log("Request filter",requestList)
    //    }

    //    filterFriends()
    //    filterRequests()

    // },[state]);

    

    const Action=async(person)=>{
        if(show ==="all-users"){
           await MakeFriend(person)
        }else 
        if(show ==="requests"){
          await Accept(person) 
        }
        changestate();

    }

    const MakeFriend= async(person)=>{
        const r=[...person.requests,currentuser?.fid]
        await axios.put(`https://internarea-backend-t8di.onrender.com/api/User/${person._id}`,{requests:r}).then(res=>{
            alert(`Requested ${person.email}`)
            console.log(currentuser,r,res)
        }).catch(err=>{
            console.log(err)
        })
    }

    const Accept=async(person)=>{
       const res= await axios.put(`https://internarea-backend-t8di.onrender.com/api/User/${person._id}`,{friends:[...person.friends,currentuser.fid]}).then(res=>{
        }).catch(err=>{
            console.log(err)
        })

      const res2=  await axios.put(`https://internarea-backend-t8di.onrender.com/api/User/${currentuser._id}`,{requests: currentuser.requests.filter(data=>data !== person.fid), friends:[...currentuser.friends,person.fid]}).then(res=>{
        }).catch(err=>{
            console.log(err)
        })
        
    }

    
  return (
    <div className='p-4 page'>
    <p>
    <span className={`text-purple-800 text-xl p-2  mr-4 ${show ==='all-users'?"active":""} `} onClick={setusers}>All Users </span>
    <span className={`text-purple-800 text-xl p-2 ml-4 mr-4 ${show ==='requests'?"active":""} `} onClick={setrequests}>Requests </span>
     <span className={`text-purple-800 text-xl p-2  ml-4 ${show==='friends'?"active":""} `} onClick={setfriends}>My Friends</span>
     </p>
        <div>
        {
            
            displaydata.map((user)=>(
                <div  className='flex flex-col box justify-center'>
                <div className='flex justify-between userbox bg-slate-50 border-2 rounded-l border-purple-500' >
                    <span>{user.email}</span><span><button  onClick={e=> Action(user)} className={`bg-purple-500 rounded ${show !== "friends"?'p-1 pr-2 pl-2':''}`}>  { show==="requests"?'Accept': (show==='all-users'?'Make Friend':'')}</button></span>
                </div>

                </div>

             ) )

        }
        </div>

      
    </div>
  )
  
}



export default Friends
