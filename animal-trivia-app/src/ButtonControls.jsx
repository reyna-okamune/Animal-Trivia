export default function ButtonControls(props) {

    // console.log(`answered: ${props.answered}`)
    // console.log(`submitted: ${props.submitted}`)
    // hard coding last question value
    const last = 9;
    // console.log(`count: ${props.count}`)
    return (
        <>
            <div className="fade-in">
                { props.count > last ?

                    <div className="control-buttons">
                        <button className='exit' onClick={props.handleExit}>Exit Game</button>
                        <button className='new' onClick={props.handleNew}>New Game</button>
                    </div>

                    :
                    
                    <div className="control-buttons">
                        <button className='exit' onClick={props.handleExit}>Exit Game</button>
                            { props.submitted ?
                                <button className='next' onClick={props.handleNext}>{props.count >= last ? "See Final Score" : "Next Question"}</button>
                                :
                                <button className='submit' onClick={props.handleSubmit}>Submit Answer</button>
                            }

                    </div>
                }
            </div>
        </>
    )
}