import React, { useEffect } from "react";
import { nftContractConfig } from "../contract-abi-nfts";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const MintNFT = ({ url, disabled, setIsLoadingNft }) => {
  const { address } = useAccount();

  const { config: nftContractWriteConfig } = usePrepareContractWrite({
    ...nftContractConfig,
    functionName: "mintNFT",
    args: [address, url],
  });

  const {
    data: nftMintData,
    write: mint,
    isLoading: isNftMintLoading,
    isSuccess: isNftMintStarted,
    error: nftMintError,
  } = useContractWrite(nftContractWriteConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: nftMintData?.hash,
  });

  useEffect(() => {
    console.log("succesful txData", txData)
  }, [txSuccess])

  useEffect(() => {
    setIsLoadingNft(isNftMintLoading)
  }, [isNftMintLoading])


  return (
    <button className="btn btn-primary" onClick={() => mint?.()} disabled={disabled}>
      Create NFT
    </button>
  );
};

export default MintNFT;
