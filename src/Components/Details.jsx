import React, { useState } from "react";
import "./Details.css";
import { useLocation } from "react-router";

const Details = (pokemon) => {
  
    const location = useLocation();
    const [pokemonSelected,setPokemonSelected] = useState(location.state)
    console.log(location.state)
  const [images, setImages] = useState(pokemonSelected?.sprites);
  const [values, setValues] = useState(pokemonSelected.sprites?Object.values(pokemonSelected.sprites).filter(item => typeof item === 'string'):[]);
  const [index, setIndex] = useState(0);
    console.log(values)
  return (
    <div className="details">
      <button
        onClick={(e) => {
          setIndex(index + 1);
        }}
        disabled={index === values.length - 1 ? true : false}
      >
        Next Image
      </button>
      <img src={values[index]} alt={pokemonSelected.name} />
      <button
        onClick={(e) => {
          setIndex(index - 1);
        }}
        disabled={index === 0 ? true : false}
      >
        Prev Image
      </button>
      <h3>Name : {pokemonSelected.name}</h3>

      <h3>Height : {pokemonSelected.height}</h3>
      <h3>Weight : {pokemonSelected.weight}</h3>
    </div>
  );
};

export default Details;
