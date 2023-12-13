import { useEffect, useState } from 'react';
import './sharedStyles.css';

const MealApi = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => {
        // Handle the data here
        setData(data);
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  }, []);

  return (
    <div className="card-container">
      {data && data.categories.map(category => (
        <div key={category.idCategory} className="card">
          <img src={category.strCategoryThumb} alt={category.strCategory} className="card-img" />
          <div className="card-content">
            <h2>{category.strCategory}</h2>
            <p>
              {category.strCategoryDescription.length > 150
                ? category.strCategoryDescription.substring(0, 150) + '...'
                : category.strCategoryDescription}
            </p>
            <a href={`#/${category.strCategory}`} className="card-link">
              See More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealApi