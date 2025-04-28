import { useState, useEffect } from 'react'
import axios from 'axios' // otdb api fetching
import './App.css'
import LandingPage from './LandingPage.jsx'
import Question from "./Question.jsx"
import ButtonControls from "./ButtonControls.jsx"
import Confetti from 'react-confetti'

function App() {

  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [count, setCount] = useState(0)
  const [points, setPoints] = useState(0)
  const [submitClicked, setSumbitClicked] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [feedback, setFeedback]= useState("")
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  /* WINDOW RESIZE */
  useEffect(() => {
    function handleResize() {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    }
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* FETCHING OPEN TRIVIA API DATA */
  async function fetchTriviaData() {
    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=27&type=multiple")
    setTriviaQuestions(response.data.results)
  }
  
  /* GAME FUNCTION HANDLING */
  function toggleStartGame() {
    if (gameStarted) {
      resetGame();
      setGameStarted(false);
    } else {
      fetchTriviaData();
      setGameStarted(true);
    }
  }
  

  useEffect(() => {
    if (count === triviaQuestions.length && triviaQuestions.length > 0) {
      setGameFinished(true);
    }
  }, [count, triviaQuestions]);
  


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
    // console.log(`answer selected: ${answer}`)
  }

  const fetchQuestion = () => {
    if (triviaQuestions.length > 0 && count < triviaQuestions.length) {
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
            number={number}
            submitted={submitClicked}
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
        setFeedback(`Correct! It's ${selectedAnswer}! ˙ᵕ˙`)
        // console.log("correct!")
      }
      else {
        setFeedback(`Incorrect! It's ${correctAnswer}! °՞(ᗒᗣᗕ)՞°`)
        // console.log("incorrect!")
      }
    }

    else {
      setFeedback("Please Sumbit Answer! ( ｡ •̀ ᴖ •́ ｡)💢")
      // console.log("you must submit answer!");
      return;
    }
  }

  function renderNext() {
    if (!submitClicked) return;

    setSumbitClicked(false);
    setSelectedAnswer(""); 
    setFeedback("");

    // Move to next question
    setCount(prev => prev + 1);
  }

  async function renderNewGame() {
    resetGame();
    await fetchTriviaData();
    setGameStarted(true);
  }

  function resetGame() {
    setCount(0);
    setPoints(0);
    setCount(0);
    setPoints(0);
    setSelectedAnswer("");
    setSumbitClicked(false);
    setGameFinished(false);
    setFeedback("");
    setTriviaQuestions([]);
  }

  /* DEBUGGING */
  console.log("--------------------------")
  console.log(`game started: ${gameStarted}`)
  console.log(`game finished: ${gameFinished}`)
  console.log(`question ${count}`)
  console.log(`points ${points}`)
  console.log(`feedback ${feedback}`)
  console.log("--------------------------")

  return (
    <>
    
      <header className='header'>
        <h1>Animal Trivia</h1>
        <p>Test Your Animal Knowledge</p>
      </header>

      {/* landing page */}
      {!gameStarted && < LandingPage handleClick={toggleStartGame}/>}
      
      {/* quiz page */}
      { (gameStarted && !gameFinished) && 
          <div>
            <div className='quiz-container'>
              {!gameFinished && fetchQuestion()}
            </div>

            <div className="feedback-container">
              {submitClicked ? <p>{feedback}</p> : <p> </p>}
            </div>
          </div>
      }

      {/* results once game is finished */}
      {gameFinished &&
        <>
          
          <div className="results-container">
            <h1>Final Score</h1>
            <h2>{points}</h2>
          </div>
        </>
      }

      {gameStarted &&
        <>
          {/* control buttons */}
          < ButtonControls 
            handleExit = {toggleStartGame}
            handleSubmit = {checkAnswer}
            handleNext = {renderNext}
            handleNew ={renderNewGame}
            answered = {selectedAnswer.length > 0 ? true : false}
            submitted = {submitClicked}
            count = {count}
            className='button-menu'
          />
      </>
      }

      


      

    </>
  )
}

export default App
