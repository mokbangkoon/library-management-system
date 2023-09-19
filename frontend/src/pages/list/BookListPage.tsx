import { useEffect, useState } from 'react';

const BookListPage = ({ bookList }) => {
  return (
    <div className="grid grid-cols-4 grid-flow-row gap-5">
      {bookList ? (
        bookList.map((el, idx) => (
          <div key={idx}>
            <div>
              <img src={el.img} alt="책 이미지" />
            </div>
            <div className="mt-4 mb-1 font-B leading-[1.375rem] tracking-[-0.6px]">
              {el.title}
            </div>
            <div className="mb-2 font-R text-sm leading-5 tracking-[-0.6px]">
              {el.writer} | {el.publisher}
            </div>
            <div className="flex gap-2">
              {/* {el.shareCount !== 0 ? <div>공유해요 {el.shareCount}</div> : null}
              {el.findCount !== 0 ? <div>책 찾아요 {el.findCount}</div> : null} */}
              <div className="text-white font-R leading-[1.125rem] tracking-[-0.6px] px-2 py-[0.125rem] flex items-center justify-center rounded-[0.625rem] bg-[#4C6EF5]">
                공유해요 {el.shareCount}
              </div>
              <div className="text-white font-R leading-[1.125rem] tracking-[-0.6px] px-2 py-[0.125rem] flex items-center justify-center rounded-[0.625rem] bg-[#7950F2]">
                찾아요 {el.findCount}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>책 리스트가 없습니다.</div>
      )}
    </div>
  );
};
export default BookListPage;
