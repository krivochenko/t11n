import './App.scss';
import '@twa-dev/sdk';
import { App as AntdApp, Layout } from 'antd';
import { Header } from './components/header/Header';
import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';

const router = createHashRouter([
  {
    element: <Layout className="content">
      <Header/>
      <Outlet/>
    </Layout>,
    children: [
      { path: '', element: <HomePage /> },
      { path: ':address', element: <MapPage /> },
    ],
  },
]);

function App() {
  return <AntdApp>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </AntdApp>;
}

export default App;
