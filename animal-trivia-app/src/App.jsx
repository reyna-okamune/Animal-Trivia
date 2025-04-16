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

  // on mount fetch the api data
  useEffect(() => {
    fetchTriviaData();
  }, [])

  /* DEBUGGING */
  console.log(triviaQuestions)
  return (
    <>
    
    </>
  )
}

export default App
