import { FC, useState } from 'react';
import { cardAPI } from '../services/CardService';
import { userAPI } from '../services/UserService';
import { toast } from 'react-toastify';

interface CommentFormProps {
  cardId: string;
}

const CommentForm: FC<CommentFormProps> = ({ cardId }) => {
  const [text, setText] = useState('');
  const [createComment, {}] = cardAPI.useCreateCommentMutation();
  const { data: user } = userAPI.useCheckTokenQuery(null);

  const submitComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = user?._id;

    const result = await createComment({
      text,
      cardId,
      userId,
    });
    if ('error' in result) {
      const error = result.error as { data: { message: string } };
      toast.error(error.data.message);
    } else {
      toast.success('Комментарий создан');
    }
    setText('');
  };

  return (
    <div className="w-full">
      <form onSubmit={submitComment}>
        <textarea
          className="w-full block h-[100px] p-2 border-t border-[#e3e3e3] text-[12px]"
          placeholder="Написать комментарий"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          disabled={text ? false : true}
          className={`py-1.5 px-3 w-full ${
            !text
              ? 'bg-[#e3e3e3]'
              : 'bg-blue-500 hover:bg-blue-700 text-white font-bold'
          }`}
        >
          создать
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
