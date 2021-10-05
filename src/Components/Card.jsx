import React, {useEffect, useState} from 'react'
import "./Card.css"

const Card = ({url}) => {
    const [pokiData,setPokiData] = useState()

    const fetchPokiData = async ()=> {
        const res = await fetch(url);
        const data = await res.json();
        //console.log(data)
        setPokiData(data)
    }
    useEffect(()=>{
        fetchPokiData()
    },[url])
    return (
        <div className="card">
            <div className="card__img">
                <img src={pokiData?.sprites.front_default} alt="" />
            </div>
            <div className="card__details">
                <p>Name: {pokiData?.name}</p>
                <p>Height: {pokiData?.height}</p>
                <p>Weight: {pokiData?.weight}</p>
                {pokiData?.abilities.map((item,index)=>{
                    return <p key={index}>Ability {++index} : {item.ability.name}</p>
                })}
            </div>
        </div>
    )
}

export default Card
