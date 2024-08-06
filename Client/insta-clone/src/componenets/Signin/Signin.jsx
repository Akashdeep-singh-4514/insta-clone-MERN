import React, { useState, useEffect } from "react";
import Logo from "../../partials/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";

export default function Signin() {
  const [passVisible, setPassVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setloading] = useState(false);

  const RegExemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validateForm = () => {
    if (!RegExemail.test(email)) {
      notifyError("Email is not valid");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    if (validateForm()) {
      try {
        const response = await fetch(
          "https://insta-clone-mern-bakend.onrender.com/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
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
        console.error("Signin error:", error);
      } finally {
        setloading(false);
      }
    }
  };

  return (
    <div className="w-100 row text-center mt-5 object-fit-contain justify-content-center">
      <div className="card w-50 p-5">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <img src={Logo} alt="Logo" className="w-25" />
            <h4>Sign In</h4>
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
              placeholder="Password"
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
              {loading && <>loading</>}
              {!loading && <>login</>}
            </button>
            <p className="mt-2">
              Don't have an account?{" "}
              <Link className="text-decoration-none" to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
