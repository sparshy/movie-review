import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';

const router = express.Router();
//get access to express router

router.route('/').get(MoviesController.apiGetMovies);

router
    .route('/review')
    .post(ReviewsController.apiPostReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)
//handles post put and delete http request within this one route /review

router.route("/id/:id").get(MoviesController.apiGetMoviesById);
router.route("/ratings").get(MoviesController.apiGetRatings);




export default router;
