import React from "react";

function Imageloader({ image, setimage }) {
  const loadFile = (e) => {
    const output = document.getElementById("preloadImage");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = () => {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <>
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
          // console.log(token);
          setimage(e.target.files[0]);
        }}
      />
      <img
        src=""
        alt=""
        className="w-50 object-fit-contain m-auto"
        id="preloadImage"
      />
    </>
  );
}

export default Imageloader;
