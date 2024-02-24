import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Imageloader from "./imageloader";
export default function CreatePostForm() {
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [token, settoken] = useLocalStorage("instaClone1Token", "");
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const Navigate = useNavigate();

  const sendtoCloudinary = () => {
    // console.log(content);
    // console.log(image);
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dtx0nm3oa");
      fetch("https://api.cloudinary.com/v1_1/dtx0nm3oa/image/upload", {
        method: "Post",
        body: data,
      })
        .then((res) => res.json())
        .then((da) => setimageurl(da.url))
        .catch((err) => console.log(err));
    } else {
      notifyError("add an Image first");
    }
  };
  useEffect(() => {
    if (imageurl) {
      const date = Date.now();
      fetch("http://localhost:5000/createpost", {
        method: "Post",
        body: JSON.stringify({
          image: imageurl,
          content: content,
          date: date,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyError(data.error);
          } else if (data.message) {
            notifySuccess(data.message);
            Navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [imageurl]);

  return (
    <>
      <div className="w-50 m-auto mb-lg-5  row card mt-4 ">
        {/* <form action=""> */}
        <Imageloader image={image} setimage={setimage} />
        <textarea
          name=""
          id=""
          cols="30"
          className="col-12 mt-4"
          rows="5"
          placeholder="write a caption..."
          value={content}
          onChange={(e) => {
            setcontent(e.target.value);
          }}
        ></textarea>
        <button
          className="bg-info-subtle h3 mt-3 rounded-2 "
          onClick={(e) => {
            e.preventDefault();
            sendtoCloudinary();
          }}
        >
          Share
        </button>
        {/* </form> */}
      </div>
    </>
  );
}
