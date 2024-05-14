const { Sale } = require("../models/sale");

require("dotenv").config();

class SaleController {
    static async get(req, res) {
        try {
            const sales = await Sale.find();
            return res.status(200).send({ sales });
        } catch (error) {
            return res.status(404).send({ error: 'Sales not found!' });
        }
    }

    static async getById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            const sale = await Food.findById(id);
            return res.status(200).send({ sale });
        } catch (error) {
            return res.status(404).send({ error: 'sale not found!' });
        }
    }

    static async post(req, res) {
        const { soldFoodsIds, soldCombosIds, price, userId } = req.body;

        if (!soldFoodsIds || !soldCombosIds || !price || !userId)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const sale = new Sale({
            soldFoodsIds,
            soldCombosIds,
            price,
            userId,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await sale.save();
            res.status(201).send({ message: 'Sale registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a sale' });
        }

    }

    static async deleteById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            await Sale.findByIdAndDelete(id);
            return res.status(200).send({ message: 'Sale deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while deleting sale' });
        }
    }

    static async clear(req, res) {
        try {
            await Food.deleteMany({});
            return res.status(200).send({ message: 'All sales deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing sales' });
        }
    }
}

module.exports = SaleController;
