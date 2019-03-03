/* istanbul ignore file */

import Contracts from './contracts.json';

const LotteryContract = Contracts[':Lottery'];

export default class SmartContracts {

  static getInterface(): any[] {
    return JSON.parse(LotteryContract.interface);
  }

  static getBytecode(): string {
    return LotteryContract.bytecode;
  }
}

