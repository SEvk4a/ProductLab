import { FC } from 'react';
import { cardAPI } from '../services/CardService';
import { userAPI } from '../services/UserService';
import { toast } from 'react-toastify';

interface CommentItemProps {
  commentId: string | undefined;
  commentUserId: string;
  text: string;
  userName: string;
}

const CommentItem: FC<CommentItemProps> = ({
  commentId,
  commentUserId,
  text,
  userName,
}) => {
  const { data: user } = userAPI.useCheckTokenQuery(null);
  const [deleteComment, {}] = cardAPI.useDeleteCommentMutation();

  const handleDeleteComment = async () => {
    const data = {
      commentId,
      userId: user?._id,
    };

    const result = await deleteComment(data);
    if ('error' in result) {
      const error = result.error as { data: { message: string } };
      toast.error(error.data.message);
    } else {
      toast.success('Комментарий удалён');
    }
  };

  return (
    <div className="py-2 border-b border-black flex items-start gap-x-[10px] last:border-none relative">
      <div className="min-w-[30px] min-h-[30px] bg-black rounded-full ml-2"></div>
      <div>
        <span className="block font-[500] text-[#2a5885] text-[12px] leading-3">
          {userName}
        </span>
        <p>{text}</p>
      </div>
      {commentUserId === user?._id && (
        <div
          onClick={handleDeleteComment}
          className="absolute top-[5px] right-[10px] cursor-pointer rounded-full hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 7l10 10M7 17L17 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
