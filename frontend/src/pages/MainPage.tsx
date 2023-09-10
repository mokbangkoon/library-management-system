import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import {
  getBestBooks,
  getPurchasedBooks,
  getReviewBooks,
  getShareAndFindBooks,
  getTeamBooks,
} from '../apis/api';
import { mainParam } from '../apis/apiParam';
import { book } from '../apis/apiResponse';
import { Department } from '../apis/enum';
import event1 from '../assets/images/event1.png';
import event2 from '../assets/images/event2.jpeg';
import event3 from '../assets/images/event3.png';
import MainBook from '../components/Common/List/main/MainBook';
import styles from './mainPage.module.css';

const MainPage = () => {
  type props = {
    data: book[];
    title: string;
    subTitle: string;
    type: string;
  };
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const param: mainParam = { type: 1, teamId: Department.사업 };

  const [purchasedData, setPurchaseData] = useState<book[]>([]);
  const [bestData, setBestData] = useState<book[]>([]);
  const [shareData, setShareData] = useState<book[]>([]);
  const [FindData, setFindData] = useState<book[]>([]);
  const [reviewData, setReviewData] = useState<book[]>([]);
  const [teamData, setTeamData] = useState<book[]>([]);
  const [user, setUser] = useState(null);
  const authenticated = user == null ? false : true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          purchasedData,
          bestData,
          shareAndFindData,
          reviewData,
          teamData,
        ] = await Promise.all([
          getPurchasedBooks(param),
          getBestBooks(param),
          getShareAndFindBooks(param),
          getReviewBooks(param),
          getTeamBooks(param),
        ]);

        setPurchaseData(purchasedData.books);
        setBestData(bestData.books);
        shareAndFindData.shareBooks.unshift({
          id: 0,
          title: '책 공유하기는 어떻게 해야 하나요?',
          writer: '가이드 보러가기',
        });
        setShareData(shareAndFindData.shareBooks);
        shareAndFindData.findBooks.unshift({
          id: 0,
          title: '책을 찾습니다는 어떻게 해야 하나요?',
          writer: '가이드 보러가기',
        });
        setFindData(shareAndFindData.findBooks);
        setReviewData(reviewData.books);
        setTeamData(teamData.books);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const purchaseProps: props = {
    data: purchasedData,
    title: '최근 구매한 책',
    subTitle: '요즘 UB는 이런 책을 읽고 있어요.',
    type: 'purchased',
  };
  const bestProps: props = {
    data: bestData,
    title: '베스트 TOP 10',
    subTitle: '별점과 조회순이에요.',
    type: 'best',
  };
  const shareProps: props = {
    data: shareData,
    title: '책 공유하기',
    subTitle: '다 읽은 책을 공유해요',
    type: 'share',
  };
  const findProps: props = {
    data: FindData,
    title: '책을 찾습니다',
    subTitle: '이 책을 읽고 싶어요 공유해주세요',
    type: 'find',
  };
  const reviewProps: props = {
    data: reviewData,
    title: '한 줄 리뷰',
    subTitle: '다 읽은 책을 평가해주세요',
    type: 'review',
  };
  const teamProps: props = {
    data: teamData,
    title: '부서 별 책 리스트',
    subTitle: '부서 별 회원들이 구매한 책이에요',
    type: 'team',
  };

  return (
    <div className="max-w-[1920px]">
      <div className={styles.event}>
        <Slider {...settings}>
          <div className={styles.eventWrapper}>
            <img className={styles.banner} src={event1} />
          </div>
          <div className={styles.eventWrapper}>
            <img className={styles.banner} src={event2} />
          </div>
          <div className={styles.eventWrapper}>
            <img className={styles.banner} src={event3} />
          </div>
        </Slider>
      </div>
      <div className="pt-16">
        <div className="pb-16 flex justify-center">
          <MainBook
            key="purchased-card"
            data={purchaseProps.data}
            title={purchaseProps.title}
            subTitle={purchaseProps.subTitle}
            type={purchaseProps.type}
          />
        </div>

        <div className="pb-16 flex justify-center">
          <MainBook
            key="best-card"
            data={bestProps.data}
            title={bestProps.title}
            subTitle={bestProps.subTitle}
            type={bestProps.type}
          />
        </div>

        <div className="flex items-center flex-col items-center">
          <MainBook
            key="share-card"
            data={shareProps.data}
            title={shareProps.title}
            subTitle={shareProps.subTitle}
            type={shareProps.type}
          />
          <MainBook
            key="find-card"
            data={findProps.data}
            title={findProps.title}
            subTitle={findProps.subTitle}
            type={findProps.type}
          />
        </div>

        <div className="pb-16 flex justify-center">
          <MainBook
            key="review-card"
            data={reviewProps.data}
            title={reviewProps.title}
            subTitle={reviewProps.subTitle}
            type={reviewProps.type}
          />
        </div>

        <div className="pb-16 flex justify-center">
          <MainBook
            key="team-card"
            data={teamProps.data}
            title={teamProps.title}
            subTitle={teamProps.subTitle}
            type={teamProps.type}
            teamId={param.teamId}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
