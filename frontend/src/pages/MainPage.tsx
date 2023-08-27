import LoginButton from "../components/Common/Button/LoginButton";
import SearchInput from "../components/Common/Input/SearchInput";
import SearchSelectBox from "../components/Common/SelectBox/SearchSelectBox";
import MainTab from "../components/Common/Tab/MainTab";

const MainPage = () => {
  return (
    <div>
      <div className="max-w-[1920px] ">
        <div className="flex justify-between items-center max-w-[1440px] m-auto p-6 h-16">
          <MainTab />
          <LoginButton />
        </div>
        <div className="h-[3px] bg-[#DFDFDF]"></div>
      </div>
      <div className="flex items-center m-auto p-6 bg-[#FAFAFA]">
        <SearchSelectBox />
        <SearchInput />
      </div>
    </div>
  );
};

export default MainPage;
