import logo from '@assets/images/icon-ubcare.png';
import { useState } from 'react';

const MainTab = () => {
  const [isActive, setIsActive] = useState({
    today: true,
    community: false,
    myBook: false,
    category: false,
  });

  const clickTab = (name: keyof typeof isActive) => {
    setIsActive({
      today: false,
      community: false,
      myBook: false,
      category: false,
      [name]: true,
    });
  };
  return (
    <div className="flex items-center">
      <div className="mr-10">
        <img src={logo} alt="logo" />
      </div>
      <div className="tabs font-B h-16 flex items-center">
        <a
          className={
            isActive['today']
              ? 'tab-active tab tab-bordered h-full !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('today')}
        >
          투데이
        </a>
        <a
          className={
            isActive['community']
              ? 'tab-active tab tab-bordered h-full  !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('community')}
        >
          커뮤니티
        </a>
        <a
          className={
            isActive['myBook']
              ? 'tab-active tab tab-bordered h-full  !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('myBook')}
        >
          내서재
        </a>
        <a
          className={
            isActive['category']
              ? 'tab-active tab tab-bordered h-full  !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('category')}
        >
          카테고리
        </a>
      </div>
    </div>
  );
};

export default MainTab;
