const SearchSelectBox = () => {
  return (
    <select className="select w-full select-bordered max-w-[15rem] mr-3 h-16 !outline-none border-none font-M">
      <option>통합검색</option>
      <option>제목</option>
      <option>저자</option>
      <option>출판사</option>
      <option>책소개</option>
    </select>
  );
};
export default SearchSelectBox;
