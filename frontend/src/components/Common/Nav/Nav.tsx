import LoginButton from '@components/Common/Button/LoginButton';
import SearchInput from '@components/Common/Input/SearchInput';
import MainTab from '@components/Common/Tab/MainTab';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

const Nav: FC<any> = (props) => {
  const state = useSelector((state: any) => state);
  const authenticated = state.loginIn.active;
  return (
    <div className="max-w-[1920px]">
      <div className="flex justify-between items-center max-w-[1200px] m-auto pt-6 pb-6 h-16">
        <MainTab />
        <div className="flex items-center">
          <SearchInput />
          <LoginButton authenticated={authenticated} />
        </div>
      </div>
      <div className="h-[3px] bg-[#DFDFDF]"></div>
    </div>
  );
};

export default Nav;
