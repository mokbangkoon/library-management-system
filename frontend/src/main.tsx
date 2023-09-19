import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import CategoryPage from './pages/CategoryPage.tsx';
import ReportPage from './pages/community/ReportPage.tsx';
import StudyPage from './pages/community/StudyPage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import DetailPage from './pages/detail/DetailPage.tsx';
import LoginPage from './pages/login/LoginPage.tsx';
import MainPage from './pages/main/MainPage.tsx';
import MyBookPage from './pages/my-book/MyBook.Page.tsx';
import store from './Stores/store-config';

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
        path: '/category/:id/',
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
