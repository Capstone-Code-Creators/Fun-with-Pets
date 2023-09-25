import { useState, useEffect } from 'react';
import ProfileDataFetcher from '../components/ProfileDataFetcher';
import ProfileDeleteHandler from '../components/PostsDeleteHandler';

const Home = ({ token }) => {

return (

  <section>
      <h1>WELCOME TO RAGTAG!</h1>
      <p>A place in which you can connect with all things pets!</p>
      <p>Our goal here at RagTag is to maintain a happy and safe environment where you can interact with others about your fluffy friends.</p>
  </section>
  
)
}
export default Home;
