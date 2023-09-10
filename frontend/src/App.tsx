// 기본 css
import './index.css';
// Page 및 컴포넌트
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav from './components/Common/Nav/Nav';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';


function App() {
  return (
    <div>
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/book/:id" element={<DetailPage />} />{' '}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
