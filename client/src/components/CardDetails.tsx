import { FC, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentsList from './CommentsList';
import { cardAPI } from '../services/CardService';
import CommentForm from './CommentForm';

const CardDetails: FC = () => {
  const { id } = useParams();
  const { data: card } = cardAPI.useFetchCardByIdQuery(id as string);

  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const navigateToMain = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!cardRef.current?.contains(target)) {
      navigate('/');
    }
  };

  if (!card) return null;

  return (
    <div
      onClick={navigateToMain}
      className="fixed inset-0 z-500 overflow-hidden bg-[rgb(0,0,0)]/80 flex items-center justify-center cursor-pointer"
    >
      <div
        ref={cardRef}
        className="w-[1000px] max-h-[80%] flex justify-between rounded-lg overflow-hidden cursor-default"
      >
        <div className="w-2/3 flex items-center bg-[#222222]">
          <img
            src={'https://productlab-server.vercel.app/' + card!.imgSrc}
            className="w-full"
          />
        </div>
        <div className="w-1/3 bg-white flex flex-col justify-between">
          <CommentsList comments={card.comments} />
          <CommentForm cardId={card._id} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
