import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx'
import NewsApi from './NewsApi.jsx';
import MovieApi from './MovieApi.jsx';
import SpotifyRecommendations from './SpotifyRecommendations.jsx';
import MealApi from './MealApi.jsx';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/" element={
            <>
              <NewsApi />
              <SpotifyRecommendations />
              <MovieApi />
              <MealApi />
            </>
          }/>
        <Route path="/news" element={<><h2>News</h2><NewsApi /></>} />
        <Route path="/music" element={<><h2>Music</h2><SpotifyRecommendations /></>} />
        <Route path="/movies" element={<><h2>Movies</h2><MovieApi /></>} />
        <Route path="/food" element={<><h2>Food</h2><MealApi /></>} />
      </Routes>
    </Router>
  );
}

export default App;
