const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    dashboard,
    createUser,
    getUsers,
    getUserDetails

} = require("../controllers/adminController");

/* Dashboard */

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("ADMIN"),
    dashboard
);

/* Create User */

router.post(
    "/users",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createUser
);

/* List Users */

router.get(
    "/users",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getUsers
);

/* User Details */

router.get(
    "/users/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getUserDetails
);

module.exports = router;