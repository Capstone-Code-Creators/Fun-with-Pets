import { useState, useEffect } from 'react';
import ProfileDataFetcher from '../components/ProfileDataFetcher';
import ProfileDeleteHandler from '../components/PostsDeleteHandler';
import Rags from '../photos/Rags.jpeg'
const Home = ({ token }) => {

return (

  <section className='homePage'>
      <h1>WELCOME TO RAGTAG!</h1>
      <p>A place in which you can connect with all things pets!</p>
      <img id="Rags" src={Rags} alt="rags" />
      <p>Our goal here at RagTag is to maintain a happy and safe environment where you can interact with others about your fluffy friends.</p>
  </section>
  
)
}
export default Home;
