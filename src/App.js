import "./App.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import PokiCard from "./Components/PokiCard";
import Details from "./Components/Details";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
export default function App() {
  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [inputValue, setInputValue] = useState();
  const [pokiResult, setPokiResult] = useState();
  // eslint-disable-next-line
  const [pokemon, setPokemon] = useState();
  const history = useHistory();


  //url used to fetch the pokemon
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=200&limit=${limit}`
  );

  //function to fetch details of a single pokemon
  const fetchPokemon = async (inputURL) => {
    const res = await fetch(inputURL);
    const data = await res.json();
    return data;
  };


  //using this function to useHistory to route toa diff page 
  //and also transfer the details fetched from the fetchPokemon fuction
  const routeToDetails = async (e) => {
    console.log(e.target)
    const dataFetched = await fetchPokemon(e.target.id);
  history.push({ pathname: "/details", state: dataFetched });
  };


  //using this fn as a custom comparator function, that will be
  //used to compare two pokemons by name property
  const compareByName = (a, b) => {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    return 0;
  };


  //this fn is used tohandle sorting
  //later planning to make this a genric function to sort
  //using other attributes as well like weight, height
  const handleSort = () => {
    let tempArray = [...pokiResult];
    tempArray.sort(compareByName);
    setPokiResult(tempArray);
  };


  //this fn is taking input from user and then using the function applyLimit
  const handleLimit = (e) => {
    setLimit(e.target.value);
    applyLimit(e.target.value);
  };


  //1. take "limit" as parameter
  //2. find whether the current state of url has "limit="
  //3.a if(yes) => extract the string before "limit="
  //3.b add  "limit= {value recieved as paramater}" in the end of the extracted string

  const applyLimit = (limit) => {
    let indexOfLimit = url.indexOf("limit=");
    if (indexOfLimit !== -1) {
      setUrl(url.substring(0, indexOfLimit) + `limit=${limit}`);
    }
  };

  //in pokeAPI searching by name has a different URL structure
  //so we need to change the complete URL before making a fetch call
  const searchByName = async (e) => {
    e.preventDefault();
    setUrl(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
  };



//fetching data from URL
  const fetchData = async () => {
    const res = await fetch(url);
    const dataFetched = await res.json();
    setData(dataFetched);

    if (dataFetched.results !== undefined) {
      setPokiResult(dataFetched.results);
    } else {
      //if dataFetched.results is not there trhat means user has :
      //1.searched a pokemon by name or 
      //2. user has clicked
      history.push({ pathname: "/details", state: dataFetched });
    }
  };

  const next = () => {
    setUrl(data?.next);
  };

  const prev = () => {
    setUrl(data?.previous);
    };

  useEffect(() => {
  
    fetchData();
    // eslint-disable-next-line
  }, [limit, url]);

  return (
    <div className="App">
      <div className="app__navbar">
 
        <form sx={{ minWidth: "300px", mt: 2 }} onSubmit={searchByName}>
          <TextField
            type="text"
            size="small"
            onChange={(e) => setInputValue(e.target.value)}
            label="Enter name of pokemon"
            variant="outlined"
          />
          <SearchOutlinedIcon sx={{mt: 1, ml:1 }} onClick={searchByName}/>
        </form>

    
        <FormControl sx={{ minWidth: "300px", mt: 2 }}>
          <InputLabel size="small">Select number of pokemons</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            label="Select number of pokemon"
            onChange={handleLimit}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={50}>Fifty</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" size="small" sx={{ mt: 2 }} onClick={handleSort}>
          Sort By Name
        </Button>
      </div>
      <div className="app__right">
        <div>
          <Button variant="contained" size="small" sx={{ mt: 2, mr:5 }} onClick={prev}>Prev</Button>
          <Button variant="contained" size="small" sx={{ mt: 2, ml:5 }} onClick={next}>Next</Button>
        </div>

        <div className="app__cardContainer" onClick = {routeToDetails} >
          {pokiResult?.map((item, index) => {
            return <div >
            <PokiCard key={index} routeToDetails={routeToDetails}  id={item.url} url={item.url} />
            </div>
            
          })}
        </div>
        <footer>
          <Button variant="contained" size="small" sx={{ mb: 2, mr:5 }} onClick={prev}>Prev</Button>
          <Button variant="contained" size="small" sx={{ mb: 2, ml:5 }} onClick={next}>Next</Button>
        </footer>
      </div>

      {pokemon && <Details pokemon={pokemon} />}
    </div>
  );
}
