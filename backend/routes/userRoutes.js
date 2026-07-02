const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { getStores } = require("../controllers/userController");

router.get(
    "/stores",
    authMiddleware,
    roleMiddleware("USER"),
    getStores
);

module.exports = router;