import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import home1 from "../assets/home1.png"; 

function SignUp() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (!formData.fname) {
      isValid = false;
      validationErrors.fname = "First Name required";
    }

    if (!formData.lname) {
      isValid = false;
      validationErrors.lname = "Last Name required";
    }

    if (!formData.email) {
      isValid = false;
      validationErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email not valid";
    }

    if (!formData.password) {
      isValid = false;
      validationErrors.password = "Password required";
    } else if (formData.password.length < 8) {
      isValid = false;
      validationErrors.password = "Password length should be at least 8 characters";
    }

    if (formData.cpassword !== formData.password) {
      isValid = false;
      validationErrors.cpassword = "Passwords do not match";
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      axios
        .post("http://localhost:3001/user", formData)
        .then(result => {
          alert("Account created");
          navigate('/login');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${home1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-blue-500 text-4xl"></h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Home
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-1 rounded-lg w-full max-w-md" style={{ marginRight: "500px" }}>
          <h4 className="text-2xl font-bold mb-6 text-center text-blue-500">Create Your Account</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="fname"
                placeholder="Enter your first name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
                value={formData.fname}
              />
              {errors.fname && <div className="text-red-500 text-sm mt-1">{errors.fname}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lname"
                placeholder="Enter your last name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
                value={formData.lname}
              />
              {errors.lname && <div className="text-red-500 text-sm mt-1">{errors.lname}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm your password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
                onChange={(e) => setFormData({ ...formData, cpassword: e.target.value })}
                value={formData.cpassword}
              />
              {errors.cpassword && <div className="text-red-500 text-sm mt-1">{errors.cpassword}</div>}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200">Sign Up</button>
          </form>
        </div>
      </div>
      <footer className="text-white flex justify-between items-center p-1 bg-purple-400">
        <p className="text-sm p-0 rounded-xl">&copy; {new Date().getFullYear()} Online Quiz App. All rights reserved.</p>
        <p className="text-md p-0 rounded-xl">
          Contact us: <a href="mailto:cis@abc.com" className="text-blue-800 hover:underline">cis@abc.com</a>
        </p>
      </footer>
    </div>
  );
}

export default SignUp;
