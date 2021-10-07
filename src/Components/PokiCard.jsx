import React, { useEffect, useState } from "react";
import "./Card.css";

import { Button, CardActions } from "@mui/material";

const PokiCard = ({ id, url }) => {
  const [pokiData, setPokiData] = useState();

  const fetchPokiData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data)
    setPokiData(data);
  };
  useEffect(() => {
    
    fetchPokiData();
    // eslint-disable-next-line
  }, [url]);
  return (
    <div className="card">
      <img
        src={pokiData?.sprites.front_default}
        alt="sss"
        className="pokiCard__img"
      />

     
     
      <h3>{pokiData?.name}</h3>
        <p style={{ fontSize: "18px" }}>
          Height: {pokiData?.height} <br /> Weight: {pokiData?.weight}
        </p>
        {pokiData?.abilities.map((item, index) => {
          return (
            <span style={{ fontSize: "14px" }} key={index}>
              Ability {++index} : {item.ability.name}
              <br />
            </span>
          );
        })}
        <CardActions>
        <Button size="small" variant="contained" id={id}>
          Learn More
        </Button>
      </CardActions>


      
    </div>
  );
};

export default PokiCard;
