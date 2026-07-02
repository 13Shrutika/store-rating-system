const express = require("express");

const router = express.Router();

const {

    register,

    login,

    changePassword

} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const {

    registerValidation,

    loginValidation,

    changePasswordValidation,

    validate

} = require("../validations/authValidation");


/* ==========================================
   Public Routes
========================================== */

router.post(

    "/register",

    registerValidation,

    validate,

    register

);

router.post(

    "/login",

    loginValidation,

    validate,

    login

);


/* ==========================================
   Protected Routes
========================================== */

router.put(

    "/change-password",

    authMiddleware,

    changePasswordValidation,

    validate,

    changePassword

);

module.exports = router;