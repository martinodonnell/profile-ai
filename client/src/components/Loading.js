import React from 'react';
import grouphands from '../assets/grouphands.png';
import loadingAnimation from '../assets/loading-animation.gif';
import ConnectButtonHeader from './ConnectButtonHeader'

const Loading = () => {
  return (
    <div className="page">
      <div className="container justify-content-center">
        <div className='text-center'>
          <img src={grouphands} alt="Hand" width={'200px'} className='rounded-5 mb-5' />
          <h1 style={{fontSize: '48px'}}>Lets build a</h1>
          <h1 style={{fontSize: '48px'}}><strong>cool profile picture</strong> together</h1>

          <h2 style={{fontSize: '24px'}}>Working to create an amazing profile picture 🛠</h2>

          <div className='mt-5'>
            <p className='m-0'>We are all in this together, right?</p>
            <p className='m-0'>Please confirm the transaction and wait some seconds.</p>
          </div>

          <img src={loadingAnimation} alt="Hand" width={'200px'} />

          <ConnectButtonHeader />
        </div>
      </div>
    </div>
  );
};

export default Loading;
