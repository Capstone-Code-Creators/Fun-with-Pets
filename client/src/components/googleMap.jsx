import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import '../App.css';

// const mapApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const mapApiKey = import.meta.env.VITE_MAPS_API_KEY;


const containerStyle = {
    width: '100%',
    height: '550px',
};

const defaultCenter = {
    lat: 41.6528,
    lng: -83.565,
};

function MyMapComponent() {
    const initialMarkers = JSON.parse(localStorage.getItem('events')) || [];
    const [center, setCenter] = useState(defaultCenter);
    const [searchQuery, setSearchQuery] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventAddress, setEventAddress] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [markers, setMarkers] = useState(initialMarkers);
    const [selectedMarker, setSelectedMarker] = useState(null);  

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(markers));
    }, [markers]);

    const handleSearch = async () => {
        try {
            const url = new URL(
                'https://maps.googleapis.com/maps/api/geocode/json'
            );
            url.searchParams.append('address', searchQuery);
            url.searchParams.append('key', mapApiKey);

            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setCenter(location);
                setMarkers([
                    {
                        position: location,
                        title: searchQuery,
                    },
                ]);
            } else {
                alert('Location not found');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const createEvent = async () => {
        try {
            const url = new URL(
                'https://maps.googleapis.com/maps/api/geocode/json'
            );
            url.searchParams.append('address', eventAddress);
            url.searchParams.append('key', mapApiKey);

            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setCenter(location);
                setMarkers([
                    ...markers,
                    {
                        position: location,
                        title: eventName,
                    },
                ]);
                setEventName('');
                setEventAddress('');
            } else {
                alert('Address not found');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    return (
        <section>
             <section>
                <input
                    type="text"
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Enter</button>

                <h2>Create Event</h2>
                <div className='event-form'>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Event Address"
                        value={eventAddress}
                        onChange={(e) => setEventAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Event Details"
                        value={eventDetails}
                        onChange={(e) => setEventDetails(e.target.value)}
                    />
                    <button onClick={createEvent}>Create Event</button>
                </div>
            </section>
            <section>
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
                                onClick={() => setSelectedMarker(marker)}
                            />
                        ))}
                        {selectedMarker && (
                            <InfoWindow
                                position={selectedMarker.position}
                                onCloseClick={() => setSelectedMarker(null)}
                            >
                                <div>
                                    <h2>{selectedMarker.title}</h2>
                                    <h3>{selectedMarker.details}</h3>
                                    <h3>{selectedMarker.address}</h3>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </section>
        </section>
    );
}

export default MyMapComponent;
