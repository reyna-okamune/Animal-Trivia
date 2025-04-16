import React from "react"
export default function Question(props) {

    const [answers, setAnswers] = React.useState([...props.incorrectAnswers, props.correctAnswer])

    console.log(`all answer options: ${answers}`)
    return (
        <>
            <p>{props.question}</p>

            <ul>
                {answers.map((item, index) => {
                    return (
                        <p key={index}>{item}</p>
                    )
                })}
            </ul>
        </>
        
    )
}