import React from 'react';
import { useState } from "react";
import ResultCard from '../ResultCard/ResultCard';
import './RouteView.css';
import vehicles from '../../data/data';

const RouteView = ({id,direction,setDirection}) => {
    const [{transportType,imgUrl,information}] = vehicles.filter(vehicle => vehicle.transportType === id);
    return (
            <div className="direction-section">
                <ul className="direction">
                    <li>{direction?.from}</li>
                    <li>{direction?.to}</li>
                </ul>
                <div className="results">
                    {
                        information.map(vehicle => <ResultCard key={vehicle.id} name={transportType} imgUrl={imgUrl} vehicle={vehicle}/>)
                    }
                </div>
                <button className="search-again" onClick={() => setDirection(null)}>Search Again</button>
            </div>
    );
}

export default RouteView;;