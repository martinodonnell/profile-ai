import { ethers } from 'ethers';

export async function ensResolveFromAddr(address){
  const url = "https://goerli.gateway.tenderly.co/GbOVk8vhnTsWdbfDLWXtT"
  const provider = new ethers.providers.JsonRpcProvider(url)
  const name =  await provider.lookupAddress(address)
  return name
}
