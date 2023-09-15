import React from 'react';
import Events from '../components/Events';
import '../App.css';


const LocalEvents = () => {
    return (
        <section className='local-events'>
            <h1>
                Check out the local Pet friendly events and places near you...
            </h1>
            <Events />
            <button>Enter</button>
            <section id='map-container'>
                <p>map</p>
            </section>
        </section>
       
    );
};
export default LocalEvents;
