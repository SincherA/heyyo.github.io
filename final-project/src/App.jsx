import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx';
import NewsApi from './NewsApi.jsx';
import MovieApi from './MovieApi.jsx';
import SpotifyRecommendations from './SpotifyRecommendations.jsx';
import MealApi from './MealApi.jsx';
// import './App.css'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <h2>News</h2>
      <NewsApi />
      <h2>Music</h2>
      <SpotifyRecommendations />
      <h2>Movies</h2>
      <MovieApi />
      <h2>Food</h2>
      <MealApi />
      </Router>
    </>
  );
}

export default App;

