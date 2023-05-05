import { TonConnectButton } from '@tonconnect/ui-react';
import './Header.scss';
import logo from './logo.png';

export const Header = (props: { resetOwnerAddress: () => void }) => {
  return <div className="header">
    <img className="logo" src={logo} alt="" onClick={props.resetOwnerAddress} />
    <TonConnectButton />
  </div>;
}