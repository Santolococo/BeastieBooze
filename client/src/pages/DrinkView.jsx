import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Review from './Review';
import axios from 'axios';

import { BoozeContext } from '../boozeContext';
import { UserContext } from '../userContext';

import { ingredientParser } from '../../utils/parseIng';
import StarRating from '../components/StarRating.jsx';

// Testing deployed instance workflow //
const DrinkView = () => {
  // useParams will grab the param passed in url. grabbing drinkId from params.
  const { drinkId } = useParams();
  const [aDrink, setADrink] = useState({});
  // Initial state to be changed once we have a valid network call to get reviews.
  const [reviews, setReviews] = useState([
    {
      name: 'Zack',
      review: 'This drink was incredible and my kids loved it. So refreshing!',
    },
  ]);

  useEffect(() => {
    axios
      .get(`/routes/drink/${drinkId}`)
      .then(({ data }) => {
        setADrink(data.drinks[0]);
      })
      .catch((err) => console.error('THIS IS OUR ERROR!', err, drinkId));
  }, []);

  const ingredients = ingredientParser(aDrink);

  const { isLoggedIn, favoriteDrinks, toggleFavorite, removeFavorite } =
    useContext(UserContext);
  // console.log(UserContext, 31);

  // grab what we need from drink object, reassign names
  const {
    idDrink: id,
    strDrink: name,
    strDrinkThumb: thumbnail,
    strAlcoholic: alcoholic,
    strGlass: glass,
    strInstructions: directions,
  } = aDrink;

  // Function to grab all reviews for a given drink
  const getReviews = () => {
    return axios
      .get(`/routes/users/getReviews/${id}`)
      .then(({ data }) => {
        console.log(data, 56);
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeButton = () => {
    if (favoriteDrinks.includes(name)) {
      return (
        <span className='remove-button' onClick={() => removeFavorite(aDrink)}>
          <button type='button' className='btn btn-danger'>
            Remove from Favorites
          </button>
        </span>
      );
    }
  };

  const userButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          <br></br>
          <span className='drink-button'>
            <button
              type='button'
              className='btn btn-dark'
              onClick={() => {
                toggleFavorite(aDrink);
              }}
            >
              Add To Favorites
            </button>
            <div>
              <Review aDrink={aDrink} getReviews={getReviews} />
            </div>
          </span>
          {removeButton()}
        </>
      );
    }
  };

  return (
    <div className='container'>
      <h2 className='page-heading'>{name}</h2>
      <div className='row'>
        <div className='col-md-8'>
          <img src={thumbnail} className='img-fluid drink-display' alt={name} />
        </div>
        <div className='col-md-4'>
          <h4>{alcoholic}</h4>
          <h4>Glass: {glass}</h4>
          <hr></hr>
          <h5>Ingredients</h5>
          <ul>
            {ingredients.map((i, index) => {
              return (
                <li key={index}>
                  {i[1]} {i[0]}
                </li>
              ); //* each element is an array containing an ingredient followed by it's measurement
            })}
          </ul>
          <h5>Directions</h5>
          <p>{directions}</p>
          <StarRating />
          {userButtons()}
          <br></br>
          <br></br>
        </div>
      </div>
      <div>
        <h2 className='page-heading'>User Reviews:</h2>
        <div className='form-control'>
          {reviews.map((review, i) => (
            <p
              key={i}
            >{`${review.review} - ${review.username}, local-time-from-db`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
/* Will need to map over an array of reviews that we get for a given 
drink. */
export default DrinkView;
