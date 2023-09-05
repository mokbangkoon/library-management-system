import searchIcon from "../../../assets/images/icon_search.png";

const SearchInput = () => {
  const clickSearchIcon = () => {
    console.log("검색버튼 클릭");
  };

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div className="w-full relative">
      <img
        src={searchIcon}
        alt="검색 아이콘"
        className="absolute top-5 pl-2"
        onClick={clickSearchIcon}
      />
      <input
        type="text"
        placeholder="검색어 입력"
        className="input input-bordered input-lg w-full pl-11 !outline-none border-none font-M "
        onChange={changeInputValue}
      />
    </div>
  );
};
export default SearchInput;
