import axios from 'axios';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

//each star has a hidden radio button input and a number value associated with it, using useState to to assign a corresponding value to a drink in the state. once the state of the rating is updated, an axios request will be made to a given drink in the database

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const sendRating = () => {
    //send a rating to the array in the database
    axios.post('/routes/ratings/')
  }
  const setRating = () => {
    //use a get request to get the array of numbers that are past ratings. loop through the array of numbers and set the default rating
    //to the average of the ratings.
    axios.get('')
  }
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type='radio'
              name='rating'
              value={ratingValue}
              style={{ display: 'none' }}
              onClick={() => setRating(ratingValue)}
              
            />
            <FaStar
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              className='star'
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
