import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx'
import NewsApi from './NewsApi.jsx';
import MovieApi from './MovieApi.jsx';
import SpotifyRecommendations from './SpotifyRecommendations.jsx';
import MealApi from './MealApi.jsx';
// import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Hero />
      <Routes>
        <Route path="/" element={
            <>
              <div className="api-container">
                <h2>News to read</h2>
                <NewsApi slider />
              </div>
              <div className="api-container">
                <h2>Music to listen</h2>
                <SpotifyRecommendations slider />
              </div>
              <div className="api-container">
                <h2>Movies to watch</h2>
                <MovieApi slider />
              </div>
              <div className="api-container">
                <h2>Food to cook</h2>
                <MealApi slider />
              </div>
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