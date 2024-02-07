import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link } from "react-router-dom";

export default function Signin() {
  const [passVisible, setPassVisible] = useState(false);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-100 row text-center mt-5 object-fit-contain justify-content-center ">
        <div className="card w-50 p-5">
          <form>
            <div className="">
              <img src={Logo} alt="logo" className="w-25" />
              <h4>SignIn</h4>
            </div>
            <div className="">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                className="p-1 w-50 my-2 rounded-1 "
              />
            </div>
            <div className="">
              <input
                type={`${passVisible ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Password"
                className="p-1 w-50 my-2 rounded-1  "
                style={{ marginLeft: "5%" }}
              />
              <button
                className="bg-info-subtle py-1 rounded-3"
                onClick={(e) => {
                  e.preventDefault();
                  setPassVisible(!passVisible);
                }}
              >
                {passVisible ? "🙈" : "🐵"}
              </button>
            </div>
            <div className="">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault;
                }}
                className="w-50 bg-info rounded-2  text-dark py-1 my-2  "
              >
                login
              </button>
              <p>
                don't have an account?
                <Link className="text-decoration-none " to="/signup">
                  {" "}
                  signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
