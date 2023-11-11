const CardModel = require("../models/card-model");
const CommentModel = require("../models/comment-model");
const UserModel = require("../models/user-model");

class CardController {
    async getAllCards(req, res, next) {
        try {
            const users = await CardModel.find();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getCard(req, res, next) {
        try {
            const cardId = req.params.id
            const card = await CardModel.findOne({ "_id": cardId })
            const comments = await CommentModel.find({ cardId })
            const commentsWithUser = await Promise.all(comments.map(async (comment) => {
                const user = await UserModel.findOne({ "_id": comment.userId })
                return { comment, user }
            }))

            card.comments = commentsWithUser

            return res.json(card);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new CardController();