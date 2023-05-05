import { TonConnectButton } from '@tonconnect/ui-react';
import './Header.scss';
import { Link } from 'react-router-dom';

export const Header = () => {
  return <div className="header">
    <Link to={'/'}>
      <img className="logo" src={'/logo.png'} alt="" />
    </Link>
    <TonConnectButton />
  </div>;
}