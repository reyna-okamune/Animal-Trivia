export default function ButtonControls(props) {

    // console.log(`answered: ${props.answered}`)
    // console.log(`submitted: ${props.submitted}`)
    return (
        <>
            <div className="control-buttons">
                <button className='exit' onClick={props.handleExit}>Exit Game</button>
                { props.submitted ?
                    <button className='next' onClick={props.handleNext}>Next Question</button>
                    :
                    <button className='submit' onClick={props.handleSubmit}>Submit Answer</button>
                }

          </div>
        </>
    )
}