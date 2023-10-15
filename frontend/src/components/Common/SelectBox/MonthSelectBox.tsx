import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { DropdownProps, Select } from 'semantic-ui-react';
import './sortBoxStlyes.css';

const MonthSelectBox = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      key: '1',
      value: 1,
      text: '전체',
    },
    {
      key: '2',
      value: 2,
      text: '1월',
    },
    {
      key: '3',
      value: 3,
      text: '2월',
    },
    {
      key: '4',
      value: 4,
      text: '3월',
    },
    {
      key: '5',
      value: 5,
      text: '4월',
    },
    {
      key: '6',
      value: 6,
      text: '5월',
    },
    {
      key: '7',
      value: 7,
      text: '6월',
    },
    {
      key: '8',
      value: 8,
      text: '7월',
    },
    {
      key: '9',
      value: 9,
      text: '8월',
    },
    {
      key: '10',
      value: 10,
      text: '9월',
    },
    {
      key: '11',
      value: 11,
      text: '10월',
    },
    {
      key: '12',
      value: 12,
      text: '11월',
    },
    {
      key: '13',
      value: 13,
      text: '12월',
    },
  ];

  const changeSelectBox = (
    _event?: React.SyntheticEvent<HTMLElement>,
    data?: DropdownProps,
  ) => {
    setFilter(Number(data?.value));
  };
  return (
    <div className="w-2/12  font-R text-xl">
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
export default MonthSelectBox;
