import React from "react";
import { Header } from "../componenets";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
