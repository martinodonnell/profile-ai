import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi } from '../contract-abi';

const contractConfig = {
  address: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
  abi,
};

const Home = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'mint',
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: 'totalSupply',
    watch: true,
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  const isMinted = txSuccess;

  const selectImage = (url) => {
    console.log("Hello", url)
  }

  const imageUrls = [
    'https://cdn.openai.com/dall-e/v2/samples/anthropomorphism/091432009673a3a126fdec860933cdce_10.png',
    'https://cdn.openai.com/dall-e/v2/samples/anthropomorphism/091432009673a3a126fdec860933cdce_10.png',
    'https://cdn.openai.com/dall-e/v2/samples/anthropomorphism/091432009673a3a126fdec860933cdce_10.png',
    'https://cdn.openai.com/dall-e/v2/samples/anthropomorphism/091432009673a3a126fdec860933cdce_10.png'
  ]

  return (
    <div className="page">
      <div className="container">
        <div style={{ flex: '1 1 auto' }}>
          <div style={{ padding: '24px 24px 24px 0' }}>
            <h1>NFT Demo Mint</h1>
            <p style={{ margin: '12px 0 24px' }}>
              {totalMinted} minted so far!
            </p>
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

        <div style={{ flex: '0 0 auto' }}>
          {isConnected && (

            <div>
              {imageUrls.map(url => (
                <a onClick={() => selectImage(url)}>
                <img alt="Qries" src={url} width="100" height="100"/>
              </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
