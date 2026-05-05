import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from "./reviews.controller.js";
const router = express.Router(); // get access to express router
router.route("/ratings").get(MoviesController.apiGetRatings);
router.route("/id/:id").get(MoviesController.apiGetMovieById);
router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);
router.route("/").get(MoviesController.apiGetMovies);
export default router;
