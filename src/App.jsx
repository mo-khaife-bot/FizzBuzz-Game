import { useState, useEffect } from "react";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { AiFillPauseCircle } from "react-icons/ai";
import { BsFillStopCircleFill } from "react-icons/bs";
import styled from "styled-components";

import "./App.css";

function App() {
  //  state to store the FizzBuzz results and classes
  const [fizzBuzzResults, setFizzBuzzResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultClasses, setResultClasses] = useState([]);
  const [timer, setTimer] = useState(null);

  // game and button starts
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    setGamePaused(false);
    generateFizzBuzz();
    startTimer();
  };

  const startTimer = () => {
    setTimer(
      setInterval(() => {
        if (currentIndex < fizzBuzzResults.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      }, 500)
    );
  };

  const handlePauseResume = () => {
    if (!gamePaused) {
      clearTimeout(timer); // Clear the previous timer if it exists
    } else {
      startTimer();
    }
    setGamePaused(!gamePaused);
  };

  const handleResetGame = () => {
    setGameStarted(false);
    setGamePaused(false);
    setCurrentIndex(0);
    setFizzBuzzResults([]);
    setResultClasses([]);
    setShowResults(false);
    clearTimeout(timer); // clear timer when resetting
  };

  const handleToggleResults = () => {
    setShowResults(!showResults);
  };

  // Function to generate FizzBuzz numbers
  const generateFizzBuzz = () => {
    const results = [];
    const classes = [];

    for (let i = 1; i <= 100; i++) {
      let className = "";

      if (i % 3 === 0 && i % 5 === 0) {
        results.push("FizzBuzz");
        className = "red-result";
      } else if (i % 3 === 0) {
        results.push("Fizz");
        className = "blue-result";
      } else if (i % 5 === 0) {
        results.push("Buzz");
        className = "green-result";
      } else {
        results.push(i);
      }
      classes.push(className);
    }
    setFizzBuzzResults(results);
    setResultClasses(classes);
  };

  // useEffect for timer effect
  useEffect(() => {
    let newTimer;
    if (gameStarted && !gamePaused) {
      newTimer = setTimeout(() => {
        if (currentIndex < fizzBuzzResults.length) {
          setCurrentIndex(currentIndex + 1);
        }
      }, 500);
      setTimer(newTimer); // Store the timer
    }

    return () => {
      if (newTimer) {
        clearTimeout(timer); // / Clear the timer when the component unmounts
      }
    };
  }, [currentIndex, fizzBuzzResults]);

  // Play_btn styled component
  const Play_btn = styled(MdOutlinePlayCircleOutline)`
    font-size: 2rem;
    background: blue;
    margin-right: 8px;
    padding: none;
    margin-bottom: -8px;
    text-align: center;
    color: white;
  `;

  // Pause btn styled component AiFillPauseCircle
  const Pause_btn = styled(AiFillPauseCircle)`
    font-size: 2rem;
    background: #ffa500;
    margin-right: 8px;
    padding: none;
    margin-bottom: -8px;
    text-align: center;
    color: white;
  `;

  const Resume_btn = styled(MdOutlinePlayCircleOutline)`
    font-size: 2rem;
    background: #ffa500;
    margin-right: 8px;
    padding: none;
    margin-bottom: -8px;
    text-align: center;
    color: white;
  `;

  // Reset btn styled component BsFillStopCircleFill
  const Reset_btn = styled(BsFillStopCircleFill)`
    font-size: 2rem;
    background: red;
    margin-right: 8px;
    padding: none;
    margin-bottom: -8px;
    text-align: center;
    color: white;
  `;

  return (
    <div className="container">
      <h1 className="main-title">
        <strong className="blue">Fizz 🥤</strong>
        <strong className="red">Buzz 🐝</strong>{" "}
        <strong className="green">Game 🎲</strong>
      </h1>
      <p className="description">
        This is a program that prints numbers from 1 to 100. For multiples of
        three it prints "<strong className="blue">Fizz</strong>" instead of the
        number, for the mulitples of five print "
        <strong className="green">Buzz</strong>". For numbers which are
        multiples of both three and five it prints "
        <strong className="red">FizzBuzz</strong>"
      </p>
      <div className="btn-wrapper">
        {!gameStarted ? (
          <button onClick={handleStartGame} className="btn play">
            <Play_btn />
            Play
          </button>
        ) : (
          <>
            <button
              onClick={handlePauseResume}
              className="btn pause"
              style={{ background: "#ffa500", marginRight: "15px" }}
            >
              {gamePaused ? <Resume_btn /> : <Pause_btn />}
              {gamePaused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={handleResetGame}
              className="btn reset"
              style={{ background: "red", marginRight: "15px" }}
            >
              <Reset_btn />
              Reset
            </button>
            <button
              onClick={handleToggleResults}
              className="btn result-toggle"
              style={{ background: "green" }}
            >
              {showResults ? "Hide all results" : "Show all results"}
            </button>
          </>
        )}
      </div>
      <br />

      {/* Fizz Buzz Results */}
      <p className="game-content">
        {/* Big Number */}
        <span className={`big ${resultClasses[currentIndex - 1]}`}>
          {fizzBuzzResults[currentIndex - 1]}
          <span className="small">
            {/* Small Number */}
            {fizzBuzzResults[currentIndex - 1] === currentIndex ||
            currentIndex === 0
              ? ""
              : `(${currentIndex})`}
          </span>
        </span>
      </p>

      {/* Results displaced */}
      <div className="results-container">
        <ul className="results-wrapper">
          {fizzBuzzResults.slice(0, currentIndex).map((result, index) => (
            <span key={index} className={`result-item ${resultClasses[index]}`}>
              {result}
              {index < currentIndex - 1 ? ", " : ""}
            </span>
          ))}
        </ul>
      </div>
      <p className="final-results hidden"></p>
    </div>
  );
}

export default App;
