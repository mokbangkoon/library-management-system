import { useState } from 'react';
import { getSearchedBooks } from '../../../apis/mainAndListApi';
import SearchSelectBox from '../SelectBox/SearchSelectBox';

const SearchInput = () => {
  const [filter, setFilter] = useState(1);
  const [input, setInput] = useState('');

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const searchBook = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await getSearchedBooks({
        page: 1,
        size: 20,
        searchFilter: filter,
        title: input,
      });
    }
  };
  return (
    <div className="relative">
      <div className="absolute left-0">
        <SearchSelectBox setFilter={setFilter} />
      </div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="input input-bordered input-lg h-[3.1rem] w-[30rem]  pl-32 !outline-none rounded-[6.25rem]  border-none  font-R bg-[#F1F3F5] placeholder-text-[#868E96]"
        onChange={changeInputValue}
        onKeyPress={searchBook}
      />
    </div>
  );
};
export default SearchInput;
