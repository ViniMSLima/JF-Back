const { Food } = require("../models/food");

require("dotenv").config();

class FoodController {
    static async get(req, res) {
        try {
            const foods = await Food.find();
            return res.status(200).send({ foods });
        } catch (error) {
            return res.status(404).send({ error: 'Foods not found!' });
        }
    }

    static async getById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            const food = await Food.findById(id);
            return res.status(200).send({ food });
        } catch (error) {
            return res.status(404).send({ error: 'Food not found!' });
        }
    }

    static async post(req, res) {
        const { name, price, description, smallDescription, category, imagesList } = req.body;

        if (!name || !price || !description || !category)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const food = new Food({
            name,
            price,
            description,
            smallDescription,
            category,
            quantity: 1,
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

    static async deleteById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            await Food.findByIdAndDelete(id);
            return res.status(200).send({ message: 'Food deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing foods' });
        }
    }

    static async clear(req, res) {
        try {
            await Food.deleteMany({});
            return res.status(200).send({ message: 'All foods deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing foods' });
        }
    }

    static async updateById(req, res) {
        const { id } = req.body;
        const { name, price, description, smallDescription, category, imagesList } = req.body;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        if (!name || !price || !description || !category)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        try {
            const food = await Food.findById(id);

            if (!food) {
                return res.status(404).send({ message: 'Food not found!' });
            }

            food.name = name;
            food.price = price;
            food.description = description;
            food.smallDescription = smallDescription;
            food.category = category;
            food.imagesList = imagesList;
            food.updatedAt = Date.now();

            await food.save();

            return res.status(200).send({ message: 'Food updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while updating the food' });
        }
    }
}

module.exports = FoodController;
