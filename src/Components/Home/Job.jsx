import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const totalJobs=4

function Job() {

  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedcategory] = useState("Big Brands");
  const [JobData, setJobData]=useState([])
  useEffect(()=>{
    const fetchData=async()=>{
      try {
      const response=await axios.get('https://internarea-backend-t8di.onrender.com/api/job')
      setJobData(response.data)
    }catch (error) {
      console.log(error) 
    }
}
fetchData();
  },[])




  const filterJobs = JobData.filter(
    (item) => !selectedCategory || item.category === selectedCategory
  );

  const handleslideJob = (direction) => {
    const container = document.getElementById("container3");
    const step = 100;
    if (direction === "left") {
      setCurrentSlide((preveSlide) => (preveSlide > 0 ? preveSlide - 1 : 0));
    } else {
      setCurrentSlide((preveSlide) =>
        preveSlide < totalJobs ? preveSlide + 1 : totalJobs
      );
    }

    sideScrollJob(container, direction, 25, step, 10);
  };
  return (
    <>

<div className="infoys">
        <div className="info-intern">
          <div className="mt-16">
            <h1 className="text-center font-bold">
              Latest Jobs on Intern Area
            </h1>
          </div>
          <div className="categories flex flex-wrap mt-14">
            <p>POPULAR CATEGORIES :</p>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "Big Brands"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => selectedCategory==="Big Brands" ? setSelectedcategory(""):setSelectedcategory("Big Brands")}
            >
              Big Brands
            </span>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "Work From Home"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => selectedCategory==="Work From Home" ? setSelectedcategory(""):setSelectedcategory("Work From Home")}
            >
              Work from home
            </span>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "Part-time" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => selectedCategory==="Part-time" ? setSelectedcategory(""):setSelectedcategory("Part-time")}
            >
              Part time
            </span>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "MBA" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => selectedCategory==="MBA" ? setSelectedcategory(""):setSelectedcategory("MBA")}
            >
              {" "}
              MBA
            </span>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "Engineering"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => selectedCategory==="Engineering" ? setSelectedcategory(""):setSelectedcategory("Engineering")}
            >
              Engeneering
            </span>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "media" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => selectedCategory==="media" ? setSelectedcategory(""):setSelectedcategory("media")}
            >
              Media
            </span>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "Design" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => selectedCategory==="Design" ? setSelectedcategory(""):setSelectedcategory("Design")}
            >
              Design
            </span>
            <span
              className={`category mr-4 ml-6 ${
                selectedCategory === "Data Science"
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
              onClick={() => selectedCategory==="Data Science" ? setSelectedcategory(""):setSelectedcategory("Data Science")}
            >
              Data Science
            </span>
          </div>
          <div className="internships" id="container3">
            <div className="InternShip-Info flex">
              {filterJobs.map((data, index) => (
                <>
                  <div className="int-1 mt-6">
                    <p className="mb-4 mt-3" id="boxer">
                      <i className="bi bi-arrow-up-right text-blue-500"></i>
                      Actively hiring
                    </p>
                    <p>{data.title}</p>
                    <small>{data.company}</small>
                    <hr className="mt-5" />
                    <p className="mt-3">
                      <i className="bi bi-geo-alt text-slate-400"></i>{" "}
                      {data.location}
                    </p>
                    <p className="mt-1">
                      <i className="bi bi-cash-stack text-slate-400"></i>{" "}
                      {data.stipend}
                    </p>
                    <p className="mt-1">
                      <i class="bi bi-calendar-fill"></i>
                      {data.Duration}
                    </p>
                    <div className="more flex justify-between mt-6">
                      <span className="bg-slate-200 text-slate-400 w-20 rounded-sm text-center">
                        Internship
                      </span>
                      <Link to={`detailjob?q=${data._id}`}>
                      <span className='text-blue-500 mr-2'> 
                       View details <i class="bi bi-chevron-right"></i>
                      </span></Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="flex Buttons mt-9">
          <button className="back" onClick={() => handleslideJob("left")}>
            {" "}
            <i className="bi bi-chevron-left" id="sideback"></i>
          </button>
          <button className="next" onClick={() => handleslideJob("right")}>
            {" "}
            <i className="bi bi-chevron-right" id="slide"></i>
          </button>
        </div>
      </div>
      
    </>
  )
}




function sideScrollJob(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(function () {
    if (direction === "left") {
      element.scrollLeft -= step;
      console.log("scrolling left");
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}
export default Job