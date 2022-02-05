import axios from 'axios';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

//each star has a hidden radio button input and a number value associated with it, using useState to to assign a corresponding value to a drink in the state. once the state of the rating is updated, an axios request will be made to a given drink in the database

const StarRating = () => {
  const [rating, setRating] = useState(null);

  const sendRating = () => {
    axios.post()
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
              color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
              className='star'
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
