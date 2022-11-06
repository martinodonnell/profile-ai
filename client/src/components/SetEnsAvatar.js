import React from "react";
import { useAccount, useEnsName, useProvider, useEnsResolver } from "wagmi";
import { ENS } from "@ensdomains/ensjs";

const SetEnsAvatar = ({ ipfsUri, disabled }) => {
  const { address } = useAccount();
  const {
    data: name,
    // isError,
    // isLoading,
  } = useEnsName({
    address,
    // chainId: 0,
  });
  const provider = useProvider({ chainId: 1 });
  const { resolver, isError, isLoading } = useEnsResolver({
    name: "jackcollins.eth",
    chainId: 1,
  });

  const setAvatar = async ({ url }) => {
    console.log(address);
    console.log(await provider.lookupAddress(address));
    console.log(name);
    console.log(resolver);
    resolver.setAvatar({ name, url: ipfsUri });

    const ENSInstance = new ENS();
    const ens = await ENSInstance.setProvider(provider);
    console.log(ens);
  };

  return (
    <button className="btn btn-primary" onClick={setAvatar} disabled={disabled}>
      Set as ENS Avatar for {name}
    </button>
  );
};

export default SetEnsAvatar;
