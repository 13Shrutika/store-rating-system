const Owner = require("../models/ownerModel");

/* =====================================
   Owner Dashboard
===================================== */

const dashboard = async (req, res) => {

    try {

        const ownerId = req.user.id;

        const store = await Owner.getDashboard(ownerId);

        const users = await Owner.getUsersWhoRated(ownerId);

        return res.status(200).json({

            success: true,

            averageRating: store,

            users

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

    dashboard

};