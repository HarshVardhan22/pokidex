import "./App.css";
import { useState, useEffect } from "react";
import Card from "./Components/Card";
export default function App() {
  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);

  const [pokiResult, setPokiResult] = useState();
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=200&limit=${limit}`
  );

  const compareByName = (a, b) => {
    if (a.name > b.name) return 1;
    else if (a.name < b.name) return -1;
    return 0;
  };

  const handleSort = () => {
    let tempArray = [...pokiResult];
    tempArray.sort(compareByName);
    setPokiResult(tempArray);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
    applyLimit(e.target.value);
  };

  const applyLimit = (limit) => {
    let indexOfLimit = url.indexOf("limit=");
    let str = url.substring(0, indexOfLimit);
    console.log(str + `limit=${limit}`);
    setUrl(url.substring(0, indexOfLimit) + `limit=${limit}`);
  };

  const fetchData = async () => {
    const res = await fetch(url);
    const dataFetched = await res.json();
    setData(dataFetched);
    setPokiResult(dataFetched.results);
  };

  const next = () => {
    setUrl(data?.next);
  };

  const prev = () => {
    setUrl(data?.previous);
  };

  useEffect(() => {
    fetchData();
  }, [limit, url]);

  return (
    <div className="App">
      <div className="app__hero">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
        <button onClick={handleSort}>Sort By Name</button>

        <select onChange={handleLimit}>
          <option value="">Select number of pokemon</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="app__cardContainer">
        {pokiResult?.map((item, index) => {
          return <Card key={index} url={item.url} />;
        })}
      </div>
      <footer>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </footer>
    </div>
  );
}
