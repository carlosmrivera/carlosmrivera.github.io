import './Pokecard.css'

const Pokecard = ({ id, name, type, base_experience: baseExperience}) => {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;

    return (
        <div className='Pokecard'>
            <h2>{name}</h2>
            <p>Type: {type}</p>
            <p>EXP: {baseExperience}</p>
            <img src={url} alt={`${name} card!`} className='Pokecard-img' />
        </div>
    )

};

export default Pokecard;