export default function LandingPage(props) {
    return (
        <>
            <div className="fade-in">
                <div className="landing-tiger">
                    <img src="/free-tiger-image.png" alt="tiger-img"/>
                </div>

                <div className='start-button-container'>
                    <button className='start' onClick={props.handleClick}>Start Game</button>
                </div>
            </div>
      </>

    )
}