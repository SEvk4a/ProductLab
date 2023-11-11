import { FC } from 'react';
import CommentItem from './CommentItem';
import { ICommentWithUser } from '../models/IComment';

interface CommentsListProps {
  comments: ICommentWithUser[];
}

const CommentsList: FC<CommentsListProps> = ({ comments }) => {
  if (!comments) return null;

  return (
    <div className="overflow-y-auto pb-10">
      <h5 className="text-center py-2.5 font-[500] text-[20px] bg-[#e4f6f6]">
        Комментарии
      </h5>
      {comments.length === 0 ? (
        <h6 className="font-[500] text-[#e3e3e3] text-center mt-2">
          Нет комментариев
        </h6>
      ) : (
        <div className="overflow-y-auto">
          {comments.map((comment) => (
            <CommentItem
              commentId={comment.comment._id}
              commentUserId={comment.user._id}
              text={comment.comment.text}
              userName={comment.user.mail}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
