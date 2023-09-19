import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { DropdownProps, Select } from 'semantic-ui-react';
import './selectBoxStyles.css';

const SearchSelectBox = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      key: '1',
      value: '1',
      text: '통합검색',
    },
    {
      key: '2',
      value: '2',
      text: '제목',
    },
    {
      key: '3',
      value: '3',
      text: '저자',
    },
    {
      key: '4',
      value: '4',
      text: '출판사',
    },
    {
      key: '5',
      value: '5',
      text: '책소개',
    },
  ];

  const changeSelectBox = (
    _event?: React.SyntheticEvent<HTMLElement>,
    data?: DropdownProps,
  ) => {
    setFilter(Number(data?.value));
  };
  return (
    <div>
      <Select
        className={
          isOpen
            ? '!rounded-[1.5rem] !border-[#495057] font-R'
            : '!rounded-[6.25rem]  !border-[#495057] font-R'
        }
        options={options}
        defaultValue={options[0].value}
        onChange={changeSelectBox}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};
export default SearchSelectBox;
