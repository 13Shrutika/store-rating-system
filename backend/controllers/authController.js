const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const User = require("../models/userModel");

/* ==========================================
   Register User
========================================== */

const register = async (req, res) => {

    try {

        const { name, email, password, address } = req.body;

        // Check Existing Email

        const existingUser = await User.findUserByEmail(email);

        if (existingUser.length > 0) {

            return res.status(400).json({

                success: false,

                message: "Email already registered"

            });

        }

        // Hash Password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User

        await User.createUser(

            name,
            email,
            hashedPassword,
            address,
            "USER"

        );

        res.status(201).json({

            success: true,

            message: "Registration Successful"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/* ==========================================
   Login
========================================== */

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const users = await User.findUserByEmail(email);

        if (users.length === 0) {

            return res.status(404).json({

                success: false,

                message: "User Not Found"

            });

        }

        const user = users[0];

        const isPasswordCorrect = await bcrypt.compare(

            password,

            user.password

        );

        if (!isPasswordCorrect) {

            return res.status(401).json({

                success: false,

                message: "Invalid Password"

            });

        }

        const token = generateToken(user);

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email,

                address: user.address,

                role: user.role

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/* ==========================================
   Change Password
========================================== */

const changePassword = async (req, res) => {

    try {

        const { oldPassword, newPassword } = req.body;

        const users = await User.findUserById(req.user.id);

        const user = users[0];

        const isMatch = await bcrypt.compare(

            oldPassword,

            user.password

        );

        if (!isMatch) {

            return res.status(400).json({

                success: false,

                message: "Old Password is Incorrect"

            });

        }

        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );

        await User.updatePassword(

            req.user.id,

            hashedPassword

        );

        res.status(200).json({

            success: true,

            message: "Password Updated Successfully"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {

    register,

    login,

    changePassword

};