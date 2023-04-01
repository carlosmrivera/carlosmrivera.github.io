/*
    Create a component called Person. Inside of this component, render a p tag which displays 
    “Learn some information about this person”. Each person should have name and age properties.

    If the person is over 18 years old, display an additional h3 that says “please go vote!”. 
    Otherwise, display an h3 that says “you must be 18”. If the person’s name is longer than 8 characters, 
    only display the first six characters of their name.

    Add a property called hobbies to your Person component that accepts an array of 
    hobbies (an array of strings). Your Person component should list each one of these hobbies as an li.

    Add an App component that renders at least three copies of the Person component on the page.
*/

const Person = ({ name, age, hobbies = [] }) => {
    return (
        <div>
            <p>Learn some information about this person</p>
            <h3>{age >= 18 ? "please go vote!" : "you must be 18"}</h3>
            <h3>{name.length > 8 ? name.slice(0, 6) : name}</h3>
            {hobbies.length > 0 ? (
                <ul>
                    {hobbies.map(hobby => <Hobby hobby={hobby} />)}
                </ul>
            ) :
                <p>Looks like {name} is a boring person as doesn't has any hobby.</p>
            }
                
        </div>
    )
}

const Hobby = ({ hobby }) => {
    return (
        <li>{hobby}</li>
    )
}

const App = () => {
    return (
        <div>
            <Person name="John" age={21} hobbies={["gaming", "coding", "reading"]} />
            <Person name="Jane" age={17}  />
            <Person name="Jack" age={19} hobbies={["gaming", "coding", "reading"]} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));