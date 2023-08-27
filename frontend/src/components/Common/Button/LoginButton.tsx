import { useState } from "react";

const clickLogin = () => {
  console.log("클릭");
};

const LoginButton = () => {
  return (
    <div>
      <button
        className="bg-[#242424] text-[#fff] text-sm font-M"
        onClick={clickLogin}
      >
        로그인
      </button>
    </div>
  );
};

export default LoginButton;
