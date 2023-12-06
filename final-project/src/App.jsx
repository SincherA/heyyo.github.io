import './App.css'
import NewsApi from './NewsApi.jsx'
import MovieApi from './MovieApi.jsx'


function App() {

  return (
    <>
      <h2>News</h2>
      <NewsApi />
      <h2>Movies</h2>
      <MovieApi />
    </>
  )
}

export default App
