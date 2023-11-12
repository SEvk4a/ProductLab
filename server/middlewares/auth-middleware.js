const ApiError = require('../exceptions/api-error');
const jwt = require('jsonwebtoken');

const validateAccessToken = (token) => {
    try {
        const userData = jwt.verify(token, 'test12345');
        return userData;
    } catch (e) {
        return null;
    }
}

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = validateAccessToken(accessToken);

        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};