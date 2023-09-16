import {
  getCategoryBook,
  getCategoryCount,
  getSubcategoryBookCount,
} from '@src/apis/api';
import TitleText from '@src/components/Common/TitleText';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookListPage from './list/BookListPage';
import { Category } from '@src/apis/enum';
import { Button } from '@mui/material';
import CategoryModal from '@src/components/Modal/CategoryModal';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const CategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const title = '카테고리 별 책들이에요.';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryCountResponse = await getCategoryCount();
        const subCategoryCountResponse = await getSubcategoryBookCount({
          categoryId: String(params.id),
        });
        const bookListData = await getCategoryBook({
          categoryId: params.id,
          page: 1,
          size: 20,
        });
        console.log(params.id);

        setCategoryTitle(categoryCountResponse);

        categoryCountResponse.forEach(
          (el: { name: string; count: number }, idx: number) => {
            if (Category[el.name] === params.id) {
              setSelectedCategory(el.name);
            }
          },
        );
        setBookList(bookListData);

        console.log(bookListData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [params.id]);

  const [subtitle, setSubtitle] = useState('');
  const [bookList, setBookList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const oncClose = (target) => {
    setIsOpenModal(false);
    navigate(`/category/${Category[target]}`);
  };

  return (
    <div>
      <TitleText title={title} subTitle={subtitle} />
      <Button
        variant="text"
        onClick={() => setIsOpenModal(!isOpenModal)}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedCategory}
      </Button>
      {isOpenModal ? (
        <CategoryModal
          categoryTitle={categoryTitle}
          selectedCategory={selectedCategory}
          onClose={oncClose}
        />
      ) : (
        ''
      )}
      <BookListPage bookList={bookList} />
    </div>
  );
};
export default CategoryPage;
