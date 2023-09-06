import SearchSelectBox from '../SelectBox/SearchSelectBox';

const SearchInput = () => {
  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  return (
    <div className="relative">
      <div className="absolute left-0">
        <SearchSelectBox />
      </div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="input input-bordered input-lg h-[3.1rem] w-[30rem]  pl-32 !outline-none rounded-[6.25rem]  border-none  font-R bg-[#F1F3F5] placeholder-text-[#868E96]"
        onChange={changeInputValue}
      />
    </div>
  );
};
export default SearchInput;
