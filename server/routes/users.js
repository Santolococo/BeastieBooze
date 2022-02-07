const { Router } = require('express');
const {
  getUser,
  createUser,
  findAndUpdate,
  findAndUpdateFavorites,
  findAndDeleteFavorites,
  addReviews,
  findDrinkReviews,
  addRating,
} = require('../database/helpers');
const axios = require('axios');
const { User } = require('../database/Models');

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const { googleId, username } = req.query;
  const existingUser = await getUser(googleId);

  if (existingUser.length) {
    res.status(201).send(existingUser[0]);
  } else if (!existingUser.length) {
    createUser(req.query)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        // console.log('error creating user', err);
        res.sendStatus(500);
      });
  } else {
    // console.log('not found');
    res.sendStatus(404);
  }
});

//Create a User Patch and a User Destroy route//

usersRouter.patch('/favorites/:id', (req, res) => {
  const { id, favorites } = req.body;
  findAndUpdateFavorites(id, favorites)
    .then((user) => {
      console.log('PATCHED SUCCESSFULLY TO FAVORITES');
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

usersRouter.patch('/favorites/delete/:favId', (req, res) => {
  const { googleId, favId } = req.body;
  console.log(req.body);
  findAndDeleteFavorites(googleId, favId)
    .then((user) => {
      console.log('REMOVED SUCCESSFULLY FROM FAVORITES', favId);
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

usersRouter.patch('/custom/:id', (req, res) => {
  const { id, creations } = req.body;
  findAndUpdate(id, creations)
    .then((user) => {
      console.log('PATCHED SUCCESSFULLY TO CREATIONS');
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Adds a review to users review field
usersRouter.post('/reviews', (req, res) => {
  const reviewObj = req.body;

  addReviews(reviewObj)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// adds a rating 
usersRouter.patch('/ratings/:id', (req, res) => {
  const { id, ratings } = req.params;

  addRating(id, ratings)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
})

//retrieve the ratings array
usersRouter.get('/ratings/:id', (req, res) => {
  const { id, ratings } = req.params;

  getRatings(id, ratings)
    .then((data))
})

// Gets all reviews for a given libation by drinkId lookup.
usersRouter.get('/getReviews/:id', (req, res) => {
  const { id } = req.params;
  findDrinkReviews(id)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = { usersRouter };
