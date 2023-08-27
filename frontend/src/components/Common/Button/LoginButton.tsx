import { useState } from "react";

const clickLogin = () => {
  console.log("클릭");
};

const LoginButton = () => {
  return (
    <div>
      <button
        className="bg-[#242424] text-[#fff] text-sm font-M rounded-md w-16 h-8"
        onClick={clickLogin}
      >
        로그인
      </button>
    </div>
  );
};

export default LoginButton;
