// 기본 css
import '@src/index.css';
// Page 및 컴포넌트
import Nav from '@components/Common/Nav/Nav';
import DetailPage from '@pages/detail/DetailPage';
import MainPage from '@pages/main/MainPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import MyBookPage from './pages/MyBook.Page';
import CommunityPage from './pages/CommunityPage';

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/book/:id" element={<DetailPage />} />{' '}
          <Route path="/community" element={<CommunityPage />} />{' '}
          <Route path="/mybook" element={<MyBookPage />} />{' '}
          <Route path="/category/:id" element={<CategoryPage />} />{' '}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
