import './index.css';
import './App.css'

import Navbar from './Components/Navbar/Navbar.jsx'
import Home from './Components/Home/Home.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Intern from './Components/Internships/Intern.jsx';
import JobAvl from './Components/Jobs/JobAvl.jsx';
import JobsDetails from './Components/Jobs/JobsDetails.jsx';
import InternDetails from './Components/Internships/InternDetails.jsx';
import Register from './Components/auth/Register.jsx';
import Profile from './Components/profile/profile.jsx';
import Login from './Components/auth/Login.jsx';

import{Routes,Route, Navigate, json} from "react-router-dom";
import {selectUser} from "./feature/UserSlice"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './Components/firebase/firebase.jsx';
import { login, logout  } from './feature/UserSlice.js';
import AdminLogin from './Admin/AdminLogin.jsx';
import Adminpanel from './Admin/Adminpanel.jsx';
import Postinternships from './Admin/Postinternships.jsx';
import Postjobs from './Admin/Postjobs.jsx';
import Viewallapplications from './Admin/Viewallapplications.jsx';
import DetailApplication from './Applications/DetailApplication.jsx';
import UserapplicationDetail from './Applications/DetailApplicationUser.jsx';
import UserApplication from './Components/profile/UserApplication.jsx';
import Blog from './Components/Blog/Blog.jsx';
import Friends from './Components/Friends/Friends.jsx';
import axios from 'axios';
import Subscription from './Components/Subscription/Subscription.jsx';
import UploadPost from './Components/Blog/UploadPost.jsx';




function App() {

  const user=useSelector(selectUser);
  let usertype="user"
  const adminemail="admin@gmail.com"
  const dispatch=useDispatch();
  useEffect(()=>{
   
    auth.onAuthStateChanged( async(authUser)=>{
      if(authUser?.email===adminemail){
        usertype="admin"
      }
      if(authUser){
   const res= await axios.get(`https://internarea-backend-t8di.onrender.com/api/User/${authUser.uid}`)
   const mongodata=res.data;
      dispatch(login({
            uid:authUser.uid,
            fid:authUser.uid,
            photo:authUser.photoURL,
            name:authUser.displayName,
            email:authUser.email,
            userType:usertype,
            friends:mongodata.friends,
            requests:mongodata.requests,
            IsStarUser:mongodata.IsStarUser,
            n_posts:mongodata.n_posts,
            allowed_posts:mongodata.allowed_posts,
      }))
      console.log("sate change")

      localStorage.setItem("user",JSON.stringify({
            uid:authUser.uid,
            fid:authUser.uid,
            photo:authUser.photoURL,
            name:authUser.displayName,
            email:authUser.email,
            userType:usertype,
            friends:mongodata.friends,
            requests:mongodata.requests,
            IsStarUser:mongodata.IsStarUser,
            n_posts:mongodata.n_posts,
            allowed_posts:mongodata.allowed_posts,

      }))


    }
  else{
    dispatch(logout())
    localStorage.setItem("user",JSON.stringify({}))
  }
  })
},[dispatch]);

const Admincheck=({children})=>{
   return user?.userType==="admin"?children:<Navigate to='/adminLogin'/>

}
const Usercheck=({children})=>{
  return user?children:<Navigate to='/login'/>

}

  return (
    <div className="App">
    <>
     <Navbar />
     

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Internship' element={<Intern/>}/>
      <Route path='/Jobs' element={<JobAvl/>}/>
      <Route path='/detailjob' element={<JobsDetails/>}/>
      <Route path='/detailInternship' element={<InternDetails/>}/>
      <Route path='/detailApplication' element={<DetailApplication/>}/>

      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/adminLogin' element={<AdminLogin/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/adminpanel' element={<Admincheck><Adminpanel/></Admincheck>}/>
      <Route path='/postInternship' element={<Admincheck><Postinternships/></Admincheck>}/>
      <Route path='/postJob' element={<Admincheck><Postjobs/></Admincheck>}/>
      <Route path='/applications' element={<Admincheck><Viewallapplications/></Admincheck>}/>
      <Route path='/UserapplicationDetail' element={<UserapplicationDetail/>}/>
       <Route path='/userapplication' element={<UserApplication/>}/>
       <Route path='/blog' element={<Blog/>}/>
       <Route path='/addpost' element={<UploadPost/>}/>
       <Route path='/friends' element={<Friends/>}/>
       <Route path='/subscription' element={<Subscription/>}/>


     </Routes>
     
    <Footer/>
</>
    </div>
  );
}


export default App;
