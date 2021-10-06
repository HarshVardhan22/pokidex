import React, { useState } from "react";
import "./Details.css";

const Details = (pokemon) => {
  const [images, setImages] = useState(pokemon.pokemon?.sprites);
  const [keys, setKeys] = useState(pokemon.pokemon.sprites?Object.keys(pokemon.pokemon.sprites):[]);
  const [index, setIndex] = useState(0);
  console.log(images,keys)
  return (
    <div className="details">
      <button
        onClick={(e) => {
          setIndex(index + 1);
        }}
        disabled={index === keys.length - 1 ? true : false}
      >
        Next Image
      </button>
      <img src={images[keys[index]]} alt={pokemon.pokemon.name} />
      <button
        onClick={(e) => {
          setIndex(index + 1);
        }}
        disabled={index === 0 ? true : false}
      >
        Prev Image
      </button>
      <h3>Name : {pokemon.pokemon.name}</h3>

      <h3>Height : {pokemon.pokemon.height}</h3>
      <h3>Weight : {pokemon.pokemon.weight}</h3>
    </div>
  );
};

export default Details;
