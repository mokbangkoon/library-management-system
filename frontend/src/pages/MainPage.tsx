import { useEffect, useState } from 'react';
import { mainParam } from '../apis/apiParam';
import { book } from '../apis/apiResponse';
import { Department } from '../apis/enum';
import {
  getBestBooks,
  getPurchasedBooks,
  getReviewBooks,
  getShareAndFindBooks,
  getTeamBooks,
} from '../apis/mainAndListApi';
import LoginButton from '../components/Common/Button/LoginButton';
import SearchInput from '../components/Common/Input/SearchInput';
import MainBook from '../components/Common/List/main/MainBook';
import SearchSelectBox from '../components/Common/SelectBox/SearchSelectBox';
import MainTab from '../components/Common/Tab/MainTab';
const MainPage = () => {
  type props = {
    data: book[];
    title: string;
    subTitle: string;
    type: string;
  };

  const param: mainParam = { type: 1, teamId: Department.사업 };

  const [purchasedData, setPurchaseData] = useState<book[]>([]);
  const [bestData, setBestData] = useState<book[]>([]);
  const [shareData, setShareData] = useState<book[]>([]);
  const [FindData, setFindData] = useState<book[]>([]);
  const [reviewData, setReviewData] = useState<book[]>([]);
  const [teamData, setTeamData] = useState<book[]>([]);

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
        setShareData(shareAndFindData.shareBooks);
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
    type: 'shareAndFind',
  };
  const findProps: props = {
    data: FindData,
    title: '책을 찾습니다',
    subTitle: '이 책을 읽고 싶어요 공유해주세요',
    type: 'shareAndFind',
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
  const team = ['사업', '영업', '개발', '디자인', '기획', '관리', '서비스'];

  return (
    <div>
      <div className="max-w-[1920px] ">
        <div className="flex justify-between items-center max-w-[1200px] m-auto p-6 h-16">
          <MainTab />
          <div className="flex items-center">
            <SearchInput />
            <LoginButton />
          </div>
        </div>
        <div className="h-[3px] bg-[#DFDFDF]"></div>
      </div>

      <div className="purchasedBooks">
        <MainBook
          key="purchased-card"
          data={purchaseProps.data}
          title={purchaseProps.title}
          subTitle={purchaseProps.subTitle}
          type={purchaseProps.type}
        />
      </div>

      <div className="bestBooks">
        <MainBook
          key="best-card"
          data={bestProps.data}
          title={bestProps.title}
          subTitle={bestProps.subTitle}
          type={bestProps.type}
        />
      </div>

      <div className="shareAndBooks">
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

      <div className="reviewBooks">
        <MainBook
          key="review-card"
          data={reviewProps.data}
          title={reviewProps.title}
          subTitle={reviewProps.subTitle}
          type={reviewProps.type}
        />
      </div>

      <div className="teamBooks">
        {team.map((data, idx) => {
          return <span key={idx}>{data}</span>;
        })}
        <MainBook
          key="team-card"
          data={teamProps.data}
          title={teamProps.title}
          subTitle={teamProps.subTitle}
          type={teamProps.type}
        />
      </div>
    </div>
  );
};

export default MainPage;
