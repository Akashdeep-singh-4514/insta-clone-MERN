import React, { useEffect, useState } from "react";
import Logo from "../../partials/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";

export default function Signup() {
  const [passVisible, setPassVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const RegExpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const RegExemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validateForm = () => {
    if (!RegExemail.test(email)) {
      notifyError("Email is not valid");
      return false;
    } else if (!RegExpass.test(password)) {
      notifyError("Password should be strong");
      setMessage(
        "Password must be at least 8 characters long and contain a mix of letters and numbers."
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    setMessage("");
  }, [password]);

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "https://insSta-clone-mern-bakend.onrender.com/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              userName,
              password,
            }),
          }
        );

        const data = await response.json();

        if (data.error) {
          notifyError(data.error);
        } else if (data.message) {
          setUser({
            loggedIn: true,
            userName: data.userData.userName,
            email: data.userData.email,
            token: data.token,
            pfp: data.userData.pfp,
            _id: data.userData._id,
          });
          notifySuccess(data.message);
          navigate("/");
        }
      } catch (error) {
        notifyError("An error occurred. Please try again.");
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="w-100 row text-center mt-5 object-fit-contain justify-content-center">
      <div className="card w-50 p-5">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <img src={Logo} alt="Logo" className="w-25" />
            <h4>Signup</h4>
          </div>
          <div className="my-2">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-1 w-50 rounded-1"
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="p-1 w-50 rounded-1"
            />
          </div>
          <div className="my-2">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 w-50 rounded-1"
            />
          </div>
          <div className="my-2 position-relative">
            <input
              type={passVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 w-50 rounded-1"
            />
            <button
              type="button"
              className="position-absolute end-0 top-0 btn btn-link"
              onClick={() => setPassVisible(!passVisible)}
              style={{ marginLeft: "-2.5rem" }}
            >
              {passVisible ? "🙈" : "🐵"}
            </button>
          </div>
          <div className="my-2">
            <button
              type="submit"
              className="w-50 bg-info rounded-2 text-dark py-1"
            >
              Signup
            </button>
            <p className="mt-2">
              Already have an account?{" "}
              <Link className="text-decoration-none" to="/signin">
                Sign in
              </Link>
            </p>
            {message && <p style={{ color: "red" }}>{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
