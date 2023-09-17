import { useEffect, useState } from 'react';

const BookListPage = ({ bookList }) => {
  return (
    <div className="grid grid-cols-4 grid-flow-row gap-5">
      {bookList.books ? (
        bookList.books.map((el, idx) => (
          <div key={idx}>
            <div>
              <img src={el.img} alt="책 이미지" />
            </div>
            <div>{el.title}</div>
            <div>{el.writer}</div>
            <div>{el.publisher}</div>
            {el.shareCount !== 0 ? <div>공유해요 {el.shareCount}</div> : null}
            {el.findCount !== 0 ? <div>책 찾아요 {el.findCount}</div> : null}
          </div>
        ))
      ) : (
        <div>책 리스트가 없습니다.</div>
      )}
    </div>
  );
};
export default BookListPage;
