import { useEffect, useState } from 'react';
import TitleText from '@src/components/Common/TitleText';
import { useParams } from 'react-router';
import BookListPage from './list/BookListPage';
import {
  getCategoryBook,
  getPurchasedBooks,
  getSubcategoryBookCount,
  getCategoryCount,
} from '@src/apis/api';

const CategoryPage = () => {
  const params = useParams();
  const title = '최근 구매한 책들이에요';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryCountResponse = await getCategoryCount();

        if (params.id === 'ECONOMICS_MANAGEMENT') {
          categoryCountResponse.forEach(
            (el: { name: string; count: number }) => {
              if (el.name === '경제/경영') {
                setSubtitle(`총 ${el.count} 권`);
              }
            },
          );
        }
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
      <BookListPage />
    </div>
  );
};
export default CategoryPage;