import Pokecard from "../Pokecard";
import "./Pokedex.css";

const Pokedex = ({ pokemons }) => {

    return (
        <div className="Pokedex">
            <h1>Pokedex</h1>
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
                
        </div>
    );

};

export default Pokedex;