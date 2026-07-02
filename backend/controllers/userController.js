const Store = require("../models/storeModel");

/* =====================================
   View Stores
===================================== */

const getStores = async (req, res) => {

    try {

        const userId = req.user.id;

        const {

            search=""

        } = req.query;

        const stores = await Store.getStoresForUser(

            userId,

            search

        );

        return res.status(200).json({

            success:true,

            total:stores.length,

            data:stores

        });

    }

    catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

};

module.exports={

    getStores

};