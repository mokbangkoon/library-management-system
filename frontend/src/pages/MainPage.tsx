import { useEffect, useState } from 'react';
import { mainParam } from '../apis/apiParam';
import { booksResponse } from '../apis/apiResponse';
import {
  getBestBooks,
  getPurchasedBooks,
  getShareAndFindBooks,
} from '../apis/mainAndListApi';
import LoginButton from '../components/Common/Button/LoginButton';
import SearchInput from '../components/Common/Input/SearchInput';
import MainBook from '../components/Common/List/main/MainBook';
import SearchSelectBox from '../components/Common/SelectBox/SearchSelectBox';
import MainTab from '../components/Common/Tab/MainTab';
const MainPage = () => {
  type props = {
    data: booksResponse;
    title: string;
    subTitle: string;
    type: string;
  };

  const param: mainParam = { type: 1 };

  const [purchasedData, setPurchaseData] = useState<booksResponse>(null);
  const [bestData, setBestData] = useState<booksResponse>(null);
  const [shareAndFindData, setShareAndFindData] = useState<booksResponse>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchasedData, bestData, shareAndFindData] = await Promise.all([
          getPurchasedBooks(param),
          getBestBooks(param),
          getShareAndFindBooks(param),
        ]);
        setPurchaseData(purchasedData);
        setBestData(bestData);
        setShareAndFindData(shareAndFindData);
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
  const shareAndFindProps = {
    data: shareAndFindData,
    titleA: '책 공유하기',
    titleB: '책을 찾습니다',
    subTitleA: '다 읽은 책을 공유해요',
    subTitleB: '이 책을 읽고 싶어요 공유해주세요',
    type: 'shareAndFind',
  };

  return (
    <div>
      <div className="max-w-[1920px] ">
        <div className="flex justify-between items-center max-w-[1440px] m-auto p-6 h-16">
          <MainTab />
          <LoginButton />
        </div>
        <div className="h-[3px] bg-[#DFDFDF]"></div>
      </div>
      <div className="flex items-center m-auto p-6 bg-[#FAFAFA]">
        <SearchSelectBox />
        <SearchInput />
      </div>
      <MainBook
        key="purchased-card"
        data={purchaseProps.data}
        title={purchaseProps.title}
        subTitle={purchaseProps.subTitle}
        type={purchaseProps.type}
      />

      <MainBook
        key="best-card"
        data={bestProps.data}
        title={bestProps.title}
        subTitle={bestProps.subTitle}
        type={bestProps.type}
      />
    </div>
  );
};

export default MainPage;
