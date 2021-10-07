import React, { useState } from "react";
import "./Details.css";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Details = () => {
  const location = useLocation();
  const [pokemonSelected, setPokemonSelected] = useState(location.state);
  const [values, setValues] = useState(
    pokemonSelected.sprites
      ? Object.values(pokemonSelected.sprites).filter(
          (item) => typeof item === "string"
        )
      : []
  );
  const [index, setIndex] = useState(0);
  const abilities = pokemonSelected.abilities 
  console.log(abilities[0].ability.name)//ablities[0].ability.name
  console.log(pokemonSelected);
  return (
    <div className="details__main">
      <div className="details">
        <div className="details__container">
          <div className="details__left">
            <img src={values[index]} alt={pokemonSelected.name} />
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              onClick={(e) => {
                setIndex(index + 1);
              }}
              disabled={index === values.length - 1 ? true : false}
            >
              Next Image
            </Button>

            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              onClick={(e) => {
                setIndex(index - 1);
              }}
              disabled={index === 0 ? true : false}
            >
              Prev Image
            </Button>
          </div>
          <div className="details__right">
            {" "}
            <h3>Name : {pokemonSelected.name}</h3>
            <h3>Height : {pokemonSelected.height}</h3>
            <h3>Weight : {pokemonSelected.weight}</h3>
          </div>
        </div>
        <Link to="/">
          <Button variant="contained" size="small" sx={{ mt: 2 }}>
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Details;
