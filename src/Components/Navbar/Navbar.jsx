import React from "react";
import logo from "../../Assets/logo.png";
import "./Navbar.css";
import Sidebar from "./Sidebar";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useState } from "react";
import { Link} from "react-router-dom";
import { useSelector } from "react-redux";
import {selectUser} from '../../feature/UserSlice';
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate=useNavigate()
 
  const user=useSelector(selectUser);
  const [isDivVisibleForIntern, setDivVisibleForIntern] = useState(false);
  const [isDivVisibleForJob, setDivVisibleForJob] = useState(false);
 
  const [isDivVisibleForProfile, setDivVisibleForProfile] = useState(false);

  const showProfile = () =>{
    setDivVisibleForProfile(true);
    document.getElementById('ico3').className="bi bi-caret-up-fill";
  }
  const hideProfile = () =>{
    document.getElementById('ico3').className="bi bi-caret-down-fill";
    setDivVisibleForProfile(false);
  }
  const showInternships=()=>{
    setDivVisibleForIntern(true);
    document.getElementById('ico').className="bi bi-caret-up-fill";
  }
  const hideInternships=()=>{
    setDivVisibleForIntern(false);
    document.getElementById('ico').className="bi bi-caret-down-fill";
  }
  const showJobs=()=>{
    setDivVisibleForJob(true);
    document.getElementById('ico2').className="bi bi-caret-up-fill";
  }
  const hideJobs=()=>{
    setDivVisibleForJob(false);
    document.getElementById('ico2').className="bi bi-caret-down-fill";
  }
  const logoutfunction=()=>{

     signOut(auth)
     navigate("/")
  }


  return (
    <div>
      <nav className="nav1">
        <ul>
        <div className="flex portion1">
          <div className="img">
            <Link to={user?.userType==="admin"?"/adminpanel":"/"}>
            <img className="company-logo" src={logo} alt="" srcSet=""/></Link>
          </div>

          <div className="elem">
            
            <p id="int" className="cat"  >
            <Link to="Internship"> Internships </Link><i onClick={isDivVisibleForIntern?hideInternships:showInternships} class="bi bi-caret-down-fill" id="ico"></i>
            </p>
            
            <p id="" className="cat"  >
            <Link to={"\Jobs"}> Jobs   </Link> <i onClick={isDivVisibleForJob?hideJobs:showJobs}class="bi bi-caret-down-fill" id="ico2"></i>
            </p>
          </div>
          </div>
          <div className="portion2">
          <div className="search">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Search" />
          </div>
          {
            user?(
              <div className="auth">
                <div className="profile bg-slate-400 rounded-3xl p-2 ">
                  <Link to={"/profile"}>
                    <img src={user?.photo} alt="profile pic" classname='rounded-full w-11 h-2' id="picpro"/>
                  </Link>
                </div>
                <div className=" rounded-3xl p-2 ">
                  <Link to={"/blog"}>
                    Blog
                  </Link>
                  <Link to={"/friends"}>
                    Friends
                  </Link>
                  <Link to= {"/subscription"}><button className="btn2">Subscribe</button></Link>
                </div>
                <button  onClick={logoutfunction}>Logout<i class="bi bi-box-arrow-right"></i></button>
              </div>
            ):(
            
              <div className="auth">
              <Link to={"/login"}>
            <button className="btn1"  >
              Login
            </button>
            </Link>
           <Link to= {"/register"}><button className="btn2">Register</button></Link>
           <Link to={"/adminLogin"}> <button className="admin-bt">Admin</button></Link> 
          </div>
        
         
            )
          }
          </div>
          
       

        </ul>
      </nav>

      {
        isDivVisibleForIntern &&(
          <div className="profile-dropdown-2"> 
          <div className="left-section ">
          <p>Top Locations</p>
  <p>Profile</p>
  <p>Top Category</p>
  <p>Explore More Internships</p>
</div>
<div className="line flex bg-slate-400">

</div>
<div className="right-section">
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
</div>
          </div>
         
        )

        }
        {
        isDivVisibleForJob &&(
            <div className="profile-dropdown-1">
                <div className="left-section">
             
  <p>Top Locations</p>
  <p>Profile</p>
  <p>Top Category</p>
  <p>Explore More Internships</p>
</div>
<div className="line flex bg-slate-400">

</div>
<div className="right-section">
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
  <p>Intern at India</p>
</div>
      </div>
             
    
        )
    }
          

      <Sidebar />
    </div>
  );
}
export default Navbar;
