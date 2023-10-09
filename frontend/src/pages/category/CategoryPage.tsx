import {
  getCategoryBook,
  getCategoryCount,
  getSubcategoryBookCount,
} from '@src/apis/api';
import TitleText from '@src/components/Common/TitleText';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import BookListPage from '../list/BookListPage';
import { Category } from '@src/apis/enum';
import { Button } from '@mui/material';
import CategoryModal from '@src/components/Common/Modal/CategoryModal';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import SubCategoryList from '../list/SubCategoryList';
import SortSelectBox from '@src/components/Common/SelectBox/SortSelectBox';
import CircularProgress from '@mui/material/CircularProgress';
import expanded_arrow from '../../assets/images/expanded_arrow.png';
import YearSelectBox from '@src/components/Common/SelectBox/YearSelectBox';
import MonthSelectBox from '@src/components/Common/SelectBox/MonthSelectBox';
const CategoryPage = () => {
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [subtitle, setSubtitle] = useState('');
  const [bookList, setBookList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [newBookListData, setNewBookListData] = useState([]);
  const [filter, setFilter] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const title = '카테고리 별 책들이에요.';
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryCountResponse = await getCategoryCount();
        const subCategoryCountResponse = await getSubcategoryBookCount({
          categoryId: String(params.id),
        });
        let bookListData = [];

        if (location.search) {
          const urlParams = new URLSearchParams(location.search);
          const subCategory = urlParams.get('subCategory');
          bookListData = await getCategoryBook({
            categoryId: params.id,
            subCategory: subCategory === '전체보기' ? '' : subCategory,
            page: 1,
            size: 20,
          });
        } else {
          bookListData = await getCategoryBook({
            categoryId: params.id,
            page: 1,
            size: 20,
          });
        }

        setCategoryTitle(categoryCountResponse);
        setSubCategoryList(subCategoryCountResponse);
        setTotalCount(categoryCountResponse[params.id - 1].count);

        categoryCountResponse.forEach(
          (el: { name: string; count: number }, idx: number) => {
            if (Category[el.name] === params.id) {
              setSelectedCategory(el.name);
            }
          },
        );
        setBookList(bookListData.books);
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
      let subCategoryValue;
      if (location.search) {
        const urlParams = new URLSearchParams(location.search);
        subCategoryValue = urlParams.get('subCategoty');
      } else {
        subCategoryValue = '';
      }

      const bookListData = await getCategoryBook({
        categoryId: params.id,
        subCategoty: subCategoryValue,
        page: page,
        size: 20,
      });
      bookListData.lastPage ? setIsLast(true) : setIsLast(false);
      setNewBookListData(bookListData.books);
      setBookList((prev) => [...prev, ...bookListData.books]);
    } catch (error) {
      console.error('Error fetching next page data', error);
    } finally {
      setIsFetchingNextPage(false); // 다음 페이지 데이터 요청 완료 시 로딩 상태 해제
    }
  };

  const onClose = (target, _subCategory = '') => {
    setIsOpenModal(false);
    _subCategory ? null : navigate(`/category/${Category[target]}`);
  };

  return (
    <div className="max-w-[75rem] m-auto relative z-0">
      <TitleText title={title} subTitle={totalCount} />
      <div className="relative">
        <Button
          sx={{
            fontFamily: 'Pretendard-Bold',
            color: '#212529',
            fontSize: '2rem',
            marginBottom: '2rem',
          }}
          variant="text"
          onClick={() => setIsOpenModal(!isOpenModal)}
          endIcon={<img src={expanded_arrow} alt="확장 화살표" />}
        >
          {selectedCategory}
        </Button>

        <div className="z-50">
          {isOpenModal ? (
            <CategoryModal
              categoryTitle={categoryTitle}
              selectedCategory={selectedCategory}
              onClose={onClose}
            />
          ) : (
            ''
          )}
        </div>
      </div>

      <SubCategoryList
        subCategoryList={subCategoryList}
        totalCount={totalCount}
      />
      <div className="flex justify-between m-auto p-3">
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
  );
};
export default CategoryPage;