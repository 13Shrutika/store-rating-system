const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

/* =====================================
   Dashboard
===================================== */

const dashboard = async (req, res) => {

    try {

        const stats = await Admin.getDashboardStats();

        return res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

/* =====================================
   Create User
===================================== */

const createUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            address,
            role
        } = req.body;

        if (!name || !email || !password || !address || !role) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        if (!["ADMIN", "USER", "OWNER"].includes(role)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Role"
            });

        }

        const existingUser = await Admin.findUserByEmail(email);

        if (existingUser.length > 0) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.addUser(
            name,
            email,
            hashedPassword,
            address,
            role
        );

        return res.status(201).json({
            success: true,
            message: `${role} Created Successfully`
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

/* =====================================
   Get All Users
===================================== */

const getUsers = async (req, res) => {

    try {

        const {
            search = "",
            role = "",
            sortBy = "name",
            order = "ASC"
        } = req.query;

        const users = await Admin.getAllUsers(
            search,
            role,
            sortBy,
            order
        );

        return res.status(200).json({
            success: true,
            total: users.length,
            data: users
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

/* =====================================
   Get User Details
===================================== */

const getUserDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await Admin.getUserDetails(id);

        if (user.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        return res.status(200).json({
            success: true,
            data: user[0]
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};

module.exports = {

    dashboard,

    createUser,

    getUsers,

    getUserDetails

};