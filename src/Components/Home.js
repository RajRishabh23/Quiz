import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import home1 from "../assets/home1.png";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleAdminClick = () => {
    navigate("/AdminLogin");
  };

  return (
    <div
      className="home-container flex flex-col min-h-screen relative"
      style={{
        backgroundImage: `url(${home1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex-1"></div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          onClick={handleAdminClick}
        >
          Admin ? Click here
        </button>
      </div>

      <div
        className="uppercase text-4xl bold text-purple-600"
        style={{ marginLeft: "190px", marginTop: "50px" }}
      >
        <h1>Online Quiz</h1>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="login-card px-8 py-8 rounded-xl my-10 mx-40">
          <h5
            className={`text-2xl font-semibold uppercase rounded-xl text-blue-600`}
          >
            User Login
          </h5>
          <button
            className={`px-4 py-4 tex-blue-600 text-white rounded hover:bg-blue-800 rounded-xl bg-blue-500`}
            onClick={handleLoginClick}
          >
            Click here for Login
          </button>
        </div>

        <div className="signup-card px-8 py-8 rounded-xl my-5 mx-40">
          <h5
            className={`text-2xl font-semibold uppercase rounded-xl text-blue-600`}
          >
            User Registration
          </h5>
          <button
            className={`px-4 py-4 text-green-600 text-white rounded hover:bg-green-800 rounded-xl bg-green-500 text-blue-600`}
            onClick={handleSignupClick}
          >
            Click here for Signup
          </button>
        </div>
      </div>

      <footer className="text-white flex justify-between items-center p-1 bg-purple-400">
        <p className="text-sm p-0 rounded-xl">
          &copy; {new Date().getFullYear()} Online Quiz App. All rights
          reserved.
        </p>
        <p className="text-md p-0 rounded-xl">
          Contact us:{" "}
          <a
            href="mailto:cis@abc.com"
            className="text-blue-800 hover:underline"
          >
            cis@abc.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
