import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectButtonHeader = () => {
  return (
    <div style={{position: 'absolute', right: '20px', top: '20px'}}>
      <ConnectButton />
    </div>
  );
};

export default ConnectButtonHeader;
