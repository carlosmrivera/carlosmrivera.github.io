import { useState } from "react"
import './styles.css'
import ResetBtn from "./ResetBtn"
import CounterTable from "./CounterTable";

const EightBall = ({ answers }) => {
    const defaultAnswer = {
        msg: "Think of a Question",
        color: "black"
    };

    const [answer, setAnswer] = useState(defaultAnswer)
    const [counter, setCounter] = useState({})

    const handleClick = () => {
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)]
        setAnswer(randomAnswer)
        setCounter(prev => {
            const color = randomAnswer.color
            return {
                ...prev,
                [color]: prev[color] ? prev[color] + 1 : 1
            }
        })
    }

    const handleReset = () => {
        setAnswer(defaultAnswer)
        setCounter({})
    }

    return (
        <>
            <CounterTable {...counter} />
            
            <div className="Eightball" style={{backgroundColor: answer.color}} onClick={handleClick}>
                <div className="EightBall-container" >
                    <p className="EightBall-text">{answer.msg}</p>
                </div>
            </div>

            <ResetBtn setDefaultState={handleReset} />
        </>
        
    )
}

export default EightBall