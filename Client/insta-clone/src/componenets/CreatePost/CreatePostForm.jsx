import React from "react";

export default function CreatePostForm() {
  return (
    <>
      <div className="w-50 m-auto row card mt-4 ">
        <input
          type="file"
          id="imageUpload"
          name="image"
          className="w-50 col-12  p-2"
          accept=".jpg, .jpeg, .png"
          placeholder=""
          capture="camera"
        />
        <textarea
          name=""
          id=""
          cols="30"
          className="col-12"
          rows="10"
          placeholder="write a caption..."
        ></textarea>
      </div>
    </>
  );
}
