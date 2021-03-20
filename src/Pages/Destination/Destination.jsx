import React, { useState } from 'react';
import { useParams } from 'react-router';
import Map from '../../Components/Map/Map';
import MapArea from '../../Components/MapArea/MapArea';
import RouteView from '../../Components/RouteView/RouteView';
import SearchForm from '../../Components/SearchForm/SearchForm';
import './Destination.css'
const Destination = () => {
    const {id} = useParams();
    const [direction, setDirection] = useState(null);
    return (
        <div className="destination">
            <div className="sidebar">
                {
                    direction ?
                    <RouteView id={id} direction={direction} setDirection={setDirection} />
                    :
                    <SearchForm setDirection={setDirection}/>
                }
            </div>
            <div className="map-area">
                <Map />
            </div>
        </div>
    );
};

export default Destination;