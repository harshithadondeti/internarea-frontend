import React, { useState,useEffect } from 'react';
import Jobs from "../Data/JobsDataAvl";
import "./detail.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/UserSlice';
import axios from 'axios'



function JobsDetails() {
  const user=useSelector(selectUser)
  const [isDivVisible,setDivVisible]=useState(false)
  const [Textarea,setTextarea]=useState("")
  const [company,setCompany]=useState("")
  const [category,setCategory]=useState("")
  const navigate=useNavigate()
  let search=window.location.search;
  const params=new URLSearchParams(search);
  const id=params.get("q")
  const show = () => {
    setDivVisible(true);
  };
  const hide = () => {
    setDivVisible(false);
  };
 
  const [data,setData] =useState([])
useEffect(()=>{
   const fetchData= async()=>{
      const response=await axios.get(`https://internarea-backend-t8di.onrender.com/api/job/${id}`)
      setData(response.data)

      const {company,category}=response.data;
         setCompany(company)
           setCategory(category)
    }
    fetchData()
  },[])

  const submitApplication =async () =>{
    let  textarea=document.getElementById("textarea")
    if(textarea.textContent==="")
      {
      alert("fill the mandatory fields")
      }
      else{
        const bodyJson={
        
          coverLetter:Textarea,
          category:category,
          company:company,
          user:user,
          Application:id

          
        }
        await axios.post("https://internarea-backend-t8di.onrender.com/api/application",bodyJson).then((res)=>{
       
      }).catch((err)=>{
        alert("error occured")

      })
      console.log("submitted")
      alert("Done")
      navigate("/jobs")

      }

  }

  return (
    <div>
      <div className="details-app">
       
        <>
        <h1 className='font-bold  text-center text-3xl'>{data.title}</h1>
        <div className='m-14 shawdow-sm rounded-md border '>
        <p className='mb-4 mt-3' id='boxer'> <i className='bi bi-arrow-up-right text-blue-500' ></i> Actively Hiring</p>

       <div className='main-info flex align-baseline mr-96 mt-7'>
        <p className='text-xl  text-center font-bold mt-4'>{data.title}</p>
        <p className='text-sm text-center text-slate-300 font-bold'>{data.title}</p>
        <p className='text-center'> <i class="bi bi-geo-alt-fill"></i>{data.location}</p>
        </div>
       

        <div className="flex text-sm justify-between mt-6">
          <p className='mt-3 text-slate-400'> <i class="bi bi-play-circle-fill"></i>   Start Date  <br />  {data.StartDate}</p>
        
        
          <p className='mt-3 text-slate-400'> <i class="bi bi-calendar-check-fill"></i>  Experience  <br />
          {data.Experience}</p>
        
          <p className='mt-3 text-slate-400'>  <i class="bi bi-cash"></i>   Salary <br /> {data.CTC}</p>
           </div>
           <div className="flex">
            <p className='bg-green-300 text-green-200 rounded-ml ml-4'><i class="bi bi-clock"></i>12/12/2012</p>
           </div>
           <hr/>
           <div className="aboutcompany flex justify-start">
            <p className='mt-3 text-xl font-bold text-start'>About{data.company}</p>
            <br/>'</div>'
            <div className="flex">
            <p className='text-blue-500'>instagram page<i className='bi bi-arrow-up-right-square'></i></p>
           </div>
           <p className='mt-4'>{data.aboutCompany}</p>
             <div className='about-Job'>
              <p className='mt-3 text-xl font-bold text-start'>about Job</p>
              <p>{data.aboutJob}</p>
             </div>
             <p className='text-blue-500 justify-start'>Learn Bussiness Communication</p>
             <div className="whocan">
             <p className='mt-3 text-xl font-bold text-start'>Who can apply</p>
             <p>{data.Whocanapply}</p>
             <p className='mt-3 text-xl font-bold text-start'>Perks</p>
             <p>{data.perks}</p>
             <p className='mt-3 text-xl font-bold text-start'>Additional Information</p>
             <p>{data.AdditionalInfo}</p>
             <p className='mt-3 text-xl font-bold text-start'>Number of Openings</p>
             <p className='text-start'>{data.numberOfopning}</p>
             <div className='flex justify-center mt-4 bg-blue-500 w-40 text-center text-white font-bold' >
             <button classname='flex justify-center align-middle' onClick={show}>Apply</button>
             </div>
             
             
             
              
             </div>

           </div>  
          
        
        </>

      </div>
      
    {isDivVisible &&(
  <>
   <div className='application-page'>
    <div className='bg'>
      <button className='close2' onClick={hide}><i className='bi bi-x'></i></button>
      <p>Applying for {data.company}</p>
      <p className='mt-3 text-xl font-bold text-start nm-3'>{data.aboutCompany}</p>
    </div>
    <div clssName="moresteps">
      <p className='font-semibold text-xl' >Your resume </p>
      <small>Your current resume will be submitted along with the application</small>
      <p className='mt-5 font-semibold text-xl'>Cover letter</p>
      <br/>
      <p>why should we hire for the role</p>
      <textarea name='coverletter'placeholder id="textarea" value={Textarea} onChange={(e)=>setTextarea(e.target.value)}></textarea>
      <p className='mt-5 font-semibold text-xl'>your availability</p>
      <p>confirm your availability</p>
    </div>
    <div>
        <label>
          <input
            type="radio"
            value="Yes, I am available to join immediately"
           
          
          />
          Yes, I am available to join immediately
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="No, I am currently on notice period"
           
          
          />
          No, I am currently on notice period
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="No, I will have to serve notice period"
          
           
          />
          No, I will have to serve notice period
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="Other"
            
       
          />
          Other <span className='text-slate-500'>
          (Please specify your availability)  </span> 
        </label>
      </div>
      <p className='mt-5 font-semibold text-xl'>Custom resume <span className='text-slate-500'>(Optional)</span></p>
      <small className='text-slate-500'>Employer can download and view this resume</small>

 
      <div className="submit flex justify-center">
        {user?(
    <button className='submit-btn' onClick={submitApplication}  >Submit application</button>
        ):(
          <Link to={"/register"}>
          <button className='submit-btn' >Submit application</button>
          </Link>
        )
          
        }
  </div>


   
  </div>
  
  </>
)}
  
    </div>
  

)
}


export default JobsDetails
