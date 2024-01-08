import { useState } from 'react';
import { account } from './appwriteConfig.js';
import { ID } from 'appwrite';

import './hero.css';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const register = async () => {
    try {
      let userId = ID.unique();
      console.log(userId);
      const response = await account.create(userId, email, password, name);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero">
      <h1>HEY&apos;YO is your daily helper</h1>
      <p>check daily news, find music to listen</p>
      <p>explore movies and series</p>
      <p>find delicious recipes to cook</p>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={(e) => {
        e.preventDefault();
        console.log('clicked');
        register();
      }}>Register</button>
    </div>
  );
};

export default Hero;
