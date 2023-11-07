import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import CategoryPage from './pages/category/CategoryPage.tsx';
import ReportPage from './pages/community/ReportPage.tsx';
import StudyPage from './pages/community/StudyPage.tsx';
import CommunityPage from './pages/community/CommunityPage.tsx';
import DetailPage from './pages/detail/DetailPage.tsx';
import LoginPage from './pages/login/LoginPage.tsx';
import MainPage from './pages/main/MainPage.tsx';
import MyBookPage from './pages/my-book/MyBook.Page.tsx';
import store from './Stores/store-config';
import PurchasedBookPage from './pages/list/PurchasedBookPage.tsx';
import BestBookPage from './pages/list/BestBookPage.tsx';
import DepartmentBookPage from './pages/list/DepartmentBookPage.tsx';
import FindBookPage from './pages/list/FindBookPage.tsx';
import SharedBookPage from './pages/list/SharedBookPage.tsx';
import ReviewBookPage from './pages/list/ReviewBookPage.tsx';
import { Department } from './apis/enum.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/book/:id',
        element: <DetailPage />,
      },
      {
        path: '/books/purchased',
        element: <PurchasedBookPage />,
      },
      {
        path: '/books/best',
        element: <BestBookPage />,
      },
      {
        path: '/books/share',
        element: <SharedBookPage />,
      },
      {
        path: '/books/find',
        element: <FindBookPage />,
      },
      {
        path: '/books/team',
        element: <DepartmentBookPage />,
      },
      {
        path: '/books/review',
        element: <ReviewBookPage />,
      },
      {
        path: '/category/:id/*',
        element: <CategoryPage />,
      },
      {
        path: '/my-book',
        element: <MyBookPage />,
      },
      {
        path: '/community',
        element: <CommunityPage />,
        children: [
          {
            path: 'study',
            element: <StudyPage />,
          },
          {
            path: 'report',
            element: <ReportPage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
