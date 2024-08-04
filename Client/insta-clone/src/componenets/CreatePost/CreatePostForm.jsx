import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Imageloader from "./imageloader";

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [token, setToken] = useLocalStorage("instaCloneToken", "");
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();

  const sendToCloudinary = async () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dtx0nm3oa");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dtx0nm3oa/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const da = await res.json();
        setImageUrl(da.url);
      } catch (err) {
        console.log(err);
      }
    } else {
      notifyError("Add an image first");
    }
  };

  useEffect(() => {
    const createPost = async () => {
      if (imageUrl) {
        const date = Date.now();
        try {
          const res = await fetch(
            "https://insta-clone-mern-bakend.onrender.com/createpost",
            {
              method: "POST",
              body: JSON.stringify({
                image: imageUrl,
                content: content,
                date: date,
              }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          if (data.error) {
            notifyError(data.error);
          } else if (data.message) {
            notifySuccess(data.message);
            navigate("/");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    createPost();
  }, [imageUrl]);

  return (
    <div className="w-50 m-auto mb-lg-5 row card mt-4">
      <Imageloader image={image} setimage={setImage} />
      <textarea
        cols="30"
        className="col-12 mt-4"
        rows="5"
        placeholder="Write a caption..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="bg-info-subtle h3 mt-3 rounded-2"
        onClick={(e) => {
          e.preventDefault();
          sendToCloudinary();
        }}
      >
        Share
      </button>
    </div>
  );
}
