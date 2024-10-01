import React, { useEffect, useState } from "react";
import axios from "axios";
import admin from '../assets/admin.png';

function AdminDashboard() {
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], correctOption: "" }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScores, setUserScores] = useState([]);
  const [showScores, setShowScores] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserScores = async () => {
      try {
        const response = await axios.get("http://localhost:3001/userScores");
        setUserScores(response.data);
      } catch (error) {
        console.error("Error fetching user scores:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUserScores();
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user.");
    }
  };

  const handleLogout = () => {
    window.location.href = '/'; // Navigate to Home.js
  };

  return (
    <div className="relative min-h-screen flex flex-col" style={{ backgroundImage: `url(${admin})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-gray-200 bg-opacity-80 p-2 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div>
          <button
            onClick={() => setShowScores(!showScores)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 mr-2"
          >
            {showScores ? "Hide User Scores" : "View User Scores"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {showScores && (
        <div className="p-4 bg-white bg-opacity-90 shadow-md mt-4 rounded">
          <h3 className="text-xl font-semibold text-center mb-4">User Scores</h3>
          <ul className="list-disc pl-5">
            {userScores.map((user) => (
              <li key={user.id} className={`flex justify-between items-center p-2 rounded mb-2 text-center ${user.score < 5 ? "bg-red-200" : "bg-green-200"}`}>
                <span className="font-medium w-full">{user.name}</span>
                <span className="font-medium w-full">{user.score}</span>
                <span className={`font-bold w-full ${user.score < 5 ? "text-red-600" : "text-green-600"}`}>
                  {user.score < 5 ? "Fail" : "Pass"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

   
      {!showScores && (
        <div className="flex flex-grow justify-center items-center">
          <div className="w-full max-w-md p-1 bg-white bg-opacity-80 shadow-md rounded">
            <label className="block text-sm font-medium mb-1">Subject Name</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject name"
              className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            />

            <label className="block text-sm font-medium mb-1">Question {currentQuestionIndex + 1}</label>
            <input
              type="text"
              value={questions[currentQuestionIndex].question}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[currentQuestionIndex].question = e.target.value;
                setQuestions(updatedQuestions);
              }}
              placeholder="Enter question"
              className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            />
            <div className="mt-2">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[currentQuestionIndex].options[index] = e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                    placeholder={`Option ${index + 1}`}
                    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 mb-2"
                  />
                </div>
              ))}
            </div>

            <label className="block text-sm font-medium mb-1">Correct Option</label>
            <select
              value={questions[currentQuestionIndex].correctOption}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[currentQuestionIndex].correctOption = e.target.value; 
                setQuestions(updatedQuestions);
              }}
              className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            >
              <option value="">Select correct option</option>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <option key={index} value={option}>{option}</option> 
              ))}
            </select>

            <button
              onClick={() => {
                setQuestions([...questions, { question: "", options: ["", "", "", ""], correctOption: "" }]);
                setCurrentQuestionIndex(questions.length);
              }}
              className="w-full bg-green-500 text-white rounded py-2 hover:bg-green-600 transition duration-200 mb-2"
            >
              Add Question
            </button>

            <button
              onClick={async () => {
                const dataToSave = {
                  subject,
                  questions,
                };

                try {
                  await axios.post("http://localhost:3001/questions", dataToSave);
                  alert("Questions saved successfully!");
                  setSubject("");
                  setQuestions([{ question: "", options: ["", "", "", ""], correctOption: "" }]);
                  setCurrentQuestionIndex(0);
                } catch (error) {
                  console.error("Error saving questions:", error);
                  alert("Error saving questions.");
                }
              }}
              className="w-full bg-purple-500 text-white rounded py-2 hover:bg-purple-600 transition duration-200"
            >
              Save Questions
            </button>
          </div>
        </div>
      )}

      <footer className="text-white flex justify-between items-center p-1 bg-purple-400 mt-auto">
        <p className="text-sm p-0 rounded-xl">&copy; {new Date().getFullYear()} Online Quiz App. All rights reserved.</p>
        <p className="text-md p-0 rounded-xl">
          Contact us: <a href="mailto:cis@abc.com" className="text-blue-800 hover:underline">cis@abc.com</a>
        </p>
      </footer>
    </div>
  );
}

export default AdminDashboard;
