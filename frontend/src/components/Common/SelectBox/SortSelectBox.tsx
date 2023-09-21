import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { DropdownProps, Select } from 'semantic-ui-react';
import './sortBoxStlyes.css';

const SortSelectBox = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      key: '1',
      value: 1,
      text: '제목순',
    },
    {
      key: '2',
      value: 2,
      text: '구매일순',
    },
    {
      key: '3',
      value: 3,
      text: '평점순',
    },
    {
      key: '4',
      value: 4,
      text: '조회순',
    },
  ];

  const changeSelectBox = (
    _event?: React.SyntheticEvent<HTMLElement>,
    data?: DropdownProps,
  ) => {
    setFilter(Number(data?.value));
  };
  return (
    <div className="w-2/12 mt-8 mb-12 font-B text-xl">
      <Select
        className={
          isOpen
            ? '!rounded-[0.5rem] !border-[#495057]'
            : '!rounded-[0.5rem]  !border-[#495057]'
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
export default SortSelectBox;
