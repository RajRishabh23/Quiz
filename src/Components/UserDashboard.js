import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.webp";

function UserDashboard() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [userScores, setUserScores] = useState([]);
  const [itemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:3001/questions");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    const fetchUserScores = async () => {
      try {
        const response = await axios.get("http://localhost:3001/userScores");
        setUserScores(response.data);
      } catch (error) {
        console.error("Error fetching user scores:", error);
      }
    };

    fetchSubjects();
    fetchUserScores();
  }, []);

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    const subjectQuestions = subjects.find((s) => s.subject === subject);
    setQuestions(subjectQuestions ? subjectQuestions.questions : []);

    const initialAnswers = new Array(subjectQuestions?.questions.length).fill("");
    setUserAnswers(initialAnswers);

    setIsTestComplete(false);
    setCurrentPage(1);
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentPage - 1] = e.target.value; // Adjust for 0-indexing
    setUserAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentPage < questions.length) {
      setCurrentPage(currentPage + 1);
    } else {
      if (questions.length > 0) {
        calculateScore();
        setIsTestComplete(true);
      }
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index]?.trim().toLowerCase();
      const correctAnswer = question.correctOption.trim().toLowerCase();

      if (userAnswer === correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
  };

  const handleScoreSubmission = async () => {
    if (!userName) {
      alert("Please enter your name.");
      return;
    }

    const newScore = { name: userName, score };
    try {
      await axios.post("http://localhost:3001/userScores", newScore);
      alert("Score submitted successfully!");
      resetDashboard();
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Error saving score.");
    }
  };

  const resetDashboard = () => {
    setSelectedSubject("");
    setQuestions([]);
    setUserAnswers([]);
    setIsTestComplete(false);
    setScore(0);
    setUserName("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(questions.length / itemsPerPage);

  return (
    <div
      className="dashboard-container bg-gray-100 h-screen flex flex-col"
      style={{
        backgroundImage: `url(${dashboard})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="navbar shadow-lg p-4 flex justify-between items-center bg-blue-300 bg-opacity-75">
        <h2 className="text-2xl font-bold uppercase">User Dashboard</h2>
        <Link to="/">
          <button className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition duration-200" style={{ width: "100px" }}>
            Logout
          </button>
        </Link>
      </nav>

      <div className="flex-grow flex flex-col md:flex-row px-4 mt-4 mb-4">
        <div className="flex-grow flex justify-center items-center mt-4">
          <div className="question-container p-4 rounded-lg shadow-md max-w-4xl w-full bg-white bg-opacity-90 h-128" style={{ maxHeight: "100vh", overflowY: "auto" }}>
            {!isTestComplete && !selectedSubject && (
              <>
                <label className="block mb-2 text-sm font-medium text-gray-700">Select Subject</label>
                <select value={selectedSubject} onChange={handleSubjectChange} className="block w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                  <option value="">Select a subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject.subject}>
                      {subject.subject}
                    </option>
                  ))}
                </select>
              </>
            )}

            {!isTestComplete && selectedSubject && questions.length > 0 && (
              <div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">Total Questions: {questions.length}</p>
                </div>

                <div className="mt-4 flex justify-center mb-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-lg font-medium">{questions[currentPage - 1]?.question}</label>
                  {questions[currentPage - 1]?.options.map((option, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <input
                        type="radio"
                        value={option}
                        checked={userAnswers[currentPage - 1] === option}
                        onChange={handleAnswerChange}
                        className="mr-2"
                      />
                      <label className="text-gray-700">{option}</label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-4">
                  {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-300 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-400 transition duration-200">
                      Previous
                    </button>
                  )}
                  {currentPage < questions.length ? (
                    <button onClick={handleNext} className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200">
                      Next
                    </button>
                  ) : (
                    <button onClick={handleNext} className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200">
                      Finish Test
                    </button>
                  )}
                </div>
              </div>
            )}

            {isTestComplete && (
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold">Test Completed!</h3>
                <p className="mt-2">Your score: {score} out of {questions.length}</p>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter Your Email Id"
                  className="mt-4 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
                <div className="flex flex-col justify-center w-full mt-4">
                  <button
                    onClick={handleScoreSubmission}
                    className="w-full bg-green-500 text-white rounded-md py-2 hover:bg-green-600 transition duration-200"
                  >
                    Submit Score
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Only show instructions if the test is not complete */}
        {!isTestComplete && (
          <div className="bg-opacity-75 p-4 rounded-lg mt-4 w-auto">
            <h3 className="text-lg font-bold mb-4">Instructions</h3>
            <p className="text-gray-700">
              1. Please select a subject from the dropdown menu.
              <br />
              2. Answer the questions presented, then click "Next" to proceed.
              <br />
              3. At the end of the test, you will see your score.
              <br />
              4. You can also view your previous scores.
            </p>
          </div>
        )}
      </div>

      <footer className="text-white flex justify-between items-center p-1 bg-purple-400">
        <p className="text-sm p-1 rounded-xl">&copy; {new Date().getFullYear()} Online Quiz App. All rights reserved.</p>
        <p className="text-md p-1 rounded-xl">
          Contact us: <a href="mailto:cis@abc.com" className="text-blue-800 hover:underline">cis@abc.com</a>
        </p>
      </footer>
    </div>
  );
}

export default UserDashboard;
