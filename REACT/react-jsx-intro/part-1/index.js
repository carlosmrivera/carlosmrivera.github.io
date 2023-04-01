const FirstComponent = () => {
    return <h1>My very first component</h1>;
}

const NamedComponent = ({ name }) => {
    return <h1>My name is {name}</h1>;
}

const App = () => {
    return (
        <div>
            <FirstComponent />
            <NamedComponent name={'Carlos'} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));