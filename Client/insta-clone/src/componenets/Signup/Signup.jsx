import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";

export default function Signup() {
  const [passVisible, setPassVisible] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");
  const Navigate = useNavigate();
  const { user, setUser } = useUser();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const RegExpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const RegExemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validation = () => {
    if (!RegExemail.test(email)) {
      notifyError("email is not valid");
      return false;
    } else if (!RegExpass.test(password)) {
      notifyError("password should be strong");
      setmessage(
        "password must be 8 characters long and may contain alphanumeric charactters and special characters"
      );

      return false;
    }
    return true;
  };
  useEffect(() => {
    setmessage("");
  }, [password]);
  useEffect(() => {
    if (user.loggedIn) {
      console.log(user);

      Navigate("/");
    }
  }, [user]);

  const handleSubmit = () => {
    if (validation()) {
      fetch("http://localhost:5000/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          userName: userName,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyError(data.error);
          } else if (data.message) {
            setUser({
              loggedIn: true,
              userName: data.userData.userName,
              email: data.userData.email,
              token: data.token,
              pfp: data.userData.pfp,
            });
            notifySuccess(data.message);
          }
          // console.log(data);
        });
    }
  };

  return (
    <>
      <div className="w-100 row text-center mt-5 object-fit-contain justify-content-center ">
        <div className="card w-50 p-5">
          <form>
            <div className="">
              <img src={Logo} alt="logo" className="w-25" />
              <h4>Signup</h4>
            </div>
            <div className="">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="full name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                className="p-1 w-50 my-2 rounded-1 "
              />
            </div>
            <div className="">
              <input
                type="text"
                name="username"
                id="username"
                value={userName}
                onChange={(e) => {
                  setuserName(e.target.value);
                }}
                placeholder="username"
                className="p-1 w-50 my-2 rounded-1 "
              />
            </div>

            <div className="">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                placeholder="E-mail"
                className="p-1 w-50 my-2 rounded-1 "
              />
            </div>
            <div className="">
              <input
                type={`${passVisible ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
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
                  e.preventDefault();

                  handleSubmit();
                }}
                className="w-50 bg-info rounded-2  text-dark py-1 my-2  "
              >
                signup
              </button>
              <p>
                already have an account?
                <Link className="text-decoration-none " to="/signin">
                  {" "}
                  signin
                </Link>
              </p>
              <p style={{ color: "red" }}>{message}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
