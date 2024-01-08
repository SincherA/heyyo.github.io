import { useState } from 'react';
// import { Appwrite } from 'appwrite';
import './hero.css';

const Hero = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');

  // const appwrite = new Appwrite();

  // appwrite
  //   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Assuming this is the correct endpoint
  //   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

  // const register = async () => {
  //   try {
  //     const response = await appwrite.account.create(email, password, name);
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="hero">
      <h1>HEY'YO is your daily helper</h1>
      <p>check daily news, find music to listen</p>
      <p>explore movies and series</p>
      <p>find delicious recipes to cook</p>
      {/* <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /> */}
      <button>Register</button>
    </div>
  );
};

export default Hero;
