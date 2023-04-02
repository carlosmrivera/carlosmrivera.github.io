import Pokegame from './components/Pokegame';
import pokemons from './data/pokemons.js';

const App = () => {
    return (
        <>
            <div className='bg'></div>
            <div className='bg bg2'></div>
            <div className='bg bg3'></div>
            <Pokegame pokemons={pokemons} />
        </>
    );
};

export default App;