const CommentModel = require("../models/comment-model");

class CommentController {
    async createComment(req, res, next) {
        try {
            const { text, cardId, userId } = req.body

            const comment = await CommentModel.create({ text, cardId, userId })
            return res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const { commentId, userId } = req.body

            const comment = await CommentModel.findById(commentId)

            if (!comment) {
                return res.status(400).json({ message: 'Comment not found' })
            }

            if (userId !== comment.userId.toString()) {
                return res.status(400).json({ message: 'You are not the owner of the comment' })
            }

            await comment.deleteOne()

            const reply = `Comment deleted`

            res.json(reply)
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new CommentController();