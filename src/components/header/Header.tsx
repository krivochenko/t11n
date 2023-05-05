import { TonConnectButton } from '@tonconnect/ui-react';
import './Header.scss';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export const Header = () => {
  return <div className="header">
    <Link to={'/'}>
      <img className="logo" src={logo} alt="" />
    </Link>
    <TonConnectButton />
  </div>;
}