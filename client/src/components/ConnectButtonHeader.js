import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../assets/logo.png';

const ConnectButtonHeader = () => {
  return (
    <>
      <img src={logo} alt="logo" width={'150px'} style={{position: 'absolute', left: '20px', top: '20px' }} className='rounded-pill'/>
      <div style={{position: 'absolute', right: '20px', top: '20px'}}>
        <ConnectButton />
      </div>
    </>
  );
};

export default ConnectButtonHeader;
