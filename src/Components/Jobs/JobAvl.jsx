import React, { useEffect } from "react";
import "./Jobs.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import compLogo from "../../Assets/logo.png";
import axios from "axios";

function JobAvl() {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const [isDivVisible, setDivVisible] = useState(false);
  const [jobData, setjobData] = useState([]);
  const [filterJob, setfilterJob] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://internarea-backend-t8di.onrender.com/api/job");
        setjobData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setfilterJob(jobData);
  }, [jobData]);

  const showDiv = () => {
    setDivVisible(true);
  };
  const hideDiv = () => {
    setDivVisible(false);
  };

  const handleCategoryChange = (e) => {
    const Categoryvalue = e.target.value;
    setSearchCategory(Categoryvalue);
    filterJobs(Categoryvalue, searchLocation);
  };
  const handleLocationChange = (e) => {
    const Locationvalue = e.target.value;
    setSearchLocation(Locationvalue);
    filterJobs(searchCategory, Locationvalue);
  };
  const filterJobs = (category, location) => {
    const filterData = jobData.filter(
      (Job) =>
        Job.category.toLowerCase().includes(category.toLowerCase()) &&
        Job.location.toLowerCase().includes(location.toLowerCase())
    );
    setfilterJob(filterData);
  };

  return (
    <>
      <div className="flex internship-filter">

        <div className="first-int  flex flex-col" id="filter">

          <div className=" filter-section m-2 ">

            <p className="text-centre ">
              <i onClick={showDiv} class="bi bi-funnel text-blue-400 "></i>Filter
            </p>

            <div className=" flex flex-col ml-2">
              <label htmlFor="pro">Profile</label>
              <input
                type="text"
                id="pro"
                value={searchCategory}
                onChange={handleCategoryChange}
                className="profile border-2 mr-3"
                placeholder="profile manager"
              />
              <label htmlFor="loc">Location</label>
              <input
                type="text"
                id="loc"
                value={searchLocation}
                onChange={handleLocationChange}
                className="location border-2  mr-3"
                placeholder="Mumbai"
              />
            </div>

            <div className="preferences flex flex-col mt-3">
              <div className="flex mt-3 ml-3 mr-3">
                <input
                  type="checkbox"
                  name="wfh"
                  id="wfh"
                  className="mr-2 ml-3"
                />
                <label htmlFor="wfh">Work From Home</label>
              </div>
              <div className="flex mt-3 ml-3 mr-3">
                <input
                  type="checkbox"
                  name="pt"
                  id="wfh"
                  className="mr-2 ml-3"
                />
                <label htmlFor="pt">Part-Time</label>
              </div>
              <p className="mt-2">Anuall Salary in Lakhs</p>
              <input type="range" name="" id="" />
              <p className="mt-3 ml-3 mr-3">
                0 &nbsp; 2 &nbsp; 4 &nbsp; 6 &nbsp; 8 &nbsp; 10
              </p>
            </div>

            <p className="mt-3 text-blue-400">
              View more filters <i class="bi bi-chevron-down"></i>
            </p>
            <span className="justify-end flex mt-3 text-blue-400">Clear all</span>
          </div>

          <div className="search-2 m-2">
            <div className="search-container">
              <input type="text" placeholder="eg-Design media MBA" />
              <div className="search-icon">
                <i class="bi bi-search"></i>
              </div>
            </div>
          </div>

        <div className="m-2 search-2">
          <div className="bg-white search-container ">
            <label htmlFor="experience">Experience</label> <br />
            <input
              type="text"
              id="experience"
              name="expeience"
              placeholder="eg. 1-2 years"
            />
          </div>
</div>
        </div>

        <div className="all-internships  flex flex-col">
          <div className="flex justify-centre show2 m-2">
            <p
              id="filtericon"
              className="filtericon text-center"
              onClick={showDiv}
            >
              Filter <i class="bi bi-funnel text-blue-400"></i>
            </p>
          </div>

          <div className="list flex flex-col">
            <p className="font-bold text-lg text-center ">
              {filterJob.length} Total Internships{" "}
            </p>

            {filterJob.map((data, index) => (
              <div className="shadow-lg rounded-lg bg-white m-7 " id="display">
                <div className="m-4">
                  <p className="mb-4 mt-3" id="boxer">
                    {" "}
                    <i className="bi bi-arrow-up-right text-blue-500"></i>{" "}
                    Actively Hiring
                  </p>
                  <div className="flex justify-end ">
                    <img src={compLogo} className="w-14" alt="" />
                  </div>
                  <div className="all-ele ">
                  <div className="flex  details">
                    <div className="text-lg text-black m-2 mt-7 font-bold job-title">
                      {data.title}
                    </div>
                    <div className="info">
                      <p className="text-sm text-slate-300 font-bold">
                        {data.company}
                      </p>
                      <p className=" mt-2">{data.location}</p>
                    </div>
                    </div>
                    <div className="flex mt-4 text-sm justify-between ">
                      <p className="mt-3">
                        {" "}
                        <i class="bi bi-play-circle-fill"></i> Start Date <br />{" "}
                        {data.StartDate}
                      </p>

                      <p className="mt-3">
                        {" "}
                        <i class="bi bi-calendar-check-fill"></i> Experience{" "}
                        <br />
                        {data.Experience}
                      </p>

                      <p className="mt-3">
                        {" "}
                        <i class="bi bi-cash"></i> Salary <br /> {data.CTC}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end" id="hr">
                    <Link to={`/detailjob?q=${data._id}`} className="mt-10">
                      <button
                        id="viewButtons"
                        className="bg-transparent text-blue-500"
                      >
                        View In Deatils
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDivVisible && (
        <>
          <div className="first2-int mb-14">
            <div className=" filter-section w-1/6">
              <button id="close-btn" onClick={hideDiv}>
                <i class=" bi bi-x"> </i>Close{" "}
              </button>

              <p className="text-centre" onClick={showDiv}>
                <i class="bi bi-funnel text-blue-400 "></i>Filter
              </p>
              <div className="fill flex flex-col ml-2">
                <label htmlFor="pro">Profile</label>
                <input
                  type="text"
                  id="pro"
                  value={searchCategory}
                  onChange={handleCategoryChange}
                  className="profile border-2 mr-3"
                  placeholder="profile manager"
                />
                <label htmlFor="loc">Location</label>
                <input
                  type="text"
                  id="loc"
                  value={searchLocation}
                  onChange={handleLocationChange}
                  className="location border-2 mt-10 ml-8 w-full"
                  placeholder="Mumbai"
                />
              </div>

              <div className="preferences flex flex-col mt-3">
                <div className="flex mt-3 ml-3 mr-3">
                  <input
                    type="checkbox"
                    name="wfh"
                    id="wfh"
                    className="mr-2 ml-3"
                  />
                  <label htmlFor="wfh">Work From Home</label>
                </div>
                <div className="flex mt-3 ml-3 mr-3">
                  <input
                    type="checkbox"
                    name="pt"
                    id="wfh"
                    className="mr-2 ml-3"
                  />
                  <label htmlFor="pt">Part-Time</label>
                </div>
                <p>Anuall Salary in Lakhs</p>
                <input type="range" name="" id="" />
                <p className="mt-3 ml-3 mr-3">
                  0 &nbsp; 2 &nbsp; 4 &nbsp; 6 &nbsp; 8 &nbsp; 10
                </p>
              </div>

              <p className="mt-3 text-blue-400">
                View more filters <i class="bi bi-chevron-down"></i>
              </p>
              <span className="justify-end flex text-blue-400">Clear all</span>
            </div>
            <div className="search-2">
              {" "}
              <div className="search-container">
                <input type="text" placeholder="eg-Design media MBA" />
                <div className="search-icon">
                  <i class="bi bi-search"></i>
                </div>
              </div>
            </div>

            <div className="bg-white ml-24">
              <label htmlFor="experience">Experience</label> <br />
              <input
                type="text"
                id="experience"
                name="expeience"
                placeholder="eg. 1-2 years"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default JobAvl;
