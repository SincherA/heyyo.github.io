import React, { useEffect, useState } from 'react';



const NewsApi = () => {
  // State variables
  const [newsData, setNewsData] = useState([]);

 

  // Fetch news data
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Fetch news data from API
        const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${import.meta.env.VITE_NEWSAPI}`);
        const data = await response.json();

console.log(data);

        // Update state with news data
        setNewsData(data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, []);

  
  return (
    <div>
      {/* Render news data
      {newsData.map((newsItem) => (
        <div key={newsItem.id}>
          <h2>{newsItem.title}</h2>
          <p>{newsItem.description}</p>
        </div>
      ))} */}
    </div>
  );
};

export default NewsApi;
