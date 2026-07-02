const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    submitRating

} = require("../controllers/ratingController");

/* =====================================
   Submit / Update Rating
===================================== */

router.post(
    "/",
    authMiddleware,
    roleMiddleware("USER"),
    submitRating
);

module.exports = router;