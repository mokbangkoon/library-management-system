import { activeSign } from '@stores/signInSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginButton = ({ authenticated }) => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const clickLogin = async (e, authenticated) => {
    if (!authenticated) {
      navigateTo('/login');
    } else {
      dispatch(activeSign());
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
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
