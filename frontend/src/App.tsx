// 기본 css
import '@src/index.css';
// Page 및 컴포넌트
import Nav from '@components/Common/Nav/Nav';
import DetailPage from '@pages/detail/DetailPage';
import MainPage from '@pages/main/MainPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


function App() {
  return (
    <div>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/book/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
