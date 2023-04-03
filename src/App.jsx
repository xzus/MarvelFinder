import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { Link } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
function App() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState(null)
  const [display, setDisplay] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [average, setAverage] = useState(0)
  const [most, setMost] = useState(0)
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  const handleSubmit = async (event) => {
    await axios.get('https://gateway.marvel.com:443/v1/public/characters?apikey=4a1484284f785bd7064ed713cb1e5a51&limit=100&nameStartsWith=' + search)
    .then(res => {
      console.log(res.data)
      setList(res.data)
      setDisplay(res.data)
      setLoaded(true)
    })
    event.preventDefault();
  }

  const averageAppearances = () =>{
    if(display === null)
    {
      return
    }

    let sum = 0
    let len = display.data.results.length
    for(const c of display.data.results){
      sum += c.comics.available
    }
    setAverage(Math.ceil(sum/len)) 
  }
  const mostAppearances = () =>{
    if(display === null)
    {
      return
    }

    let curMost = 0
    for(const c of display.data.results){
      if( c.comics.available >= curMost){
        curMost =  c.comics.available
      }
    }
    setMost(curMost)
  }

  const withDescription = () =>{
    if(display === null)
    {
      return
    }
  }

  const generateData = () => {
    if(display === null)
    {
      return
    }
    let tempData = []
    for(const c of display.data.results){
      if(c.comics.available > 0){
        let curData = {
          name: c.name,
          appearances: c.comics.available
        }
        tempData.push(curData)
      }
      
    }
    tempData.sort((a,b) => b.appearances - a.appearances);
    setData(tempData)
  }

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(search)
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://gateway.marvel.com:443/v1/public/characters?apikey=4a1484284f785bd7064ed713cb1e5a51&limit=100')
      .then(res => {
        console.log(res.data)
        setList(res.data)
        setDisplay(res.data)
        setLoaded(true)
      })
    };
    fetchData()
    console.log(list)
  }, []);

  useEffect(() => {
    averageAppearances()
    mostAppearances()
    generateData()
  },[display])
  return (
    <div className="App">
      <h1>Marvel Character Stats</h1>
        {list && <div>
        <h2> No. Character: {display.data.results.length}</h2>
        <h2> Average comic appearances/character: {average}</h2>
        <h2> Most comic appearances/character: {most}</h2>
        <BarChart
          width={1200}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="appearances" fill="#8884d8" />
        </BarChart>
        </div>
        }
        <input
    type="text"
    placeholder="Search here"
    onChange={handleChange}
      value={search} />
      <button onClick={handleSubmit}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Available Comics</th>
            <th>Character Description</th>
          </tr>
        </thead>
      <tbody>
        {loaded && display.data.results.map( (c) => 
        <tr>
          <td>{c.name}</td>
          <td>{c.comics.available}</td>
          <td>{c.description}</td>
          <td><Link
            to={`/character/${c.id}`}
            key={c.id}
            >
          Details<span className="tab"></span>
          </Link></td>
        </tr>
        )}
      </tbody>
      </table>

    </div>
  )
}

export default App
