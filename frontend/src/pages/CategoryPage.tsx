import {
  getCategoryBook,
  getCategoryCount,
  getSubcategoryBookCount
} from '@src/apis/api';
import TitleText from '@src/components/Common/TitleText';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookListPage from './list/BookListPage';

const CategoryPage = () => {
  const params = useParams();
  console.log(params.id)
  const title = '카테고리 별 책들이에요.';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryCountResponse = await getCategoryCount();
        const subCategoryCountResponse = await getSubcategoryBookCount({
          categoryId: params.id
       });
        console.log(subCategoryCountResponse);
          const bookListData = await getCategoryBook({
            categoryId: params.id,
            page: 1,
            size: 20,
          });

          categoryCountResponse.forEach(
            (el: { name: string; count: number }) => {
              if (el.name === '경제/경영') {
                setSubtitle(`총 ${el.count} 권`);
              }
            },
          );
          setBookList(bookListData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [params.id]);

  const [subtitle, setSubtitle] = useState('');
  const [bookList, setBookList] = useState([]);

  return (
    <div>
      <TitleText title={title} subTitle={subtitle} />
      <BookListPage bookList={bookList} />
    </div>
  );
};
export default CategoryPage;
