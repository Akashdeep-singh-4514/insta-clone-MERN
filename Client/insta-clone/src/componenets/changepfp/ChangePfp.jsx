import React, { useEffect, useState } from "react";
import Imageloader from "../CreatePost/imageloader";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ChangePfp() {
  const [imageurl, setimageurl] = useState("");
  const [image, setimage] = useState("");
  const [token, settoken] = useLocalStorage("instaCloneToken", "");
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
      fetch("http://localhost:5000/changepfp", {
        method: "put",
        body: JSON.stringify({
          image: imageurl,
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
            Navigate("/profile");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [imageurl]);

  return (
    <>
      <div className="w-50 m-auto mb-lg-5  row card mt-4 ">
        <Imageloader image={image} setimage={setimage} />
        <button
          className="bg-info-subtle mt-5 "
          onClick={(e) => {
            e.preventDefault();
            sendtoCloudinary();
          }}
        >
          upload
        </button>
      </div>
    </>
  );
}

export default ChangePfp;
