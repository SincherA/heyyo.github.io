import { useEffect, useState } from 'react';
import Slider from "react-slick"
import './sharedStyles.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsApi = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
  };
  // State variables
  const [newsData, setNewsData] = useState([]);

  // Fetch news data
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Fetch news data from API
        const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${import.meta.env.VITE_NEWSAPI}`);
        const data = await response.json();

        // console.log(data);

        // Update state with news data
        setNewsData(data.articles);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, []);

  function truncateContent(content) {
    const maxLength = 300;
    const truncated = content.lenght > maxLength ? content.substring(0, maxLength) + '...' : content;
    return truncated;
  }

  return (
    <div className='card-container'>
      <Slider {...settings}>
        {newsData.map((newsItem) => (
          <div className='card' key={newsItem.title}>
            <h2>{newsItem.title}</h2>
            {newsItem.urlToImage && <img src={newsItem.urlToImage} alt="News Thumbnail" />}
            <p>{truncateContent(newsItem.description)}</p>
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </Slider>

    </div>
  );
};

export default NewsApi;
