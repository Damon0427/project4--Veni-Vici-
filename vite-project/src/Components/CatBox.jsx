    /* eslint-disable react/prop-types */
    import React from "react";

    const CatBox = ({ cat, onclick }) => {
        if (!cat) {
            return(
                <div>
                <h2> 🐈 Simple Click And Get Start!!!  </h2> 
                </div>
            )
        }
    return (
        <div className="cat-box">
        <h2>{cat.data.name}</h2>
            <div className="buttons-Container"> 
                <button onClick={() => onclick('adaptability', cat.data.adaptability)}>Adaptability: {cat.data.adaptability}</button>
                <button onClick= {() => onclick('lifeSpan',cat.data.lifeSpan)}>Life Span: {cat.data.lifeSpan} years</button>
                <button onClick= {() => onclick('weight',cat.data.weight)}>Weight: {cat.data.weight} lbs</button>
                <button onClick= {() => onclick('energy_level',cat.data.energy_level)}>energy_level: {cat.data.energy_level} </button>
                <button onClick= {() => onclick('child_friendly',cat.data.child_friendly)}>Child Friendly: {cat.data.child_friendly}</button>
        </div>
        <img className="cat-image" src={cat.image} alt={cat.data.name} loading="lazy" />
        <p>{cat.data.description}</p>

        </div>
    );
    }

    export default CatBox;