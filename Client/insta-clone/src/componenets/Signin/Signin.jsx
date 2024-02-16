import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";

export default function Signin() {
  const [passVisible, setPassVisible] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const Navigate = useNavigate();
  const { user, setUser } = useUser();

  const RegExemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validation = () => {
    if (!RegExemail.test(email)) {
      notifyError("email is not valid");
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (user.loggedIn) {
      // console.log(user);

      Navigate("/");
    }
  }, [user]);

  const handleSubmit = () => {
    if (validation()) {
      fetch("http://localhost:5000/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
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
              followers: data.userData.followers,
              follwing: data.userData.following,
            });
            notifySuccess(data.message);
            // Navigate("/");
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
              <h4>SignIn</h4>
            </div>
            <div className="">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                className="p-1 w-50 my-2 rounded-1 "
              />
            </div>
            <div className="">
              <input
                type={`${passVisible ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder="Password"
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
