const ResetBtn = ({ setDefaultState }) => {

    const handleClick = (e) => {
        e.preventDefault()
        setDefaultState && setDefaultState()
    }

    return (
        <div>
            <a href="/" className="EightBall-reset" onClick={handleClick}>Reset</a>
        </div>
    )
}

export default ResetBtn