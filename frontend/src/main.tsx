import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/main/MainPage.tsx';
import CategoryPage from './pages/CategoryPage.tsx';
import MyBookPage from './pages/MyBook.Page.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import BookListPage from './pages/list/BookListPage.tsx';

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
        path: '/category/:id/',
        element: <CategoryPage />,
      },
      {
        path: '/mybook',
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
