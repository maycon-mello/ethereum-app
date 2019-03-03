/* istanbul ignore file */
// TODO: test this one

import Contract from "../../model/Contract";
import { ValidationStatus } from "../../core/Validation";
import { TransactionObject } from "web3/eth/types";
import Web3Contract from 'web3/eth/contract';

export type Step = 'identity' | 'contractType' | 'transaction' | 'confirmation' | 'done';

export type PermittedSteps = {
  next: Step | undefined,
  previous: Step | undefined,
};

export type State = {
  isLoading: boolean,
  contract: Contract,
  formValidation: Map<String, ValidationStatus>,
  currentStep: Step,
  canGoNext: boolean,
  canGoBack: boolean,
  loadingDetails?:string,
  deployTransaction?: TransactionObject<Web3Contract>,
};

export const getEmptyContract = (): Contract => ({
  id: '',
  user: {
    name: '',
    surname: '',
    email: '',
  },
  address: '',
  balance: 0,
  amountInUsd: 0,
  deployPriceInUsd: 0,
  currency: 'USD',
  date: undefined,
  type: undefined,
  config: {
    numberToGuess: 0,
    ticketPrice: 0,
  },
});

export const getInitialState = (): State => ({
  isLoading: true,
  contract: getEmptyContract(),
  formValidation: new Map(),
  canGoBack: false,
  canGoNext: false,
  currentStep: 'identity',
  loadingDetails: '',
});

export const steps: Array<Step> = ['identity', 'contractType', 'transaction', 'confirmation', 'done'];
export const getPermittedSteps = (step: Step): PermittedSteps => {
  const idx = steps.findIndex(v => v === step);
  return {
    next: steps[idx + 1],
    previous: steps[idx - 1],
  };
}
