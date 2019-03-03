
export interface AbiItem {
  constant: boolean;
  inputs: Array<any>;
  name: string;
  outputs: Array<any>;
  payable: boolean;
  stateMutability: string;
  type: string;
}

export interface LotteryConfig {
  ticketPrice: number;
}

export interface GuessNumberConfig {
  numberToGuess: number;
  ticketPrice: number;
}

export interface DonationConfig {
  minValue: number;
}

export type ContractType = 'donation' | 'guess' | 'lottery';

export default interface Contract {
  id: string;
  address?: string;
  user: {
    name: string;
    surname?: string;
    email?: string;
  },
  date?: number;
  currency?: string;
  deployPriceInUsd?: number;
  amountInUsd?: number;
  balance?: number;
  type?: ContractType;
  config: LotteryConfig | GuessNumberConfig | DonationConfig | any;
};
