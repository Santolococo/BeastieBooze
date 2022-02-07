import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { UserContext } from '../userContext';
import StarRating from '../components/StarRating.jsx';
import axios from 'axios';

const Review = ({ aDrink, getReviews }) => {
  const { userInfo } = useContext(UserContext);

  const {
    idDrink: id,
    strDrink: name,
    strDrinkThumb: thumbnail,
    strAlcoholic: alcoholic,
    strGlass: glass,
    strInstructions: directions,
  } = aDrink;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userReview, setUserReview] = useState('');

  const handleReviewChange = (e) => {
    e.preventDefault();
    setUserReview(e.target.value);
  };
  const submitReview = (userReview) => {
    const { googleId, username } = userInfo;

    const userAndReview = {
      review: userReview,
      id: googleId,
      drinkId: id,
      username,
    };
    return axios
      .post('/routes/users/reviews', userAndReview)
      .then(() => {
        alert('Thank You For Your Feedback!');
        getReviews();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='card-background'>
      <div className='card-button'>
        <Button type='button' className='btn btn-dark' onClick={handleShow}>
          Submit A Review
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className='align-items-center'>
              <InputGroup className='mb-2'>
                <InputGroup.Text>Review</InputGroup.Text>
                <StarRating/>
                <textarea
                  rows='6'
                  cols='50'
                  placeholder='Describe Your Experience'
                  value={userReview}
                  onChange={handleReviewChange}
                ></textarea>
              </InputGroup>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' className='btn btn-dark' onClick={handleClose}>
            Close
          </Button>
          <Button
            type='button'
            className='btn btn-dark'
            onClick={() => {
              submitReview(userReview);
              handleClose();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Review;
