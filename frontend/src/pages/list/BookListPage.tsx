import { useEffect, useState } from 'react';

const BookListPage = ({ bookList }) => {
  return (
    <div>
      <div></div>
      <div>{bookList.currentPage}</div>
    </div>
  );
};
export default BookListPage;
