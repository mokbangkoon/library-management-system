import {
  getBestBooks,
  getPurchasedBooks,
  getReviewBooks,
  getShareAndFindBooks,
  getTeamBooks,
} from '@apis/api';
import { mainParam } from '@apis/apiParam';
import { book } from '@apis/apiResponse';
import noBook from '@assets/images/no-book.avif';
import { NextButton } from '@components/Common/Button/slider/NextButton';
import { PrevButton } from '@components/Common/Button/slider/PrevButton';
import BestBookCard from '@components/Common/Card/bestBook/BestBookCard';
import PurchasedBookCard from '@components/Common/Card/purchasedBook/PurchasedBookCard';
import ReviewBookCard from '@components/Common/Card/reviewBook/ReviewBookCard';
import ShareAndBookCard from '@components/Common/Card/shareAndBook/ShareAndBookCard';
import TeamBookCard from '@components/Common/Card/teamBook/TeamBookCard';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './MainBook.module.css';

const MainBook = ({
  data,
  title,
  subTitle,
  type,
  teamId,
}: {
  data: book[];
  title: string;
  subTitle: string;
  type: string;
  teamId?: number;
}) => {
  const componentMap = {
    purchased: PurchasedBookCard,
    best: BestBookCard,
    share: ShareAndBookCard,
    find: ShareAndBookCard,
    review: ReviewBookCard,
    team: TeamBookCard,
  };

  const getClassName = (type: string) => {
    let className = '';
    switch (type) {
      case 'best':
        className = 'grid grid-cols-5 gap-y-16 gap-x-6';
        break;
      case 'share':
        className = 'grid grid-cols-5 gap-x-6 pb-16';
        break;
      case 'find':
        className = 'grid grid-cols-5 gap-x-6 pb-16';
        break;
      case 'team':
        className =
          book.length !== 0 ? 'grid grid-cols-4 gap-y-14 gap-x-6' : '';
        break;
      default:
        break;
    }
    return className;
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [book, setBook] = useState<book[]>(data);
  const [teamIdx, setTeamIdx] = useState<number>(teamId);
  const [isClick, setClick] = useState<boolean>(false);

  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: type === 'purchased' ? 4 : 3,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    vertical: false,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
  };
  const param: mainParam = { type: 2, page: 1, size: 20, teamId: teamIdx };

  const clickMoreBtn = async (
    event: React.MouseEvent<HTMLSpanElement>,
    type: string,
  ) => {
    switch (type) {
      case 'purchased':
        await getPurchasedBooks(param);
        break;
      case 'best':
        await getBestBooks(param);
        break;
      case 'share':
        await getShareAndFindBooks(param);
        break;
      case 'find':
        await getShareAndFindBooks(param);
        break;
      case 'review':
        await getReviewBooks(param);
        break;
      case 'team':
        await getTeamBooks(param);
        break;
      default:
        break;
    }
  };

  const changeTeam = async (
    event: React.MouseEvent<HTMLSpanElement>,
    idx: number,
  ) => {
    setTeamIdx(idx + 1);
    setClick(true);
    const { books } = await getTeamBooks({
      type: 1,
      page: 1,
      size: 20,
      teamId: idx + 1,
    });
    setBook(books);
  };

  useEffect(() => {
    setBook(data);
    const fetchData = async () => {
      try {
        if (error) {
          return (
            <div>
              책을 로드하는 동안 에러가 발생했습니다. 관리자에게 문의해주세요.
            </div>
          );
        }

        if (!Array.isArray(book)) {
          return <div>발견된 책이 없습니다.</div>;
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [data]);
  const team = ['사업', '영업', '개발', '디자인', '기획', '관리', '서비스'];
  const wrapperClassName = classNames(styles.wrapper, {
    [styles.share]: type === 'share',
  });
  return (
    <div className={wrapperClassName}>
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
            <span
              className={styles.moreBtn}
              onClick={(e) => clickMoreBtn(e, type)}
            >
              더보기+
            </span>
          ) : null}
        </div>
        <div className={type == 'team' ? styles.teamCategory : ''}>
          {type == 'team'
            ? team?.map((data, idx) => {
                return (
                  <span
                    className={
                      idx + 1 === teamIdx ? styles.checkedTeam : styles.team
                    }
                    key={idx}
                    onClick={(e) => changeTeam(e, idx)}
                  >
                    {data}
                  </span>
                );
              })
            : null}
        </div>
      </div>

      {type === 'review' || type == 'purchased' ? (
        <div className={styles.slider}>
          <Slider {...settings} initialSlide={currentSlide}>
            {book?.map((book, idx) => {
              const Component = componentMap[type];
              return loading ? (
                <div key={book.id}></div>
              ) : (
                <Link to={`/book/${book.id}`} className="link" key={book.id}>
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
                </Link>
              );
            })}
          </Slider>
        </div>
      ) : (
        <div className={getClassName(type)}>
          {isClick && book.length === 0 ? (
            <div className="flex items-center flex-col items-center">
              <h1 className="text-neutral-300">등록된 책이 아직 없어요</h1>
              <div className="w-1/3	 h-1/4">
                <img src={noBook} className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            book?.map((book, idx) => {
              const Component = componentMap[type];
              return loading ? (
                <div key={book.id}></div>
              ) : type == 'best' || type =='team' ? (
                <Link
                  to={`/book/${book.id}`}
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                    key={book.id}
                >
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
                </Link>
              ) : (
                <Component
                  idx={idx}
                  key={book.id}
                  bookId={book.id}
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
            })
          )}
        </div>
      )}

      {type == 'team' ? (
        <div className={styles.btnWrapper}>
          <span
            onClick={(e) => clickMoreBtn(e, type)}
            className={styles.teamMoreBtn}
          >
            더보기
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default MainBook;
