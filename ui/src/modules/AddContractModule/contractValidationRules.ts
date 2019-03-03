/* istanbul ignore file */
// TODO: test this one

import * as R from 'ramda';
import validator from 'validator';
import { ValidationRulesMap } from '../../core/Validation';
import { Step } from './addContractState';
import Contract from '../../model/Contract';

const rules:Map<Step, ValidationRulesMap> = new Map();

// Identity rules
const identityRules: ValidationRulesMap = new Map();

identityRules.set('user.name', [{
  rule: R.compose(R.not, validator.isEmpty),
  message: 'The name is required'
}]);

identityRules.set('user.email', [{
  rule: R.compose(R.not, validator.isEmpty),
  message: 'Email is required',
}, {
  rule: validator.isEmail,
  message: 'It doesn\'t look like a valid e-mail',
}]);

// Contract Type rules
const contractTypeRules: ValidationRulesMap = new Map();

contractTypeRules.set('type', [{
  rule: (value: string) => !!value,
  message: 'Contract type is required'
}]);

// Contract Config rules
const contractConfigRules: ValidationRulesMap = new Map();

contractConfigRules.set('config.minValue', [{
  rule: (value: string, contract: Contract) => contract.type === 'donation' ? contract.config.minValue > 0 : true,
  message: 'Please provide a minimum value for the donation'
}]);

contractConfigRules.set('config.ticketPrice', [{
  rule: (value: string, contract: Contract) => {
    if (contract.type === 'lottery' || contract.type === 'guess') {
      return contract.config.ticketPrice > 0
    } 

    return true;
  },
  message: 'Please provide the ticket value'
}]);

contractConfigRules.set('config.numberToGuess', [{
  rule: (value: string, contract: Contract) => {
    if (contract.type === 'guess') {
      return contract.config.numberToGuess > 0
    } 

    return true;
  },
  message: 'Please provide a number, so that user\'s can try to guess it'
}]);

rules.set('identity', identityRules);
rules.set('contractType', contractTypeRules);
rules.set('transaction', contractConfigRules);

export default rules;

