/*
    Define a Tweet component which takes as props the username of the user who wrote the tweet, 
    the name of the user who wrote the tweet, the date of the tweet, and the message being tweeted.

    Create an App component that renders at least three tweets.

    Style your Tweet component using a CSS class.
*/

const tweets = [
    {
        username: 'carlos',
        name: 'Carlos',
        date: '2020-01-01',
        message: 'This is my first tweet'
    },
    {
        username: 'jane',
        name: 'Jane',
        date: '2020-01-02',
        message: 'This is my second tweet'
    },
    {
        username: 'john',
        name: 'John',
        date: '2020-01-03',
        message: 'This is my third tweet'
    }
]

const Tweet = ({ username, name, date, message }) => {
    return (
        <div className="tweet">
            <h3>{name}</h3>
            <p>@{username} - {date}</p>
            <p>{message}</p>
        </div>
    );
}

const App = () => {
    return (
        <div>
            {tweets.map(tweet => <Tweet key={tweet.username} {...tweet} />)}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));