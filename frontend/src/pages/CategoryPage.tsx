import { useEffect, useState } from 'react';
import TitleText from '@src/components/Common/TitleText';
import { useParams } from 'react-router';
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
        const response = await getCategoryCount();
        if (params.id === 'ECONOMICS_MANAGEMENT') {
          response.forEach((el: { name: string; count: number }) => {
            if (el.name === '경제/경영') {
              setSubtitle(`총 ${el.count} 권`);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [params.id]);

  const [subtitle, setSubtitle] = useState('');

  return (
    <div>
      <TitleText title={title} subTitle={subtitle} />
    </div>
  );
};
export default CategoryPage;
