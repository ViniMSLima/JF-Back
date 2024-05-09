const { Food } = require("../models/food");

require("dotenv").config();

class FoodController {
    static async getFoods(req, res) {
        try {
            const foods = await Food.find();
            return res.status(200).send({ foods });
        } catch (error) {
            return res.status(404).send({ error: 'Foods not found!' });
        }
    }

    static async postFood(req, res) {
        const { product, price, description, smallDescription, category, imagesList } = req.body;

        if (!product || !price || !description || !category)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const food = new Food({
            product,
            price,
            description,
            smallDescription,
            category,
            imagesList,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await food.save();
            res.status(201).send({ message: 'Food registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a food' });
        }

    }

    static async clearFoods(req, res) {
        try {
            await Food.deleteMany({});
            return res.status(200).send({ message: 'All foods deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing foods' });
        }
    }

}

module.exports = FoodController;
