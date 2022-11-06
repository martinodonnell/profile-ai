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
import Dashboard from './Dashboard'
import Prompt from './Prompt'
import Loading from './Loading'
import SelectImage from './SelectImage'
import ChatSupport from './ChatSupport'

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
  },[totalSupplyData1, totalSupplyData2])

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'callMidpoint',
    args: [promptValue]
  });

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

  useEffect(() => {
    if(isMinted) {
      setTimeout(() => setPage(2), 4000);
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
};

export default Home;
