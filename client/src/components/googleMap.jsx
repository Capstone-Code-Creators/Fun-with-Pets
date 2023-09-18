import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapApiKey = 'AIzaSyCMSL5PrOu4J9lYXpijvdClsU1ia7om0lw';

const containerStyle = {
    width: '100%',
    height: '550px',
};

const defaultCenter = {
    lat: 41.6528,
    lng: -83.565,
};

function MyMapComponent() {
    const [center, setCenter] = useState(defaultCenter);
    const [searchQuery, setSearchQuery] = useState("");
    const [markers, setMarkers] = useState([]);

    const handleSearch = async () => {
        // ... (same as before)
    };

    const handleMarkerDragEnd = (index, event) => {
        const updatedMarkers = [...markers];
        updatedMarkers[index].position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        setMarkers(updatedMarkers);
    };

    return (
        <section>
            <input 
                type="text" 
                placeholder="Search location..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Enter</button>

            <LoadScript googleMapsApiKey={mapApiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11.5}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            title={marker.title}
                            draggable={true}
                            onDragEnd={(event) => handleMarkerDragEnd(index, event)}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </section>
    );
}

export default MyMapComponent;
