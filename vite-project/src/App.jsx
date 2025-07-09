import React from 'react'
import { useState } from 'react'
import CatBox from './Components/CatBox'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {
  const endpoint = 'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1'
  const [cat,setCat] = useState(null);
  const [banList,setBanList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ACCESS_KEY
        }
      }
      );
      const data = await response.json();
      if (data && data.length > 0 ){
          const catData = data[0];
          const breedData = catData.breeds[0];
          const simplfyCatData = {
            description: breedData.description,
            name: breedData.name,
            adaptability: breedData.adaptability,
            lifeSpan: breedData.life_span,
            weight: breedData.weight.imperial,
            child_friendly: breedData.child_friendly,
            energy_level: breedData.energy_level
          }
          const isBanned = banList.some(item => {
            return simplfyCatData[item.type] === item.value;
          });
          if (!isBanned) {
          setCat({
            image: catData.url,
            data:simplfyCatData
          });
        }else{
          fetchData(); // Fetch again if the cat is banned
        }

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };  
  const addBanList = (type , value) => {
    const element = {type, value}
    setBanList(prevBanList => { 
    const exists = prevBanList.some(item => item.type === type && item.value === value);
    if (!exists) {
      const newList = [...prevBanList, { type, value }];
      console.log('Ban List:', newList);
      return newList;
    }
    console.log('Already in Ban List:', element);
    return prevBanList;
  });
  };

  const removeBanList = (type, value) => {
    setBanList(prevList => prevList.filter(item => !(item.type === type && item.value === value)));
  };
  return (
    <>
      <div className="main-container">
      <h1>Find your favorite cat!! </h1>
      <div className="card">
        {(<CatBox cat = {cat} onclick = {addBanList} ></CatBox>
      
      )}
      </div>

      <button className='next-button' onClick={fetchData}>
          🐈 Next!
      </button>


      </div>
      <div className="ban-list">
        <h3>Banned Attributes:</h3>
        {banList.length === 0 && <p>No banned attributes yet.</p>}
        {banList.map((item, index) => (
          <button
            key={`${item.type}-${item.value}-${index}`}
            onClick={() => removeBanList(item.type, item.value)}
            className="ban-item"
          >
            {item.type}: {item.value} 
          </button>
        ))}
      </div>
      

    </>
  )
}

export default App
