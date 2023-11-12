const UserModel = require('../models/user-model');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET | 'test12345', { expiresIn: '24h' })
    return accessToken
}

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { mail, password } = req.body;
            const candidate = await UserModel.findOne({ mail })
            if (candidate) {
                throw ApiError.BadRequest(`Данная почта уже используется`)
            }
            const hashPassword = await bcrypt.hash(password, 3);

            const user = await UserModel.create({ mail, password: hashPassword })
            const token = generateTokens({
                id: user._id,
                mail
            },);

            return res.json({ token, user });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const { mail, password } = req.body;
            const user = await UserModel.findOne({ mail })
            if (!user) {
                throw ApiError.BadRequest('Пользователь с таким email не найден')
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError.BadRequest('Неверный пароль');
            }
            const token = generateTokens({
                id: user._id,
                mail
            },);

            return res.json({ token, user });
        } catch (e) {
            next(e);
        }
    }

    async checkToken(req, res, next) {
        try {
            const { mail } = req.user
            const user = await UserModel.findOne({ mail })
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();