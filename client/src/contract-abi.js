export const abi = [
  {
    "inputs": [],"stateMutability": "nonpayable",
"type": "constructor"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "requestId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "prompt",
    "type": "string"
  },
  {
    "indexed": false,
    "internalType": "uint64",
    "name": "index",
    "type": "uint64"
  }
],
"name": "RequestMade",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "requestId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "string[]",
    "name": "image_source",
    "type": "string[]"
  }
],
"name": "ResponseReceived",
"type": "event"
},
{
"inputs": [
  {
    "internalType": "string",
    "name": "prompt",
    "type": "string"
  },
  {
    "internalType": "uint64",
    "name": "index",
    "type": "uint64"
  }
],
"name": "callMidpoint",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "_requestId",
    "type": "uint256"
  },
  {
    "internalType": "uint64",
    "name": "_midpointId",
    "type": "uint64"
  },
  {
    "internalType": "string[]",
    "name": "image_source",
    "type": "string[]"
  }
],
"name": "callback",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "idx",
"outputs": [
  {
    "internalType": "uint64",
    "name": "",
    "type": "uint64"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint64",
    "name": "",
    "type": "uint64"
  },
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"name": "images",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
}
]