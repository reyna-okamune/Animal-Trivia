import { useState, useEffect } from 'react'
import axios from 'axios' // otdb api fetching
import './App.css'
import LandingPage from './LandingPage.jsx'
import Question from "./Question.jsx"
import ButtonControls from "./ButtonControls.jsx"

function App() {

  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [count, setCount] = useState(0)
  const [points, setPoints] = useState(0)
  const [submitClicked, setSumbitClicked] = useState(false)
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

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    console.log(`answer selected: ${answer}`)
  }

  const fetchQuestion = () => {
    if (triviaQuestions.length > 0) {
      const currentQuestion = removeCharacters(triviaQuestions[count].question);
      const incorrectAnswers = triviaQuestions[count].incorrect_answers;
      const correctAnswer = triviaQuestions[count].correct_answer;
      const difficulty = triviaQuestions[count].difficulty;
      const number = count;

      return (
        < Question 
            question={currentQuestion}
            incorrectAnswers={incorrectAnswers}
            correctAnswer={correctAnswer}
            difficulty={difficulty}
            onAnswerSelect={handleAnswerSelect}
            number={count}
        />
      )
    }
  }

  function checkAnswer() {
    if (selectedAnswer.length > 0) {
      setSumbitClicked(prev => !prev);
      const correctAnswer = triviaQuestions[count].correct_answer;
      if (selectedAnswer === correctAnswer) {
        setPoints(prev => prev + 1)
        console.log("correct!")
      }
      else {
        console.log("incorrect!")
      }
    }

    else {
      console.log("you must submit answer!");
      return;
    }
  }

  function renderNext() {
    console.log("------ NEXT QUESTION ------")
    setSumbitClicked(prev => !prev);
    setCount(prev => prev + 1)
    fetchQuestion()
  }

  /* DEBUGGING */
  // console.log(`game started: ${gameStarted}`)

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
            <div className="points-container">
              <div className="mini-tiger">
              </div>
            </div>
            {fetchQuestion()}
          </div>


          {/* control buttons */}
          < ButtonControls 
              handleExit = {toggleStartGame}
              handleSubmit = {checkAnswer}
              handleNext = {renderNext}
              answered = {selectedAnswer.length > 0 ? true : false}
              submitted = {submitClicked}
          />
        </>
      }
      

    </>
  )
}

export default App
