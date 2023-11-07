import { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { DropdownProps, Select } from 'semantic-ui-react';
import './sortBoxStlyes.css';

const YearSelectBox = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    {
      key: '1',
      value: 1,
      text: '2023년',
    },
    {
      key: '2',
      value: 2,
      text: '2022년',
    },
    {
      key: '3',
      value: 3,
      text: '2021년',
    },
    {
      key: '4',
      value: 4,
      text: '2020년',
    },
    {
      key: '5',
      value: 5,
      text: '2019년',
    },
    {
      key: '6',
      value: 6,
      text: '2018년',
    },
  ];

  const changeSelectBox = (
    _event?: React.SyntheticEvent<HTMLElement>,
    data?: DropdownProps,
  ) => {
    setFilter(Number(data?.value));
  };
  return (
    <div className="w-2/12 font-R text-xl">
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
export default YearSelectBox;
