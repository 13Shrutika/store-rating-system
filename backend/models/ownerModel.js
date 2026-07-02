const pool = require("../config/db");

/* =====================================
   Owner Dashboard
===================================== */

const getDashboard = async (ownerId) => {

    const [rows] = await pool.query(

        `
        SELECT

            s.id,

            s.name,

            ROUND(AVG(r.rating),2) AS averageRating

        FROM stores s

        LEFT JOIN ratings r
        ON s.id = r.store_id

        WHERE s.owner_id = ?

        GROUP BY s.id
        `,

        [ownerId]

    );

    return rows;

};

/* =====================================
   Users Who Rated Store
===================================== */

const getUsersWhoRated = async (ownerId) => {

    const [rows] = await pool.query(

        `
        SELECT

            u.name,

            u.email,

            r.rating,

            s.name AS storeName

        FROM ratings r

        INNER JOIN users u
        ON r.user_id = u.id

        INNER JOIN stores s
        ON r.store_id = s.id

        WHERE s.owner_id = ?

        ORDER BY u.name
        `,

        [ownerId]

    );

    return rows;

};

module.exports = {

    getDashboard,

    getUsersWhoRated

};