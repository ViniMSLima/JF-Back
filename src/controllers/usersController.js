const { User } = require("../models/user");

require("dotenv").config();

class UserController {
    static async get(req, res) {
        try {
            const users = await User.find();
            return res.status(200).send({ users });
        } catch (error) {
            return res.status(404).send({ error: 'Users not found!' });
        }
    }

    static async getById(req, res) {
        const { UserId } = req.body;

        if (!UserId)
            return res.status(400).send({ message: 'UserId can\'t be empty' });

        try {
            const user = await User.findById(UserId);
            return res.status(200).send({ user });
        } catch (error) {
            return res.status(404).send({ error: 'User not found!' });
        }
    }

    static async post(req, res) {
        const { fullName, cpf, email, password, address, isAdm } = req.body;

        if (!fullName || !cpf || !email || !password)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        const user = new User({
            fullName,
            cpf,
            email,
            password,
            address,
            isAdm,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a User' });
        }

    }

    static async deleteById(req, res) {
        const { UserId } = req.body;

        if (!UserId)
            return res.status(400).send({ message: 'UserId can\'t be empty' });

        try {
            await User.findByIdAndDelete(UserId);
            return res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing Users' });
        }
    }

    static async clear(req, res) {
        try {
            await User.deleteMany({});
            return res.status(200).send({ message: 'All Users deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing Users' });
        }
    }
}

module.exports = UserController;
