const pool = require("../config/db");

/* =====================================
   Create Store
===================================== */

const createStore = async (name, email, address, owner_id) => {

    const [result] = await pool.query(

        `INSERT INTO stores(name,email,address,owner_id)
         VALUES(?,?,?,?)`,

        [name, email, address, owner_id]

    );

    return result;

};

/* =====================================
   Find Store By Email
===================================== */

const findStoreByEmail = async (email) => {

    const [rows] = await pool.query(

        "SELECT * FROM stores WHERE email=?",

        [email]

    );

    return rows;

};

/* =====================================
   Get Store By ID
===================================== */

const getStoreById = async (id) => {

    const [rows] = await pool.query(

        `
        SELECT
            s.*,
            u.name AS ownerName,
            ROUND(AVG(r.rating),2) AS averageRating

        FROM stores s

        LEFT JOIN users u
        ON s.owner_id=u.id

        LEFT JOIN ratings r
        ON s.id=r.store_id

        WHERE s.id=?

        GROUP BY s.id
        `,

        [id]

    );

    return rows;

};

/* =====================================
   Admin Store List
===================================== */

const getAllStores = async (

    search="",

    sortBy="name",

    order="ASC"

)=>{

    const allowed=["name","email","address"];

    if(!allowed.includes(sortBy))
        sortBy="name";

    order=order==="DESC"?"DESC":"ASC";

    const [rows]=await pool.query(

        `
        SELECT

            s.id,

            s.name,

            s.email,

            s.address,

            u.name ownerName,

            ROUND(AVG(r.rating),2) averageRating

        FROM stores s

        LEFT JOIN users u
        ON s.owner_id=u.id

        LEFT JOIN ratings r
        ON s.id=r.store_id

        WHERE
            s.name LIKE ?
            OR s.address LIKE ?

        GROUP BY s.id

        ORDER BY ${sortBy} ${order}
        `,

        [
            `%${search}%`,
            `%${search}%`
        ]

    );

    return rows;

};

/* =====================================
   User Store List
===================================== */

const getStoresForUser = async (userId, search = "") => {

    const [rows] = await pool.query(

        `
        SELECT

            s.id,

            s.name,

            s.address,

            ROUND(AVG(r.rating),2) AS overallRating,

            (
                SELECT rating
                FROM ratings

                WHERE user_id=?

                AND store_id=s.id

                LIMIT 1

            ) AS userRating

        FROM stores s

        LEFT JOIN ratings r
        ON s.id=r.store_id

        WHERE

            s.name LIKE ?

            OR s.address LIKE ?

        GROUP BY s.id
        `,

        [

            userId,

            `%${search}%`,

            `%${search}%`

        ]

    );

    return rows;

};

module.exports={

    createStore,

    findStoreByEmail,

    getStoreById,

    getAllStores,

    getStoresForUser

};