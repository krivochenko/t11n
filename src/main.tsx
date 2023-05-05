import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ConfigProvider, theme } from 'antd';

const manifestUrl = 'https://krivochenko.github.io/t11n/tonconnect-manifest.json';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl} uiPreferences={{ borderRadius: 's' }}>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <App/>
      </ConfigProvider>
    </QueryClientProvider>
  </TonConnectUIProvider>
);
