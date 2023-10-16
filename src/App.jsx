import { useState, useEffect } from "react";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import styled from "styled-components";

import "./App.css";

function App() {
  // Create state to store the FizzBuzz results
  const [fizzBuzzResults, setFizzBuzzResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resultClasses, setResultClasses] = useState([]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < fizzBuzzResults.length) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
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
        <button onClick={generateFizzBuzz} className="btn play">
          <Play_btn />
          Play
        </button>
      </div>
      <br />
      <div className="current_num_container">
        <p className="current_num">
          {/* {fizzBuzzResults[currentIndex - 1]} ({fizzBuzzResults[currentIndex]}) */}
          <span className={`big ${resultClasses[currentIndex - 1]}`}>
            {fizzBuzzResults[currentIndex - 1]}
          </span>
        </p>
      </div>
      <div className="results-container">
        <ul className="result">
          {fizzBuzzResults.slice(0, currentIndex).map((result, index) => (
            <span key={index} className={resultClasses[index]}>
              {result}
              {index < currentIndex - 1 ? ", " : ""}
            </span>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
