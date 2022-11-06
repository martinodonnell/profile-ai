import React from 'react';
import loveHands from '../assets/love-hands.png';
import instagram from '../assets/instagram.png';
import lens from '../assets/lens.png';
import twitter from '../assets/twitter.png';
import ens from '../assets/ens.png';
import download from '../assets/download.png';
import { ensResolveFromAddr } from '../libs/ensResolve'
import ConnectButtonHeader from './ConnectButtonHeader'
import { useAccount } from 'wagmi';

const Success = ({url}) => {
  const [ensName, setEnsName] = React.useState('')
  const { address } = useAccount();


  React.useEffect(() => {
    const fetchEndName = async () => {
      const name = await ensResolveFromAddr(address)
      console.log('name')
      setEnsName(name)
    }
    fetchEndName()
  }, [])

  return (
    <div className="page">
      <div className="container justify-content-center">
        {ensName}
        <div className='text-center'>
          <img src={url} alt="profile picture" width={'200px'} className='rounded-5 my-5' />
          <h1 style={{fontSize: '48px'}}>You got it! It's yours now, so let's</h1>
          <h1 style={{fontSize: '48px'}}>go brag about it everywhere! 🎉</h1>

          <div className='my-3'>
            <p className='m-0'>You can easily set up this profile picture as your digital</p>
            <p className='m-0'>identity image across:</p>
          </div>

          <div className='d-flex justify-content-evenly'>
            <img src={ens} alt="ens" width={'250px'} className='my-2' style={{cursor: "pointer"}}/>
            <img src={lens} alt="lens" width={'250px'} className='my-2' style={{cursor: "pointer"}}/>
          </div>

          <div className='d-flex justify-content-evenly'>
            <img src={twitter} alt="twitter" width={'250px'} className='my-2' style={{cursor: "pointer"}}/>
            <img src={instagram} alt="instagram" width={'250px'} className='my-2' style={{cursor: "pointer"}}/>
          </div>

          <div className='d-flex justify-content-center align-items-center pe-auto'  style={{cursor: "pointer"}}>
            <img src={download} alt="Hand" width={'30px'} className='my-2' />
            <p className='m-0'>Download</p>
          </div>

          <ConnectButtonHeader />
        </div>
      </div>
    </div>
  );
};

export default Success;
