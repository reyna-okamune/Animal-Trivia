import { useState, useEffect } from 'react'
import axios from 'axios' // otdb api fetching
import './App.css'

function App() {

  const [triviaQuestions, setTriviaQuestions] = useState([])

  /* FETCHING OPEN TRIVIA API DATA */
  async function fetchTriviaData() {
    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=27&type=multiple")
    setTriviaQuestions(response.data.results)

  }

  useEffect(() => {
    fetchTriviaData();
  }, [])


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

  /* DEBUGGING */
  console.log(triviaQuestions)
  return (
    <>
    
    </>
  )
}

export default App
