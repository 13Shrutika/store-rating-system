const pool = require("../config/db");

/* =====================================
   Find User By Email
===================================== */

const findUserByEmail = async (email) => {

    const [rows] = await pool.query(

        "SELECT * FROM users WHERE email = ?",

        [email]

    );

    return rows;

};

/* =====================================
   Find User By ID
===================================== */

const findUserById = async (id) => {

    const [rows] = await pool.query(

        "SELECT * FROM users WHERE id = ?",

        [id]

    );

    return rows;

};

/* =====================================
   Create User
===================================== */

const createUser = async (

    name,
    email,
    password,
    address,
    role = "USER"

) => {

    const [result] = await pool.query(

        `INSERT INTO users
        (name,email,password,address,role)
        VALUES (?,?,?,?,?)`,

        [
            name,
            email,
            password,
            address,
            role
        ]

    );

    return result;

};

/* =====================================
   Update Password
===================================== */

const updatePassword = async (

    id,
    password

) => {

    const [result] = await pool.query(

        "UPDATE users SET password=? WHERE id=?",

        [
            password,
            id
        ]

    );

    return result;

};

module.exports = {

    findUserByEmail,

    findUserById,

    createUser,

    updatePassword

};