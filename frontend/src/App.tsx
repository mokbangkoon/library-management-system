// 기본 css
import './index.css';
// Page 및 컴포넌트
import Nav from '@components/Common/Nav/Nav';
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
