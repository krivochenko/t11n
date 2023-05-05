import './App.scss';
import '@twa-dev/sdk';
import { App as AntdApp, Layout } from 'antd';
import { Header } from './components/header/Header';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';

const router = createBrowserRouter([
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
], { basename: window.location.href.indexOf('krivochenko.github.io/t11n') !== -1 ? '/t11n' : '/' });

function App() {
  return <AntdApp>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </AntdApp>;
}

export default App;
