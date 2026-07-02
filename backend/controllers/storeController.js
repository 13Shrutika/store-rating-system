const Store = require("../models/storeModel");

/* =====================================
   Create Store
===================================== */

const createStore = async (req, res) => {

    try {

        const {

            name,

            email,

            address,

            owner_id

        } = req.body;

        if (!name || !email || !address || !owner_id) {

            return res.status(400).json({

                success: false,

                message: "All fields are required"

            });

        }

        const existingStore = await Store.findStoreByEmail(email);

        if (existingStore.length > 0) {

            return res.status(400).json({

                success: false,

                message: "Store email already exists"

            });

        }

        await Store.createStore(

            name,

            email,

            address,

            owner_id

        );

        return res.status(201).json({

            success: true,

            message: "Store Created Successfully"

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/* =====================================
   Get All Stores
===================================== */

const getStores = async (req, res) => {

    try {

        const {

            search = "",

            sortBy = "name",

            order = "ASC"

        } = req.query;

        const stores = await Store.getAllStores(

            search,

            sortBy,

            order

        );

        return res.status(200).json({

            success: true,

            total: stores.length,

            data: stores

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/* =====================================
   Get Store Details
===================================== */

const getStoreDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const store = await Store.getStoreById(id);

        if (store.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Store Not Found"

            });

        }

        return res.status(200).json({

            success: true,

            data: store[0]

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {

    createStore,

    getStores,

    getStoreDetails

};