const { Combo } = require("../models/combo");

require("dotenv").config();

class ComboController {
    static async get(req, res) {
        try {
            const combos = await Combo.find();
            return res.status(200).send({ combos });
        } catch (error) {
            return res.status(404).send({ error: 'Combos not found!' });
        }
    }

    static async getById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            const combo = await Combo.findById(id);
            return res.status(200).send({ combo });
        } catch (error) {
            return res.status(404).send({ error: 'Combo not found!' });
        }
    }

    static async post(req, res) {
        const { productsIds, imagesList, price, description, name, smallDescription } = req.body;

        if (!productsIds || !imagesList)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const combo = new Combo({
            productsIds,
            imagesList,
            price,
            description,
            name,
            smallDescription,
            quantity: 0,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await combo.save();
            res.status(201).send({ message: 'Combo registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a Combo' });
        }

    }

    static async deleteById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            await Combo.findByIdAndDelete(id);
            return res.status(200).send({ message: 'Combo deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing Combos' });
        }
    }

    static async clear(req, res) {
        try {
            await Combo.deleteMany({});
            return res.status(200).send({ message: 'All Combos deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing Combos' });
        }
    }

    static async updateById(req, res) {
        const { id } = req.body;
        const { productsIds, imagesList, price, description, name, smallDescription } = req.body;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        if (!productsIds || !imagesList || !name || !description || !price || !smallDescription)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        try {
            const combo = await Combo.findById(id);

            if (!combo) {
                return res.status(404).send({ message: 'combo not found!' });
            }

            combo.productsIds = productsIds;
            combo.imagesList = imagesList;
            combo.name = name;
            combo.description = description;
            combo.price = price;
            combo.smallDescription = smallDescription;
            combo.updatedAt = Date.now();

            await combo.save();

            return res.status(200).send({ message: 'combo updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: error });
        }
    }
}

module.exports = ComboController;
