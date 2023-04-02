import Pokedex from './components/Pokedex/';
import pokemons from './data/pokemons.js';

const App = () => {
    return (
        <>
            <div className='bg'></div>
            <div className='bg bg2'></div>
            <div className='bg bg3'></div>
            <Pokedex pokemons={pokemons} />
        </>
    );
};

export default App;