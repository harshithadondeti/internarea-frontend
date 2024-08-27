import React from 'react'
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { selectUser } from '../../feature/UserSlice';

function Login() {
  const [fname,setFname]=useState("")
  const [lname,setLname]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  
  // const user=useSelector(selectUser);
    const navigate=useNavigate();

    const [isStudent, setStudent] = useState(false);
    const setTrueForStudent = () => {
        setStudent(false);
      };
      const setFalseForStudent = () => {
        setStudent(true);
      };
    //   const closeLogin = () => {
    //     setDivVisibleForLogin(false);
    //   };

      const loginFunction = () => {
        signInWithPopup(auth, provider)
          .then((res) => {
            console.log(res);
            navigate('/')
           
          })
          .catch((err) => {
            console.log(err);
            
          });
        //   setDivVisibleForLogin(true);
      };

      const Login=()=>{
        const emailInput=document.getElementById('lemail');
        const passwordInput=document.getElementById('lpassword')
        setEmail(emailInput.value);
        setPassword(passwordInput.value);

        signInWithEmailAndPassword(auth,email,password).then(cred=>{
          const id = cred.user.uid;
          console.log(cred.user);
          console.log(id);
          console.log("user is logged in ")
          emailInput.value="";
          passwordInput.value="";
          navigate('/')
        }).catch(err=>{
          console.log(err.message)
        })

      }
      const eLogin=()=>{
        const emailInput=document.getElementById('eemail');
        const passwordInput=document.getElementById('epassword')
        setEmail(emailInput.value);
        setPassword(passwordInput.value);

        signInWithEmailAndPassword(auth,email,password).then(cred=>{
          const id = cred.user.uid;
          console.log(cred.user);
          console.log(id);
          console.log("user is logged in ")
          emailInput.value="";
          passwordInput.value="";
          navigate('/')
        }).catch(err=>{
          console.log(err.message)
        })

      }

  return (
    <div>
         
           <Link to={"/"}> <button id="cross" >
              <i class="bi bi-x-circle"></i>
            </button>
            </Link>
            <h5 id="state" className="mb-4 justify-center text-center">
              <span
                id="sign-in"
                style={{ cursor: "pointer" }}
                className={`auth-tab ${isStudent ? "active" : ""}`}
                onClick={setFalseForStudent}
              >
                Student
              </span>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <span
                id="join-in"
                style={{ cursor: "pointer" }}
                className={`auth-tab ${isStudent ? "active" : ""}`}
                onClick={setTrueForStudent}
              >
                Employee andT&P
              </span>
            </h5>
            {isStudent ? (
              <>
                <div className="py-6">
                  <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="w-full p-8 lg:w-1/2">
                      <p
                        onClick={loginFunction}
                        className="flex items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100"
                      >
                        <div className="px-4 py-3 ">
                          <svg class="h-6 w-6" viewBox="0 0 40 40">
                            <path
                              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                              fill="#FFC107"
                            />
                            <path
                              d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                              fill="#FF3D00"
                            />
                            <path
                              d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                              fill="#4CAF50"
                            />
                            <path
                              d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                              fill="#1976D2"
                            />
                          </svg>
                        </div>
                        <h1 className="text-gray-500">Login with Google</h1>
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="border-b- w-1/5 lg:w-1/4"></span>
                        <p className="text-gray-500 text sm fonr-bold mb-2">
                          or
                        </p>
                        <span className="border-b- w-1/5 lg:w-1/4"></span>
                      </div>
                      <div class="mt-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                          Email{" "}
                        </label>
                        <input
                          class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          type="email"
                          placeholder="john@example.com"
                          id='lemail'
                        />
                      </div>
                      <div class="mt-4">
                        <div class="flex justify-between">
                          <label class="block text-gray-700 text-sm font-bold mb-2">
                            Password
                          </label>
                          <a href="/" class="text-xs text-blue-500">
                            Forget Password?
                          </a>
                        </div>
                        <input
                          class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                          placeholder="Must be atleast 6 characters"
                          type="password"
                          id='lpassword'
                        />
                      </div>
                      <div className="mt-8">
                        <button className="btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 " onClick={Login}>
                          Login
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm">
                          new to internarea? Register(
                            <Link to={"/"}>
                          <span
                            className="text-blue-500 cursor-pointer"
                          >
                            Student
                          </span>
                          </Link>
                          /
                          <Link to={"/"}>
                          <span
                            className="text-blue-500 cursor-pointer"
                          >
                            company
                          </span>
                          </Link>
                          ){" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                  <div className="w-full p-8 lg:w-1/2">
                    <div class="mt-4">
                      <label class="block text-gray-700 text-sm font-bold mb-2">
                        Email{" "}
                      </label>
                      <input
                        class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        type="email"
                        placeholder="john@example.com"
                        id='eemail'
                      />
                    </div>
                    <div class="mt-4">
                      <div class="flex justify-between">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                          Password
                        </label>
                        <a href="/" class="text-xs text-blue-500">
                          Forget Password?
                        </a>
                      </div>
                      <input
                        class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                        placeholder="Must be atleast 6 characters"
                        id="epassword"
                        type="password"
                      />
                    </div>
                    <div className="mt-8">
                      <button className="btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 " onClick={eLogin}>
                        Login
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm">
                        new to internarea? Register(
                        <Link to={'/'}><span
                          className="text-blue-500 cursor-pointer"
                          
                        >
                          Student
                        </span>
                        </Link>
                        /
                        <Link to={'/'}><span
                          className="text-blue-500 cursor-pointer"
                          
                        >
                          company
                        </span>
                        </Link>
                        ){" "}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
         
       
    </div>
  )
}

export default Login