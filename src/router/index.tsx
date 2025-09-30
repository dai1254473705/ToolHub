import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import DataTools from '../pages/tools/DataTools';
import EncryptionTools from '../pages/tools/EncryptionTools';
import DevTools from '../pages/tools/DevTools';
import FaviconGenerator from '../pages/tools/FaviconGenerator';
import TodoList from '../pages/tools/TodoList';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  { 
    path: '/',
    element: <Layout />,
    children: [
      { 
        path: '/',
        element: <Home />
      },
      { 
        path: '/data-tools',
        element: <DataTools />
      },
      { 
        path: '/encryption-tools',
        element: <EncryptionTools />
      },
      { 
        path: '/dev-tools',
        element: <DevTools />
      },
      { 
        path: '/favicon-generator',
        element: <FaviconGenerator />
      },
      { 
        path: '/todo-list',
        element: <TodoList />
      },
      { 
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}