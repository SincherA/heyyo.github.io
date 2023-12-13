import './sharedStyles.css'
import NewsApi from './NewsApi.jsx'
import MovieApi from './MovieApi.jsx'
import SpotifyRecommendations from './SpotifyRecommendations.jsx'
import MealApi from './MealApi.jsx'


function App() {

  return (
    <>
      <h2>News</h2>
      <NewsApi />
      <h2>Movies</h2>
      <MovieApi />
      <h2>Music</h2>
      <SpotifyRecommendations />
      <h2>Food</h2>
      <MealApi />
   </>
  )
}

export default App
