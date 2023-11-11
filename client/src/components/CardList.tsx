import { FC } from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { cardAPI } from '../services/CardService';

const CardList: FC = () => {
  const { data: cards } = cardAPI.useFetchAllCardsQuery(null);

  const breakpoints = {
    default: 5,
    1100: 6,
    700: 5,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {cards?.map((card) => (
        <div>
          <Link to={card._id}>
            <img
              key={card._id}
              src={'http://localhost:5000/' + card.imgSrc}
              className="w-full rounded-lg cursor-pointer"
            />
          </Link>
        </div>
      ))}
    </Masonry>
  );
};

export default CardList;
