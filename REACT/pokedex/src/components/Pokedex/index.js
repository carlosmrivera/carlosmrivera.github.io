import Pokecard from "../Pokecard";
import "./Pokedex.css";

const Pokedex = ({ pokemons, power, isWinner }) => {

    return (
        <div className={`Pokedex ${isWinner && 'Pokedex-winner'}`}>
            <h5 className="pokemon-text">
                Power: {power}
            </h5>
            <div className="Pokedex-container">
                
                {pokemons.map(pokemon => (
                    <Pokecard
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        type={pokemon.type}
                        base_experience={pokemon.base_experience}
                    />
                ))}
            </div>
            {
                isWinner && <h5 className="pokemon-text ls-3">THIS HAND WINS!</h5>
            }
                
        </div>
    );

};

export default Pokedex;