import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import login from '../assets/login.png'; 

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (!formData.email) {
      isValid = false;
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      isValid = false;
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      isValid = false;
      validationErrors.password = "Password must be at least 8 characters long";
    }

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:3001/admin/login", formData);
        const user = response.data;

        if (user) {
          alert("Login successful");
          navigate('/admindashboard');
        } else {
          validationErrors.email = "Email or password incorrect";
          setErrors(validationErrors);
        }
      } catch (err) {
        console.error(err);
        validationErrors.email = "Login failed, please try again.";
        setErrors(validationErrors);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-white text-lg"></h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Home
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-20 px-5 py-10 rounded-lg w-full max-w-sm" style={{ marginLeft: '-600px', marginBottom: '-120px' }}>
          <h2 className="text-2xl font-bold mb-6 text-center uppercase text-blue-400"></h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">Login</button>
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

export default AdminLogin;
