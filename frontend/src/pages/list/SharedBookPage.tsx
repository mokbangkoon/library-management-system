import { getShareAndFindBooks } from '@apis/api';

import TitleText from '@src/components/Common/TitleText';
import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BookListPage from '../list/BookListPage';
import SortSelectBox from '@src/components/Common/SelectBox/SortSelectBox';
import CircularProgress from '@mui/material/CircularProgress';
import YearSelectBox from '@src/components/Common/SelectBox/YearSelectBox';
import MonthSelectBox from '@src/components/Common/SelectBox/MonthSelectBox';
const SharedBookPage = () => {
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [newBookListData, setNewBookListData] = useState([]);
  const [filter, setFilter] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const params = useParams();
  const location = useLocation();
  const title = '공유한 책들이에요';
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let bookListData = [];
        if (location.search) {
          const urlParams = new URLSearchParams(location.search);
          bookListData = await getShareAndFindBooks({
            page: 1,
            size: 20,
            type: 2,
          });
        }
        setBookList(bookListData.books);
        setTotalCount(bookListData.totalCount);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [params.id, location.search]);

  useEffect(() => {
    if (bookList.length < 20) return;
    if (isLast) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isFetchingNextPage, bookList]);

  const handleObserver = async ([entry]) => {
    setIsFetchingNextPage(true);
    if (entry.isIntersecting) {
      fetchNextPageData();
    }
  };

  const fetchNextPageData = async () => {
    try {
      setPage((prev) => prev + 1);
      const bookListData = await getShareAndFindBooks({
        type: 2,
        page: page,
        size: 20,
      });
      if (bookListData.totalPage < page) {
        return;
      }
      bookListData.lastPage ? setIsLast(true) : setIsLast(false);
      setNewBookListData(bookListData.books);
      setBookList((prev) => [...prev, ...bookListData.books]);
    } catch (error) {
      console.error('Error fetching next page data', error);
    } finally {
      setIsFetchingNextPage(false); // 다음 페이지 데이터 요청 완료 시 로딩 상태 해제
    }
  };

  return (
    <div>
      <TitleText title={title} subTitle={totalCount} />
      <div className="max-w-[75rem] m-auto relative z-0">
        <div className="flex justify-between m-auto p-3 bg-[#F8F9FA] h-16 rounded-[0.5715rem] items-center mt-8 mb-12">
          <div className="flex w-8/12 gap-4">
            <YearSelectBox setFilter={setFilter} />
            <MonthSelectBox setFilter={setFilter} />
          </div>
          <div className="">
            <SortSelectBox setFilter={setFilter} />
          </div>
        </div>
        <BookListPage bookList={bookList} />
        <div className="flex justify-center" ref={observerRef}>
          {isLast || bookList.length < 20 ? null : <CircularProgress />}
        </div>
      </div>
    </div>
  );
};
export default SharedBookPage;
