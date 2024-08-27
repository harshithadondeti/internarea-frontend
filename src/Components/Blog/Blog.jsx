import React, { useEffect, useState } from "react";
import Img from "../../Assets/Firstslide.png";
import "./Blog.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPlayer from 'react-player'

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const renderPosts = async () => {
      const res = await axios.get("https://internarea-backend-t8di.onrender.com/api/post");
      setPosts(res.data);
    };
    renderPosts();
  }, []);

  return (
    <div className="total flex flex-col justify-center align-middle">
      <div className="flex mt-4 flex-col">
        <Link to={"/addpost"}>
          <button className="bg-blue-300 p-2 rounded border border-current">
            Add Post
          </button>
        </Link>
      </div>

     
      {posts.map((post) => (
        <>
          <div className="flex-col flex shadow shadow-current mt-3 blog1 bg-slate-50 rounded-lg  ">
            <div className=" flex  bg-blue-900 justify-between mt-4 ">
              <div>{post.postOwner}</div>
              <div>{post.createdAt}</div>
            </div>
            <div className="flex mt-2 image-container  bg-slate-50">
              {post.Type === "image" ? (
                <img className="image" src={post.content} alt="photo" />
              ) : (
                <div className="video flex justify-center">
                <ReactPlayer style={{border:'1px solid black'}} url={post.content} controls={true} width='90%' height='90%' />
              </div>
              )}
              
            </div>
            <div>{post.tag}</div>

            <div className="flex  image-likes">
              <span>
                <i class="bi bi-hand-thumbs-up-fill"></i>
                {post.likes}
              </span>
             
              <span>
                <i class="bi bi-share-fill"></i>Share
              </span>
            </div>
          </div>
          <div className="flex-col flex mt-4 comment-section  shadow  bg-slate-50 rounded-xl p-2">
            <p className="mt-2 text-xl text-left"> 10 comments</p>
            <div className="mt-2 text-xl text-left">
              <span> Add Comment</span>
              <input
                type="text"
                id="comment"
                className="comment-input border ml-4 shadow-sm shadow-inherit"
                placeholder="Add comment "
              />
            </div>
            <div className="flex mt-4 border ">
              <div className="pro-pic bg-slate-300">img</div>
              <div className="flex flex-col comments  border ">
                <p className="flex justify-between">
                  <span>username</span> <span>time</span>
                </p>
                <div className="each-comment">Nice video !!</div>
                <div className="flex justify-around">
                  <span>
                    <i class="bi bi-hand-thumbs-up-fill"></i>like
                  </span>
                  <span>
                    <i class="bi bi-hand-thumbs-down-fill"></i>dislike
                  </span>
                  <span>reply</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Blog;
