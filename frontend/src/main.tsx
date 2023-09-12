import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import CategoryPage from './pages/CategoryPage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import DetailPage from './pages/detail/DetailPage.tsx';
import MainPage from './pages/main/MainPage.tsx';
import MyBookPage from './pages/MyBook.Page.tsx';

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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
