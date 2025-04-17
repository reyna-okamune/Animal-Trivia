import React from "react"
import "./Question.css"
export default function Question(props) {
    
    console.log(`all answer options before sort: ${props.answers}`)

    return (
        <>
            <h2 className="question">{props.question}</h2>

            <ul className="answer-list">
                {props.answers.map((item, index) => {
                    return (
                        <li key={index} className="choice">{item}</li>
                    )
                })}
            </ul>
        </>
        
    )
}