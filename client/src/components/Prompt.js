import React from 'react';
import multihand from '../assets/multihand.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ConnectButtonHeader from './ConnectButtonHeader'

const Prompt = ({promptValue, setPromptValue, submit}) => {
  return (
    <div className="page">
      <div className="container">
        <div className='row'>
          <div className='col-7'>
            <h1>1. Be creative and descriptive! 🤩</h1>
            <p>We need your help putting in words how you would love your avatar to be like. You can go free text to create your own prompt or lets us help you with our prompt optimization engine.</p>
          </div>
          <div className='col-5'>
            <img src={multihand} alt="Multihand" width={'250px'} className='rounded-5 mb-5' />
          </div>
        </div>

        <div className='row w-100'>
          <p className='p-0'>Lets get a complete description of yourself...</p>
          <textarea class="form-control" aria-label="With textarea" rows={5} value={promptValue} onChange={e => setPromptValue(e.target.value)}/>
        </div>

        <div className='d-flex justify-content-center w-100'>
          <button className='btn btn-primary mt-5' disabled={!promptValue} onClick={() => submit(true)}>Create profile picture</button>
        </div>
        <ConnectButtonHeader />

      </div>
    </div>
  );
};

export default Prompt;
