import { login } from '../../../apis/api';

const LoginButton = ({ authenticated, setUser }) => {
  const clickLogin = async (e, authenticated) => {
    if (!authenticated) {
      const res = await login({
        email: 'minjae2246@gmail.com',
        password: '1234qwer@',
      });
      setUser({ name: res.name });
      localStorage.setItem('access-token', res.accessToken);
      localStorage.setItem('refresh-token', res.refreshToken);
    } else {
      setUser(null);
    }
  };

  return (
    <div>
      <button
        className="bg-[#242424] text-[#fff] leading-7 text-base font-B tracking-[-0.6px] rounded-[0.25rem] w-[7rem] h-11 ml-5"
        onClick={(e) => clickLogin(e, authenticated)}
      >
        {authenticated ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
};

export default LoginButton;
