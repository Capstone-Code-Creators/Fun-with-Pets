import React from 'react';
import Events from '../components/Events';
import '../App.css';
import MyMapComponent from '../components/googleMap';

const LocalEvents = () => {
    return (
        <section className="local-events">
            <h1>
                Check out the local Pet friendly events and places near you...
            </h1>
            <Events />
            <section id="map-container">
                <MyMapComponent />
            </section>
        </section>
    );
};



export default LocalEvents; 
