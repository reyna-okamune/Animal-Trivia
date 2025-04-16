import { useState, useEffect } from 'react'
import axios from 'axios' // otdb api fetching
import './App.css'

function App() {

  const [triviaQuestions, setTriviaQuestions] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  /* FETCHING OPEN TRIVIA API DATA */
  async function fetchTriviaData() {
    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=27&type=multiple")
    setTriviaQuestions(response.data.results)

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

  /* GAME FUNCTION HANDLING */
  function toggleStartGame() {
    setGameStarted(prev => !prev)
    fetchTriviaData()
  }

  /* DEBUGGING */
  console.log(gameStarted)

  return (
    <>
    
      {/* landing page */}
      <header className='header'>
        <h1>Animal Trivia</h1>
        <p>Test Your Animal Knowledge</p>
      </header>
      <div className="landing-tiger">
        {!gameStarted && <img src="/free-tiger-image.png" alt="tiger-img"/>}
      </div>

      <div className='button-container'>
        {!gameStarted && <button className='start' onClick={toggleStartGame}>Start Game</button>}
      </div>

    </>
  )
}

export default App
