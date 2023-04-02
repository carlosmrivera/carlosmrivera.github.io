import Pokedex from "../Pokedex";
import "./Pokegame.css";

const Pokegame = ({ pokemons }) => {

    // Fisher-Yates (aka Knuth) Shuffle.
    // https://stackoverflow.com/a/2450976/15794964
    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    shuffle(pokemons);

    const handA = pokemons.slice(0,4);
    const handB = pokemons.slice(4);

    const powerA = handA.reduce((acc, pokemon) => acc + pokemon.base_experience, 0);
    const powerB = handB.reduce((acc, pokemon) => acc + pokemon.base_experience, 0);

    return (
        <div className="Pokegame">
            <h1 className="pokemon-text">Pokegame</h1>
            <Pokedex pokemons={handA} power={powerA} isWinner={powerA > powerB} />
            <h2 className="pokemon-text">VS</h2>
            <Pokedex pokemons={handB} power={powerB} isWinner={powerB > powerA}/>            
        </div>
    );
};

export default Pokegame;