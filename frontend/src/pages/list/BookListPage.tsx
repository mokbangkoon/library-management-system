import { useEffect, useState } from 'react';

const BookListPage = ({ bookList }) => {
  useEffect(() => {
    console.log(bookList);
  }, []);
  return (
    <div>
      <div></div>
      <div>{bookList.totalPage}</div>
    </div>
  );
};
export default BookListPage;
