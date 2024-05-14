const { Coupon } = require("../models/coupon");

require("dotenv").config();

class CouponController {
    static async get(req, res) {
        try {
            const coupons = await Coupon.find();
            return res.status(200).send({ coupons });
        } catch (error) {
            return res.status(404).send({ error: 'Coupons not found!' });
        }
    }

    static async getById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            const coupon = await Coupon.findById(id);
            return res.status(200).send({ coupon });
        } catch (error) {
            return res.status(404).send({ error: 'Coupon not found!' });
        }
    }

    static async post(req, res) {
        const { productsIds, imagesList } = req.body;

        if (!product || !price || !description || !category)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const coupon = new Coupon({
            productsIds,
            imagesList,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await coupon.save();
            res.status(201).send({ message: 'Coupon registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a Coupon' });
        }
    }

    static async deleteById(req, res) {
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            await Coupon.findByIdAndDelete(id);
            return res.status(200).send({ message: 'Coupon deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing Coupons' });
        }
    }

    static async clear(req, res) {
        try {
            await Coupon.deleteMany({});
            return res.status(200).send({ message: 'All Coupons deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing Coupons' });
        }
    }
}

module.exports = CouponController;
