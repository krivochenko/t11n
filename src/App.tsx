import './App.scss';
import '@twa-dev/sdk';
import { App as AntdApp, Empty, Layout } from 'antd';
import { Header } from './components/header/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { Editor } from './components/editor/Editor';
import { Address } from '@ton/core';
import { Home } from './components/home/Home';

function App() {
  const [ownerAddress, setOwnerAddress] = useState<Address | null>();
  const resetOwnerAddress = useCallback(() => setOwnerAddress(undefined), []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash.indexOf('tgWebAppData') === -1) {
      if (Address.isFriendly(hash)) {
        try {
          setOwnerAddress(Address.parseFriendly(hash).address);
        } catch (e) {
          setOwnerAddress(null);
        }
      }
    }
  }, []);

  useEffect(() => {
    window.location.hash = !ownerAddress ? '' : `#${ownerAddress}`;
  }, [ownerAddress]);

  return <AntdApp>
    <Layout>
      <Layout className="content">
        <Header resetOwnerAddress={resetOwnerAddress}/>
        {
          ownerAddress === null
            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Page URL is incorrect'} />
            : ownerAddress ? <Editor ownerAddress={ownerAddress}/> : <Home setOwnerAddress={setOwnerAddress}/>
        }
      </Layout>
    </Layout>
  </AntdApp>;
}

export default App;
