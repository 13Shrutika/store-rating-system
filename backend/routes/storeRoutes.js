const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    createStore,

    getStores,

    getStoreDetails

} = require("../controllers/storeController");

/* =====================================
   Store Routes
===================================== */

// Add Store
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createStore
);

// View All Stores
router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getStores
);

// View Store Details
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getStoreDetails
);

module.exports = router;