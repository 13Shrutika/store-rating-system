const pool = require("../config/db");

/* =====================================
   Check Existing Rating
===================================== */

const getUserRating = async (userId, storeId) => {

    const [rows] = await pool.query(

        `SELECT * FROM ratings
         WHERE user_id = ? AND store_id = ?`,

        [userId, storeId]

    );

    return rows;

};

/* =====================================
   Submit Rating
===================================== */

const addRating = async (userId, storeId, rating) => {

    const [result] = await pool.query(

        `INSERT INTO ratings
        (user_id, store_id, rating)
        VALUES (?, ?, ?)`,

        [userId, storeId, rating]

    );

    return result;

};

/* =====================================
   Update Rating
===================================== */

const updateRating = async (userId, storeId, rating) => {

    const [result] = await pool.query(

        `UPDATE ratings
         SET rating = ?
         WHERE user_id = ? AND store_id = ?`,

        [rating, userId, storeId]

    );

    return result;

};

module.exports = {

    getUserRating,

    addRating,

    updateRating

};
