import { useEffect } from 'react';
import { databases } from './Appwrite.jsx';
import './hero.css'

const Hero = () => {
  useEffect (() => {
    ( async function run () {
      await databases.listDocuments (databaseId, collectionsId)
     }) ()
  }, [])

  return (
    <div className="hero">
      <h1>HEY'YO is your daily helper</h1>
        <p>check daily news, find music to listen</p>
        <p>explore movies and series</p>
        <p>find delicious recipes to cook</p>
      <button>Register</button>
    </div>
  );
};

export default Hero;
