import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

export async function EnsResolveFromAddr(){
  const { address } = useAccount();
  const url = "https://mainnet.gateway.tenderly.co/GbOVk8vhnTsWdbfDLWXtT"
  const provider = new ethers.providers.JsonRpcProvider(url)
  const name =  await provider.lookupAddress(address)
  return name
}
