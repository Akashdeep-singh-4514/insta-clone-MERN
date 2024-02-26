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
  CreatePost,
  Explore,
  Home,
  OtherProfile,
  PostDetailsE,
  PostDetailsh,
  PostDetailsp,
  Profile,
  SearchResult,
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
        <Route path="explore" element={<Explore />} />
        <Route path="allcomments/:postId" element={<PostDetailsh />} />
        <Route path="post/:postId" element={<PostDetailsp />} />
        <Route path="posts/:postId" element={<PostDetailsE />} />
        <Route path="user/:userName" element={<OtherProfile />} />
        <Route path="search/:searchtext" element={<SearchResult />} />
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
