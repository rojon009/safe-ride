import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';


const Map = () => {
    const token = 'pk.eyJ1Ijoicm9qb24iLCJhIjoiY2ttaHBsdm9oMDloZDJ3bXRmNndsZWJlOCJ9.rTMjPPJh669gs8Ld6XxFLg';

    const [viewport, setViewport] = useState({
        latitude: 23.810651,
        longitude: 90.4126466,
        zoom: 10,
        width: 600,
        height: 400,
    })

    
    return (
        <ReactMapGl  mapboxApiAccessToken={token} {...viewport} onViewportChange={(nextViewport => setViewport(nextViewport))}></ReactMapGl>    
    );
};

export default Map;
