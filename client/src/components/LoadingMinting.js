import React from 'react';
import loveHands from '../assets/love-hands.png';
import loadingAnimation from '../assets/loading-animation.gif';
import ConnectButtonHeader from './ConnectButtonHeader'
import ChatSupport from './ChatSupport'

const Loading = () => {
  return (
    <div className="page">
      <div className="container justify-content-center">
        <div className='text-center'>
          <img src={loveHands} alt="Hand" width={'200px'} className='rounded-5 mb-5' />
          <h1 style={{fontSize: '48px'}}>Minting the coolest profile</h1>
          <h1 style={{fontSize: '48px'}}>picture you will get 🥳</h1>

          <div className='mt-5'>
            <p className='m-0'>Please confirm the transaction and send some love over,</p>
            <p className='m-0'>NFTs doesnt grow from trees.</p>
          </div>

          <img src={loadingAnimation} alt="Hand" width={'200px'} />

          <ConnectButtonHeader />
        </div>
      </div>
    </div>
  );
};

export default Loading;
