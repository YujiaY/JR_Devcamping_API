const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require("../controllers/reviews");

const Review = require("../models/Review");

const { protect, authorize } = require("../middleware/auth");
const genericResults = require("../middleware/genericResults");

router
  .route("/")
  .get(
    genericResults(Review, [
      {
        path: "bootcamp",
        select: "name description"
      },
      {
        path: "user",
        select: "name"
      }
    ]),
    getReviews
  )
  .post(protect, authorize("user", "admin"), addReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("user", "admin"), updateReview)
  .delete(protect, authorize("user", "admin"), deleteReview);

module.exports = router;
