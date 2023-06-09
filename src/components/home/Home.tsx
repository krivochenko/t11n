import { useTonWallet } from '@tonconnect/ui-react';
import { Button, Col, List, Row } from 'antd';
import { Address } from 'ton-core';
import React, { useCallback, useMemo } from 'react';
import {
  CodeOutlined,
  DeploymentUnitOutlined,
  DollarOutlined,
  EditOutlined,
  EnvironmentOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import './Home.scss';
import { MyItemButton } from './my-item-button/MyItemButton';
import { GiftButton } from './gift-button/GiftButton';

const data = [
  {
    icon: <EnvironmentOutlined className="text-list-icon" />,
    text: 'T11N is a service that allows you to mint a unique <a href="https://github.com/ton-blockchain/TEPs/blob/master/text/0062-nft-standard.md" target="_blank" rel="noopener noreferrer">NFT</a> displaying on a world map all countries you have visited.'
  },
  {
    icon: <EditOutlined className="text-list-icon" />,
    text: 'You can edit the map at any time, including customizing its color scheme.',
  },
  {
    icon: <SafetyOutlined className="text-list-icon" />,
    text: 'Following the <a href="https://github.com/ton-blockchain/TEPs/blob/master/text/0085-sbt-standard.md" target="_blank" rel="noopener noreferrer">SBT</a> standard ensures that you can be confident that no one else will take ownership of your NFT.',
  },
  {
    icon: <DeploymentUnitOutlined className="text-list-icon" />,
    text: 'The service operates without a centralized backend. All data is stored on the blockchain, which ensures its high security.',
  },
  {
    icon: <CodeOutlined className="text-list-icon" />,
    text: 'The only centralized entity of the project is this website, but its source code is <a href="https://github.com/krivochenko/t11n" target="_blank" rel="noopener noreferrer">open</a> and can be run by anyone on their computer.',
  },
  {
    icon: <DollarOutlined className="text-list-icon" />,
    text: 'Creating an NFT costs 1.1 TON, and further map editing only incurs network fees (about 0.01 TON).',
  },
];

export type SetOwnerAddressFn = (ownerAddress: Address) => void;

export const Home = (props: { setOwnerAddress: SetOwnerAddressFn }) => {
  const wallet = useTonWallet();
  const myAddress = useMemo(() => wallet ? Address.parse(wallet.account.address) : null, [wallet]);
  const setMyAddress = useCallback(() => myAddress ? props.setOwnerAddress(myAddress) : undefined, [myAddress])

  return <Row gutter={[0, 20]}>
    <Col span={24}>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta avatar={item.icon} title={<div dangerouslySetInnerHTML={{ __html: item.text }} />}/>
          </List.Item>
        )}
      />
    </Col>
    {
      myAddress && setMyAddress
        ? <>
          <Col span={24}>
            <MyItemButton myAddress={myAddress} click={setMyAddress} />
          </Col>
          <Col span={24}>
            <GiftButton setOwnerAddress={props.setOwnerAddress} />
          </Col>
        </>
        : <Col span={24}>
          <Button block disabled>Connect your wallet first</Button>
        </Col>
    }
  </Row>;
}