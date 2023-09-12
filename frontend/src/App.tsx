// 기본 css
import './index.css';
// Page 및 컴포넌트
import Nav from '@components/Common/Nav/Nav';
import DetailPage from '@pages/detail/DetailPage';
import MainPage from '@pages/main/MainPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}
export default App;
