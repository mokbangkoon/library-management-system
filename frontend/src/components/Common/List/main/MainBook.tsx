import { useEffect, useState } from 'react';
import { booksResponse } from '../../../../apis/apiResponse';
import BestBookCard from '../../Card/BestBookCard';
import PurchasedBookCard from '../../Card/PurchasedBookCard';

const MainBook = ({
  data,
  title,
  subTitle,
  type,
}: {
  data: booksResponse;
  title: string;
  subTitle: string;
  type: string;
}) => {
  const componentMap = {
    purchased: PurchasedBookCard,
    best: BestBookCard,
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (error) {
          return <div>Error occurred while fetching purchased books</div>;
        }

        if (!Array.isArray(data.books)) {
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
      <div key="purchase-book-key">
        {data?.books?.map((book) => {
          const Component = componentMap[type];
          return loading ? (
            <div key={book.id}></div>
          ) : (
            <Component
              key={book.id}
              img={book.img}
              title={book.title}
              writer={book.writer}
              categories={book.categories}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainBook;
