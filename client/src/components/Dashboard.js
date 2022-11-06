import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import cross from '../assets/cross.png';
import hand from '../assets/hand.png';
import gif from '../assets/git.gif';
import ConnectButtonHeader from './ConnectButtonHeader'

const Dashboard = () => {
  return (
    <div className="page">
      <div className="container justify-content-center">
        <div className='text-center'>
          <ConnectButtonHeader/>
          <img src={cross} alt="Cross" width={'150px'} style={{position: 'absolute', right: '353px', top: '90px' }}/>
          <img src={hand} alt="Hand" width={'200px'} style={{position: 'absolute', left: '206px', bottom: '101px', transform: 'rotate(290deg)'}}/>

          <img src={gif} alt="Hand" width={'200px'} className='rounded-5 mb-5' />
          <h1 style={{fontSize: '48px'}}>Lets build a</h1>
          <h1 style={{fontSize: '48px'}}><strong>cool profile picture</strong> together</h1>


          <h2 style={{fontSize: '24px'}}>Connect your wallet so we are ready to go!😎</h2>

          <div className='d-flex justify-content-center mt-5'>
            <ConnectButton className='justify-self' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
