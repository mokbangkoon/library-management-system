import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Select, DropdownProps } from 'semantic-ui-react';
import './styles.css';

const SearchSelectBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      key: '1',
      value: '제목',
      text: '제목',
    },
    {
      key: '2',
      value: '저자',
      text: '저자',
    },
    {
      key: '3',
      value: '출판사',
      text: '출판사',
    },
    {
      key: '4',
      value: '책소개',
      text: '책소개',
    },
  ];

  const changeSelectBox = (
    _event?: React.SyntheticEvent<HTMLElement>,
    data?: DropdownProps,
  ) => {
    console.log(data?.value);
  };
  return (
    <div>
      <Select
        className={
          isOpen
            ? '!rounded-[1.5rem] !border-[#495057]'
            : '!rounded-[6.25rem]  !border-[#495057]'
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
