import axios from "axios";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/UserSlice";

function UploadPost() {
  const [tag, setTag] = useState("");
  const [img, setImg] = useState();
  const [video, setvideo] = useState();
  const [loading, setLoading] = useState(false);
  const [postType, setpostType] = useState("image");
  const user = useSelector(selectUser);
  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : video);
    data.append(
      "upload_preset",
      type === "image" ? "internarea_images_preset" : "internarea_videos_preset"
    );

    try {
      let cloudname = "dw4gchqda";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudname}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (e) {
      console.log(e);
    }
  };

  const AddPost = async () => {
    try {
      setLoading(true);

      const newPost = {};
      newPost.postOwner = user?.name;
      newPost.tag = tag;

      if (postType === "image") {
        const imgurl = await uploadFile("image");
        newPost.Type = "image";
        newPost.content = imgurl;
        const res = await axios.post(
          `https://internarea-backend-t8di.onrender.com/api/post/`,
          newPost
        );
        console.log(res.data);
      } else {
        const videourl = await uploadFile("video");
        newPost.Type = "video";
        newPost.content = videourl;
        const res = await axios.post(
          `https://internarea-backend-t8di.onrender.com/api/post/`,
          newPost
        );
        console.log(res.data);
      }
      console.log("uploaded !!");

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

 
  const setImagepost=()=>{
    setpostType("image")
  }
  const setvideopost=()=>{
    setpostType("video")
  }
  return (
    <div>
      <div className="mt-4 p-4 bg-gray-100 flex  flex-col">
        <div className="">
          <input type="radio" name="postType" value="image"  checked onClick={setImagepost}/> Image <br />
          <input type="radio" name="postType" value="video"  onClick={setvideopost}/> Video
        </div>

        {postType === "image" ? (
          <>
            <label htmlFor="img">Image:</label>
            <input
              type="file"
              accept="image/*"
              id="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </>
        ) : (
          <>
            <label htmlFor="video">video:</label>
            <input
              type="file"
              accept="video/*"
              id="video"
              onChange={(e) => setvideo(e.target.files[0])}
            />
          </>
        )}

        <label>Tag</label>
        <input
          type="text"
          placeholder="Add tag for post"
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          className="bg-blue-300 p-2 rounded border border-current"
          onClick={AddPost}
        >
          Add Post
        </button>
      </div>
      {loading ? (
        <>
          <RotatingLines
            visible={true}
            height="42"
            width="42"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default UploadPost;
