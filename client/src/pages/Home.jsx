import { useState, useEffect } from 'react';
import ProfileDataFetcher from '../components/ProfileDataFetcher';
import ProfileDeleteHandler from '../components/PostsDeleteHandler';

const Home = ({ token }) => {

return (

  <section className='homePage'>
      <h1>WELCOME TO RAGTAG!</h1>
      <p>A place in which you can connect with all things pets!</p>
      <img src="https://media.istockphoto.com/id/1151644281/photo/little-adorable-bunny-rabbit-with-sun-glasses-stay-on-gray-table-with-brown-wood-pattern-as.jpg?s=612x612&w=0&k=20&c=--_7hZjyEu2nOsDXNnCOPsOdn6syEfIV5x0RUx5fpnc=" alt="rags" />
      <p>Our goal here at RagTag is to maintain a happy and safe environment where you can interact with others about your fluffy friends.</p>
  </section>
  
)
}
export default Home;
