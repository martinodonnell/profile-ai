import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi } from '../contract-abi';
import { createNftFromUrl } from '../libs/createNft';
import { NFTStorage, File } from 'nft.storage'
import { EnsResolveFromAddr } from '../libs/ensResolve';
import { apiKey } from '../env'
import Dashboard from './Dashboard'
import Prompt from './Prompt'
import Loading from './Loading'
import SelectImage from './SelectImage'

const contractConfig = {
  address: '0xA2bE5C3ea1f5658A3A4773f4B87eA1Cd92721Ef9',
  abi,
};

const Home = () => {
  const [mounted, setMounted] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState();
  const [promptValue, setPromptValue] = React.useState('');
  const [go, setGo] = React.useState(false);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => setMounted(true), []);

  const { isConnected } = useAccount();

  const { data: totalSupplyData1 } = useContractRead({
    ...contractConfig,
    functionName: 'images',
    args: [7000, 0]
  });

  const { data: totalSupplyData2 } = useContractRead({
    ...contractConfig,
    functionName: 'images',
    args: [7000, 1]
  });

  useEffect(() => {
    const array = [totalSupplyData1, totalSupplyData2].filter((url) => url !== null)
    setImages(array)
    console.log(array)
  },[totalSupplyData1, totalSupplyData2])

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'callMidpoint',
    args: [promptValue]
  });

  useEffect(() => {
    console.log("hasdadasd")
    const fetchEndName = async () => {
      console.log("Sdsdsdsd")
      console.log(await EnsResolveFromAddr())
    }
    fetchEndName()
  }, [])

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError
  } = useContractWrite(contractWriteConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;

  const selectImage = (e, url) => {
    console.log("Hello", url)
    setSelectedImage(url)
  }

  useEffect(() => {
    if(isMinted) {
      setTimeout(() => setPage(2), 10000);
    }
  }, [isMinted])

  if (!isConnected) {
    return <Dashboard/>
  }

  const submitPromp = () => {
    setGo(true)
    mint?.()
  }

  if (!promptValue || !go) {
    return <Prompt setPromptValue={setPromptValue} promptValue={promptValue} submit={submitPromp}/>
  }

  if(page == 1) {
    return <Loading/>
  } else {
    return <SelectImage/>
  }

  return (
    <div>
      <div className="container">
        <div className='d-flex flex-column'>
        <div className=''>
          <div style={{ padding: '24px 24px 24px 0' }}>
            <h1>NFT Demo Mint</h1>
            <ConnectButton />

            {mintError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {mintError.message}
              </p>
            )}
            {txError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {txError.message}
              </p>
            )}
          </div>
        </div>

        {mounted && isConnected && !isMinted && (
          <button
            style={{ marginTop: 24 }}
            // disabled={!mint || isMintLoading || isMintStarted}
            className="button"
            data-mint-loading={isMintLoading}
            data-mint-started={isMintStarted}
            onClick={() => {
              console.log("Clicked")
              mint?.('hello')
            }}
          >
            {isMintLoading && 'Waiting for approval'}
            {isMintStarted && 'Minting...'}
            {!isMintLoading && !isMintStarted && 'Mint'}
          </button>
        )}

        {isMinted && (
          <div>Hello</div>
        )}
        <div>
          {isConnected && (
            <div>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="prompt" value={promptValue} onChange={e => setPromptValue(e.target.value)}/>
              </div>


              <button className='btn btn-primary' disabled={!promptValue} onClick={() => setGo(true)}>Go</button>
            </div>
          )}
          {go && (
            <div>
              <section className="pb-4">
                <div className="bg-white border rounded-5">
                  <section className="p-4 text-center w-100">
                    <section>
                      <section>
                        <div className="row">
                          {images.map(url => (
                            <div className="col-lg-4 mb-4 mb-lg-0" onClick={(e) => selectImage(e, url)}>
                              <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
                                <img src={url} className="w-100"/>
                                <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">
                                  <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    </section>
                  </section>
                </div>

                {selectedImage && (
                  <div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                      <div className="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light">
                        <img src={selectedImage} className="w-100"/>
                        <a href="#!" data-mdb-toggle="modal" data-mdb-target="#exampleModal2">
                          <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                        </a>
                      </div>
                    </div>

                    <button className='btn btn-primary' disabled={!promptValue} onClick={() => createNftFromUrl('File1', "Description 1", selectedImage)}>Mint</button>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
