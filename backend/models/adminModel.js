const pool = require("../config/db");

/* ========================= Dashboard ========================= */

const getDashboardStats = async () => {

    const [[users]] = await pool.query(
        "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const [[stores]] = await pool.query(
        "SELECT COUNT(*) AS totalStores FROM stores"
    );

    const [[ratings]] = await pool.query(
        "SELECT COUNT(*) AS totalRatings FROM ratings"
    );

    return {
        totalUsers: users.totalUsers,
        totalStores: stores.totalStores,
        totalRatings: ratings.totalRatings
    };
};

/* ========================= Find User By Email ========================= */

const findUserByEmail = async (email) => {

    const [rows] = await pool.query(

        "SELECT * FROM users WHERE email=?",

        [email]

    );

    return rows;

};

/* ========================= Add User ========================= */

const addUser = async (

    name,
    email,
    password,
    address,
    role

) => {

    const [result] = await pool.query(

        `INSERT INTO users
        (name,email,password,address,role)
        VALUES(?,?,?,?,?)`,

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

/* ========================= Get All Users ========================= */

const getAllUsers = async (

    search = "",

    role = "",

    sortBy = "name",

    order = "ASC"

) => {

    const allowed = [

        "name",

        "email",

        "address",

        "role"

    ];

    if (!allowed.includes(sortBy)) {

        sortBy = "name";

    }

    order = order === "DESC" ? "DESC" : "ASC";

    let sql = `
        SELECT
        id,
        name,
        email,
        address,
        role
        FROM users
        WHERE
        (name LIKE ?
        OR email LIKE ?
        OR address LIKE ?)
    `;

    const params = [

        `%${search}%`,
        `%${search}%`,
        `%${search}%`

    ];

    if (role) {

        sql += " AND role=?";

        params.push(role);

    }

    sql += ` ORDER BY ${sortBy} ${order}`;

    const [rows] = await pool.query(

        sql,

        params

    );

    return rows;

};

/* ========================= User Details ========================= */

const getUserDetails = async (id) => {

    const [rows] = await pool.query(

        `
        SELECT
            u.id,
            u.name,
            u.email,
            u.address,
            u.role,

            ROUND(AVG(r.rating),2) AS averageRating

        FROM users u

        LEFT JOIN stores s
        ON u.id=s.owner_id

        LEFT JOIN ratings r
        ON s.id=r.store_id

        WHERE u.id=?

        GROUP BY u.id
        `,

        [id]

    );

    return rows;

};

module.exports = {

    getDashboardStats,

    findUserByEmail,

    addUser,

    getAllUsers,

    getUserDetails

};