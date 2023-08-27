import { useState } from "react";
import logo from "../../../assets/images/icon-ubcare.png";

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
      <div className="mr-8">
        <img src={logo} alt="logo" />
      </div>
      <div className="tabs font-B">
        <a
          className={isActive["today"] ? "tab-active tab" : "tab"}
          onClick={() => clickTab("today")}
        >
          투데이
        </a>
        <a
          className={isActive["community"] ? "tab-active tab" : "tab"}
          onClick={() => clickTab("community")}
        >
          커뮤니티
        </a>
        <a
          className={isActive["myBook"] ? "tab-active tab" : "tab"}
          onClick={() => clickTab("myBook")}
        >
          내서재
        </a>
        <a
          className={isActive["category"] ? "tab-active tab" : "tab"}
          onClick={() => clickTab("category")}
        >
          카테고리
        </a>
      </div>
    </div>
  );
};

export default MainTab;
