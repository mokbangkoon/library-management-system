import { useState } from 'react';

const clickLogin = () => {
  console.log('클릭');
};

const LoginButton = () => {
  return (
    <div>
      <button
        className="bg-[#242424] text-[#fff] leading-7 text-base font-B tracking-[-0.6px] rounded-[0.25rem] w-[7rem] h-11 ml-5"
        onClick={clickLogin}
      >
        로그인
      </button>
    </div>
  );
};

export default LoginButton;
