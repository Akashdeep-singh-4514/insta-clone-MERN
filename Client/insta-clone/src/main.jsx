import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import {
  ChangePfp,
  CreatePost,
  Home,
  OtherProfile,
  PostDetailsh,
  PostDetailsp,
  Profile,
  Signin,
  Signup,
} from "./componenets/index.js";
import App from "./App.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />}>
        <Route path="" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="changepfp" element={<ChangePfp />} />
        <Route path="allcomments/:postId" element={<PostDetailsh />} />
        <Route path="post/:postId" element={<PostDetailsp />} />
        <Route path="user/:userId" element={<OtherProfile />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer theme="dark" />
  </React.StrictMode>
);
