import { useEffect, useState } from 'react';
import { book } from '../../../../apis/apiResponse';
import BestBookCard from '../../Card/BestBookCard';
import PurchasedBookCard from '../../Card/PurchasedBookCard';
import ReviewBookCard from '../../Card/ReviewBookCard';
import ShareAndBookCard from '../../Card/ShareAndBookCard';
import TeamBookCard from '../../Card/TeamBookCard';

const MainBook = ({
  data,
  title,
  subTitle,
  type,
}: {
  data: book[];
  title: string;
  subTitle: string;
  type: string;
}) => {
  const componentMap = {
    purchased: PurchasedBookCard,
    best: BestBookCard,
    shareAndFind: ShareAndBookCard,
    review: ReviewBookCard,
    team: TeamBookCard,
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (error) {
          return (
            <div>
              책을 로드하는 동안 에러가 발생했습니다. 관리자에게 문의해주세요.
            </div>
          );
        }

        if (!Array.isArray(data)) {
          return <div>발견된 책이 없습니다.</div>;
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="header">
        <div>{title}</div>
        <div>{subTitle}</div>
      </div>
      <div className="more">더보기+</div>
      <div className="flex" key="book-key">
        {data?.map((book) => {
          const Component = componentMap[type];
          return loading ? (
            <div key={book.id}></div>
          ) : (
            <Component
              key={book.id}
              img={book.img}
              title={book.title}
              writer={book.writer}
              categories={book?.categories}
              rating={book?.rating}
              content={book?.content}
              name={book?.name}
              createDateTime={book?.createDateTime}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainBook;
