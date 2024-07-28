import { useState , useEffect } from 'react'
import './App.css'
import axios from "axios";
function App() {
  //const [count, setCount] = useState(0)
  const [countries,setCountries] = useState([]);
  const [states,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [selectCountry,setSelectedCountry] = useState("");
  const [selectState,setSelectedState] = useState("");
  const [selectCity,setSelectedCity] = useState("");
  useEffect(()=>{
    axios.get('https://crio-location-selector.onrender.com/countries')
    .then(res =>{ 
      setCountries(res.data);
    }).catch(error =>{
      console.error("Error fetching countries:",error);
    })
  },[]);
  useEffect(()=>{
    if(selectCountry){
      axios.get(`https://crio-location-selector.onrender.com/country=${selectCountry}/states`)
      .then((res)=>{
        setStates(res.data);
        setSelectedState("");
        setCities([]);
        setSelectedCity("");
      })
      .catch(error =>{
        console.error("Error fetching states:",error);
      })
    }
  },[selectCountry])
  useEffect(()=>{
    if(selectCountry && selectState){
      axios.get(`https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`)
      .then((res)=>{
        setCities(res.data);
        setSelectedCity("");
      })
      .catch(error =>{
        console.error("Error fetching cities:",error);
      })
    }
  },[selectCountry,selectState])
  return (
    <div className='city-selector'>
      <h1>Select Location</h1>
      <div className='dropdowns'>
        <select
        value={selectCountry}
        onChange={(e)=> setSelectedCountry(e.target.value)}
        className='dropdown'
        >
          <option value="" disabled>
              Select Country
          </option>
          {countries.map((country)=>{
            return (<option key={country} value={country}>
              {country}
            </option>)
          })}
        </select>
        <select value={selectState}
        onChange={(e)=> setSelectedState(e.target.value)}
        disabled={!selectCountry}
        className='dropdown'
        >
           <option value="" disabled>
              Select State
          </option>
          {states.map((state)=>{
            return (<option key={state} value={state}>
              {state}
            </option>)
          })}
        </select>
        <select value={selectCity}
        onChange={(e)=> setSelectedCity(e.target.value)}
        disabled={!selectState}
        className='dropdown'
        >
           <option value="" disabled>
              Select City
          </option>
          {cities.map((city)=>{
           return ( <option key={city} value={city}>
              {city}
            </option>)
          })}
        </select>
      </div>
      {selectCity && 
      (<h2 className='result'>
        You selected <span className='highlight'>{selectCity}</span>,
        <span className='fade'>{" "}
          {selectState}, {selectCountry}
        </span>
      </h2>)}
    </div>
  )
}

export default App
