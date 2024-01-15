import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './sharedStyles.css';

const MealApi = ({ slider = false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        // Fetch meal data from The Meal DB
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();

        // Update state with meal data
        setData(data.categories);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealData();
  }, []);

  function truncateDescription(overview) {
    const maxLength = 300;
    const truncated = overview.length > maxLength ? overview.substring(0, maxLength) + '...' : overview;
    return truncated;
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className={slider ? 'card-container' : 'card-container-wrap'}>
      {/* Render meal data */}
      {data.map(category => (
        <div key={category.idCategory} className="card">
          <img src={category.strCategoryThumb} alt={category.strCategory} className="card-img" />
          <div className="card-content">
            <h2>{category.strCategory}</h2>
            <p>{truncateDescription(category.strCategoryDescription)}</p>
            <a href={`#/${category.strCategory}`} className="card-link">
              See More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

MealApi.propTypes = {
  slider: PropTypes.bool,
};


export default MealApi;
