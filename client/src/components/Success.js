import React from 'react';
import loveHands from '../assets/love-hands.png';
import loadingAnimation from '../assets/loading-animation.gif';
import ConnectButtonHeader from './ConnectButtonHeader'
import ChatBubble from './ChatBubble'

const Success = ({url}) => {
  return (
    <div className="page">
      <div className="container justify-content-center">
        <div className='text-center'>
          <img src={url} alt="Hand" width={'200px'} className='rounded-5 mb-5' />
          <h1 style={{fontSize: '48px'}}>You got it! Its yours now, so lets</h1>
          <h1 style={{fontSize: '48px'}}>go brag about it everywhere 🎉</h1>

          <div className='mt-5'>
            <p className='m-0'>You can easily set up this profile picture as your digital</p>
            <p className='m-0'>identity image across:.</p>
          </div>

          <ConnectButtonHeader />
        </div>
      </div>
    </div>
  );
};

export default Success;
