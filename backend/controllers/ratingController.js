const Rating = require("../models/ratingModel");

/* =====================================
   Submit / Update Rating
===================================== */

const submitRating = async (req, res) => {

    try {

        const userId = req.user.id;

        const { storeId, rating } = req.body;

        if (!storeId || !rating) {

            return res.status(400).json({
                success: false,
                message: "Store ID and Rating are required"
            });

        }

        if (rating < 1 || rating > 5) {

            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });

        }

        const existingRating = await Rating.getUserRating(userId, storeId);

        if (existingRating.length > 0) {

            await Rating.updateRating(userId, storeId, rating);

            return res.status(200).json({
                success: true,
                message: "Rating Updated Successfully"
            });

        }

        await Rating.addRating(userId, storeId, rating);

        return res.status(201).json({
            success: true,
            message: "Rating Submitted Successfully"
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

    submitRating

};