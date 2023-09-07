import { useEffect, useState } from 'react';
import { book } from '../../../../apis/apiResponse';
import BestBookCard from '../../Card/bestBook/BestBookCard';
import PurchasedBookCard from '../../Card/purchasedBook/PurchasedBookCard';
import ReviewBookCard from '../../Card/reviewBook/ReviewBookCard';
import ShareAndBookCard from '../../Card/shareAndBook/ShareAndBookCard';
import TeamBookCard from '../../Card/teamBook/TeamBookCard';
import styles from './MainBook.module.css'; // 파일명 수정
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
    share: ShareAndBookCard,
    find: ShareAndBookCard,
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
  const team = ['사업', '영업', '개발', '디자인', '기획', '관리', '서비스'];

  return (
    <div className={styles.wrapper}>
      <div className="header">
        <span className={styles.title}>{title}</span>
        <div
          className={
            type == 'find' || type == 'share'
              ? 'flex justify-between pt-2 pb-16'
              : 'flex justify-between pt-2 pb-7'
          }
        >
          <span className={styles.subTitle}>{subTitle}</span>
          {type !== 'team' ? (
            <span className={styles.moreBtn}>더보기+</span>
          ) : null}
        </div>
        <div className={type == 'team' ? styles.teamCategory : ''}>
          {type == 'team'
            ? team?.map((data, idx) => {
                return (
                  <span className={styles.team} key={idx}>
                    {data}
                  </span>
                );
              })
            : null}
        </div>
      </div>

      <div className="flex justify-between flex-wrap" key="book-key">
        {data?.map((book, idx) => {
          const Component = componentMap[type];
          return loading ? (
            <div key={book.id}></div>
          ) : (
            <Component
              idx={idx}
              key={book.id}
              img={book.img}
              title={book.title}
              writer={book.writer}
              categories={book?.categories}
              rating={book?.rating}
              content={book?.content}
              name={book?.name}
              createDateTime={book?.createDateTime}
              type={type}
            />
          );
        })}
      </div>
      {type == 'team' ? (
        <div className={styles.btnWrapper}>
          <span className={styles.teamMoreBtn}>더보기</span>
        </div>
      ) : null}
    </div>
  );
};

export default MainBook;
