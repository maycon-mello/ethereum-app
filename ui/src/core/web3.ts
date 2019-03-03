/* istanbul ignore file */

/**
 * Inject provider from metamask web3 into the local web3 instance
 * 
 */

// TODO: Use code spliting to improve web3 loading
// Whole web3 package has 244.37 KB

import Web3 from 'web3';
import { Provider } from 'web3/providers';
 
let localProvider: Provider | null;

// TODO: Declare ethereum on Global type
// @ts-ignore
if (global.ethereum) {
  // @ts-ignore
  localProvider = global.ethereum;
} else if (global.web3) {
  localProvider = global.web3.currentProvider;
}

// = window.ethereum ? window.ethereum : window.web3.currentProvider; 


export default async function getWeb3(): Promise<Web3 | null> {
  if (!localProvider) {
    return null;
  }

  const web3: Web3 = new Web3(localProvider)

  // @ts-ignore
  if (global.ethereum) {
    try {
      // @ts-ignore
      await localProvider.enable();
    } catch(err) {
      return null;
    }
  }

  return web3;
};