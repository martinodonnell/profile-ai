import { Chat } from "@pushprotocol/uiweb";
import { pushApiKey } from '../env'
import {
  useAccount
} from 'wagmi';

const ChatSupport = () =>{
  const { address } = useAccount();

  return (
    <Chat
      account={address} //user address
      supportAddress="0x84e87837C550F38a0B64C2365689Fce90DCf9774" //support address
      apiKey={pushApiKey}
      env="staging"
    />
  );
};


export default ChatSupport;
