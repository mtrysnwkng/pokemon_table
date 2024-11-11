import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchPokeDetails = async (url) => {
  return await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => err.message);
};

const PokeDetails = ({ pokeurl, borderstyle }) => {
  const { isLoading, isError, data, error } = useQuery(
    ["pokedetails", pokeurl],
    () => fetchPokeDetails(pokeurl)
  );

  if (isLoading) return <td>loading...</td>;
  if (isError) return <td>something went wrong...{error.message}</td>;

  return (
    <>
      <td className="border-2 w-4 h-4">
        <img src={data?.sprites.front_default} />
      </td>
      <td className={borderstyle}>
        {data?.abilities.map((pokedetails, index) =>
          data?.abilities.length - 1 !== index ? (
            <span key={index}>{pokedetails?.ability?.name},&nbsp;</span>
          ) : (
            <span key={index}>{pokedetails?.ability?.name}</span>
          )
        )}
      </td>
      <td className={borderstyle}>
        {data?.types.map((pokedetails, index) =>
          data?.types.length - 1 !== index ? (
            <span key={index}>{pokedetails?.type?.name},&nbsp;</span>
          ) : (
            <span key={index}>{pokedetails?.type?.name}</span>
          )
        )}
      </td>
    </>
  );
};

export default PokeDetails;
