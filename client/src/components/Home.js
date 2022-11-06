import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi } from '../contract-abi';

const contractConfig = {
  address: '0xf9dFa7abaAfFadFCD375a7C084fe258F902D834F',
  abi,
};

const Home = () => {
  const [mounted, setMounted] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState();
  const [promptValue, setPromptValue] = React.useState('');
  const [go, setGo] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const { isConnected } = useAccount();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'callMidpoint',
    args: [promptValue]
  });


  const { data: supplyData2 } = useContactReads({
    ...contractConfig,
    functionName: 'ResponseReceived',
    watch: true,
  });

  React.useEffect(() => {
    if (supplyData2){
      console.log("Supply Data 2 called", supplyData2)
    }
  }, [supplyData2]);

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError
  } = useContractWrite(contractWriteConfig);


  const {
    data: supplyData,

  } = useContractRead()
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

  const imageUrls = [
    'https://cdn.openai.com/dall-e/v2/samples/anthropomorphism/091432009673a3a126fdec860933cdce_10.png',
    'https://cdn.openai.com/dall-e/v2/samples/anthropomorphism/091432009673a3a126fdec860933cdce_10.png',
    'https://cdn.openai.com/dall-e/v2/samples/anthropomorphism/091432009673a3a126fdec860933cdce_10.png'
  ]

  useEffect(() => {
    console.log('txData', txData)
  }, [txData])

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
                          {imageUrls.map(url => (
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

                    <button className='btn btn-primary' disabled={!promptValue}>Mint</button>
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
