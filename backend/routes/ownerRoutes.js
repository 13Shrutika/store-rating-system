const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    dashboard

} = require("../controllers/ownerController");

router.get(

    "/dashboard",

    authMiddleware,

    roleMiddleware("OWNER"),

    dashboard

);

module.exports = router;