import React from "react";

export default function CreatePostForm() {
  const loadFile = (e) => {
    const output = document.getElementById("preloadImage");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <>
      <div className="w-50 m-auto mb-lg-5  row card mt-4 ">
        <input
          type="file"
          id="imageUpload"
          name="image"
          className="w-50 col-12  p-2"
          accept=".jpg, .jpeg, .png"
          placeholder=""
          capture="camera"
          onChange={(e) => {
            loadFile(e);
          }}
        />
        <img
          src=""
          alt=""
          className="w-50 object-fit-contain m-auto"
          id="preloadImage"
        />
        <textarea
          name=""
          id=""
          cols="30"
          className="col-12 mt-4"
          rows="5"
          placeholder="write a caption..."
        ></textarea>
        <button className="bg-info-subtle h3 mt-3">Share</button>
      </div>
    </>
  );
}
