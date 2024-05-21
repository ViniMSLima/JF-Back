const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
            return res.status(400).send({ message: 'Fields can\'t be empty' });

        try {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                fullName,
                cpf,
                email,
                password: hashedPassword,
                address,
                isAdm,
                release: Date.now(),
                createdAt: Date.now(),
            });

            await user.save();
            res.status(201).send({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error);
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

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).send({ message: 'Email and password can\'t be empty' });

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ message: 'User not found!' });
            }

            const decryptedPassword = CryptoJS.AES.decrypt(encryptedBase64, process.env.JWT_SECRET);

            const isPasswordValid = await bcrypt.compare(decryptedPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).send({ message: 'Invalid password!' });
            }

            const token = jwt.sign({ id: user._id, name: user.name, email: user.email, isAdm: user.isAdm }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).send({ message: 'Login successful', token });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while logging in' });
        }
    }
}

module.exports = UserController;
