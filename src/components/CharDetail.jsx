import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
const CharDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    console.log(params.id)
    useEffect(() => {
        const fetchData = async () => {
          await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${params.id}?apikey=4a1484284f785bd7064ed713cb1e5a51&limit=100`)
          .then(res => {
            console.log(res.data)
            setFullDetails(res.data)
          })
        };
        fetchData().catch(console.error);
        console.log(fullDetails)
      }, []);
    return(
        <div>
            <table>
  <tbody> 
    <tr>
      <th>Character Name </th>
      <td>{fullDetails && fullDetails.data.results[0].name} </td>
    </tr>
    <tr>
      <th>Character Description </th>
      <td>{fullDetails && fullDetails.data.results[0].description} </td>
    </tr>
    <tr>
      <th>Available Comics </th>
      <td>{fullDetails && fullDetails.data.results[0].comics.available} </td>
    </tr>
    <tr>
      <th>Available Series </th>
      <td>{fullDetails && fullDetails.data.results[0].series.available} </td>
    </tr>
    <tr>
      <th>Available Stories </th>
      <td>{fullDetails && fullDetails.data.results[0].stories.available} </td>
    </tr>
  </tbody>
</table>

        </div>
    );
};
export default CharDetail;