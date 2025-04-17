import { useState, useEffect } from 'react'
import axios from 'axios' // otdb api fetching
import './App.css'
import LandingPage from './LandingPage.jsx'
import Question from "./Question.jsx"

function App() {

  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const count = 0
  
  /* FETCHING OPEN TRIVIA API DATA */
  async function fetchTriviaData() {
    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=27&type=multiple")
    setTriviaQuestions(response.data.results)
  }
  
  /* GAME FUNCTION HANDLING */
  function toggleStartGame() {
    setGameStarted(prev => !prev)
    fetchTriviaData()
  }

  /* ORGANIZING DATA */
  /* 
      strucutre: array of objects 
      example: 
        category: "Animals"
        correct_answer: "Tail"
        difficulty: "hard"
        incorrect_answers (3): ['Head', 'Teeth', 'Feet']
        question: "Unlike on most salamanders, this part of a newt is flat?"
        type: "multiple"
  */

  // converting html code to regular characters
  function removeCharacters(question) {
    return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
  }

  function shuffleQuestions(incorrectAnswers, correctAnswer) {

    let allAnswers = []

    incorrectAnswers.map((item) => {
      allAnswers.push(item);
    })

    allAnswers.push(correctAnswer);

    // sort after all questions merged
    allAnswers.sort(() => Math.random() - 0.5);

    return allAnswers;
  }

  const fetchQuestion = () => {
    if (triviaQuestions.length > 0) {
      
      const currentQuestion = removeCharacters(triviaQuestions[count].question);
      const incorrectAnswers = triviaQuestions[count].incorrect_answers;
      const correctAnswer = triviaQuestions[count].correct_answer;
      const allAnswers = shuffleQuestions(incorrectAnswers, correctAnswer);
      const difficulty = triviaQuestions[count].difficulty;

      return (
        < Question 
            question={currentQuestion}
            incorrectAnswers={incorrectAnswers}
            correctAnswer={correctAnswer}
            answers={allAnswers}
            difficulty={difficulty}
        />
      )
    }
  }

  /* DEBUGGING */
  console.log(`game started: ${gameStarted}`)

  return (
    <>
    
      <header className='header'>
        <h1>Animal Trivia</h1>
        <p>Test Your Animal Knowledge</p>
      </header>

      {/* landing page */}
      {!gameStarted && < LandingPage handleClick={toggleStartGame}/>}
      
      {/* quiz page */}
      { gameStarted && 
        <>
          <div className='quiz-container'>
            {fetchQuestion()}
          </div>
          {/* control buttons */}
          <div className="control-buttons">
            <button className='submit'>Submit Answer</button>
            <button className='exit' onClick={toggleStartGame}>Exit Game</button>
          </div>
        </>
      }
      

    </>
  )
}

export default App
