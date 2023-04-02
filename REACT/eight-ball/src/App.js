import EightBall from './components/EightBall';
import answers from './answers';

const App = () => {
    return (
        <>
            <EightBall answers={answers} />
        </>
    )
}

export default App;
