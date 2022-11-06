import React, { useEffect } from "react";
import { nftContractConfig } from "../contract-abi-nfts";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

const MintNFT = ({ url }) => {
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

  const test = () => {
    console.log("clicked");
    console.log(nftMintData);
    console.log(mint);
    mint?.();
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => test()}>
        Mint
      </button>

      <p>{txSuccess ? "Succees" : "no success"}</p>
      <p>{txError ? "Error" : "no success"}</p>
      <p>{txData ? txData : "no txData"}</p>
    </div>
  );
};

export default MintNFT;
