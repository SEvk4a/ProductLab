const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const userController = require('../controllers/user-controller');
const cardController = require('../controllers/card-controller');
const commentController = require('../controllers/comment-controller');

// auth
router.post('/registration',
    body('mail').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);
router.post('/login',
    body('mail').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.login
);
router.get('/check', authMiddleware, userController.checkToken);

// cards
router.get('/cards', authMiddleware, cardController.getAllCards);
router.get('/card/:id', authMiddleware, cardController.getCard);


// comments
router.post('/comment', authMiddleware, commentController.createComment);
router.delete('/comment', authMiddleware, commentController.deleteComment);

module.exports = router