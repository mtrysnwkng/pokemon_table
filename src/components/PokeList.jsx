import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import PokeDetails from "./PokeDetails";

const border = "border-2 pl-2 bg-slate-400 font-bold";
const borderstyle = "border-2 px-2";

const fetchPokeList = async () => {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    .then((res) => res.data)
    .catch((err) => err.message);
};

const PokeList = () => {
  const { isLoading, isError, data, error } = useQuery("pokes", () =>
    fetchPokeList()
  );

  if (isLoading) return <>loading...</>;
  if (isError) return <>something went wrong...{error.message}</>;

  return (
    <>
      PokeList
      <table>
        <thead>
          <tr>
            <td className={border}>name</td>
            <td className={border}>avatar</td>
            <td className={border}>abilities</td>
            <td className={border}>types</td>
          </tr>
        </thead>
        <tbody>
          {data?.results.map((poke) => (
            <tr key={poke.name}>
              <td className={borderstyle}>{poke.name}</td>
              <PokeDetails pokeurl={poke.url} borderstyle={borderstyle} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PokeList;
