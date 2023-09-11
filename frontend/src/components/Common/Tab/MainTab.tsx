import logo from '@assets/images/icon-ubcare.png';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '@src/apis/enum';
const MainTab = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('community')) {
      setIsActive({ ...isActive, community: true });
    }
    if (location.pathname.includes('myBook')) {
      setIsActive({ ...isActive, myBook: true });
    }
    if (location.pathname.includes('category')) {
      setIsActive({ ...isActive, category: true });
    }
    if (location.pathname === '/') {
      setIsActive({ ...isActive, today: true });
    }
  }, [location]);
  const [isActive, setIsActive] = useState({
    today: false,
    community: false,
    myBook: false,
    category: false,
  });

  const clickTab = (name: keyof typeof isActive) => {
    setIsActive(() => ({
      today: false,
      community: false,
      myBook: false,
      category: false,
      [name]: true,
    }));
  };

  return (
    <div className="flex items-center">
      <div className="mr-10">
        <img src={logo} alt="logo" />
      </div>
      <div className="tabs font-B h-16 flex items-center">
        <Link
          to="/"
          className={
            isActive['today']
              ? 'tab-active tab tab-bordered h-full !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('today')}
        >
          투데이
        </Link>

        <Link
          to="/community"
          className={
            isActive['community']
              ? 'tab-active tab tab-bordered h-full !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('community')}
        >
          커뮤니티
        </Link>

        <Link
          to="/mybook"
          className={
            isActive['myBook']
              ? 'tab-active tab tab-bordered h-full !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('myBook')}
        >
          내서재
        </Link>

        <Link
          to={`/category/${Category['경제/경영']}`}
          className={
            isActive['category']
              ? 'tab-active tab tab-bordered h-full !border-[#FF6600] text-[#FF6600] text-xl'
              : 'tab text-[#868E96] text-xl'
          }
          onClick={() => clickTab('category')}
        >
          카테고리
        </Link>
      </div>
    </div>
  );
};

export default MainTab;
