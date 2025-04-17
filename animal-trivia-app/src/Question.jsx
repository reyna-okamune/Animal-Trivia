import {useState, useEffect} from "react"
import "./Question.css"
export default function Question(props) {

    const [selectedOption, setSelectedOption] = useState('');
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const allAnswers = [...props.incorrectAnswers, props.correctAnswer];
        const shuffled = allAnswers.sort(() => Math.random() - 0.5);
        setAnswers(shuffled);
        setSelectedOption('');
    }, [props.incorrectAnswers, props.correctAnswer])


    const handleOptionChange = (event) => {
        const chosen = event.target.value;
        setSelectedOption(chosen);
        props.onAnswerSelect(chosen);
        // console.log(chosen);
    };

    console.log(`all answer options: ${answers}`)
    /* if (selectedOption.length > 0) {
        // console.log(`selected option: ${selectedOption}`)
        console.log(`correct answer: ${props.correctAnswer}`)
    } */
    
    return (
        <>
            <div className="question-header">
                <h2 className="question">Q{props.number + 1}.</h2>
                <h2 className="question">{props.question}</h2>
            </div>

            <div className="answer-list">
                {answers.map((item, index) => {
                    return (
                        <label key={index} className="choice">
                            <input 
                                type="radio" 
                                className="radio-button" 
                                name="choice-item" 
                                value={item} 
                                checked = {selectedOption === item}
                                onChange={handleOptionChange}
                            />
                            {item}
                        </label>
                    )
                })}
            </div>
        </>
        
    )
}