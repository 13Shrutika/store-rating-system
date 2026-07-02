const { body, validationResult } = require("express-validator");

/* =====================================
   Register Validation Rules
===================================== */

const registerValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 20, max: 60 })
        .withMessage("Name must be between 20 and 60 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")
        .isLength({ max: 400 })
        .withMessage("Address cannot exceed 400 characters"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/)
        .withMessage(
            "Password must be 8-16 characters, contain one uppercase letter and one special character"
        )

];

/* =====================================
   Login Validation Rules
===================================== */

const loginValidation = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")

];

/* =====================================
   Change Password Validation Rules
===================================== */

const changePasswordValidation = [

    body("oldPassword")
        .notEmpty()
        .withMessage("Old Password is required"),

    body("newPassword")
        .notEmpty()
        .withMessage("New Password is required")
        .matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/)
        .withMessage(
            "Password must be 8-16 characters, contain one uppercase letter and one special character"
        )

];

/* =====================================
   Validation Middleware
===================================== */

const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            errors: errors.array()

        });

    }

    next();

};

module.exports = {

    registerValidation,

    loginValidation,

    changePasswordValidation,

    validate

};