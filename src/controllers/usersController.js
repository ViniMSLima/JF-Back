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
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            const user = await User.findById(id);
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
        const { id } = req.query;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        try {
            await User.findByIdAndDelete(id);
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

    static async updateById(req, res) {
        const { id } = req.body;
        const { fullName, cpf, email, password, address, isAdm } = req.body;

        if (!id)
            return res.status(400).send({ message: 'id can\'t be empty' });

        if (!fullName || !cpf || !email || !password || !address || !isAdm)
            return res.status(400).send({ message: 'Field\'s can\'t be empty' });

        try {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).send({ message: 'user not found!' });
            }

            user.fullName = fullName;
            user.cpf = cpf;
            user.email = email;
            user.password = password;
            user.address = address;
            user.isAdm = isAdm;
            user.updatedAt = Date.now();

            await user.save();

            return res.status(200).send({ message: 'user updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while updating the user' });
        }
    }
}

module.exports = UserController;
