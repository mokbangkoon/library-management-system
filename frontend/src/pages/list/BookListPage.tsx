import { useEffect, useState } from 'react';

const BookListPage = ({ params }) => {
  useEffect(() => {
    if (params.id === 'TECHNOLOGY_ENGINEERING') {
      setBookList(['으라차차', '흐하하']);
    }
    if (params.id === 'SCIENCE') {
      setBookList(['과학이다', '흐하하']);
    }
    if (params.id === 'IT_PROGRAMMING') {
      setBookList(['아이티', '프그']);
    }
  }, [params]);
  const [bookList, setBookList] = useState([]);

  return (
    <div>
      <div>{params.id}</div>
      <div>{bookList}</div>
    </div>
  );
};
export default BookListPage;
