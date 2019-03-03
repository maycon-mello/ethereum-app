/* istanbul ignore file */

import * as R from 'ramda';

export type ValidationStatus = {
  status: 'valid' | 'invalid' | 'pending',
  message: string,
};

export type ValidationResult = {
  isValid: boolean,
  fields: Map<String, ValidationStatus>,
}

export type ValidationRule = {
  rule: any,
  message: string,
}

export type ValidationRules = Array<ValidationRule>;

export type ValidationRulesMap = Map<String, ValidationRules>;

export function validate(validationRules: ValidationRulesMap, data: any): ValidationResult {
  const map = new Map();
  let isValid = true;

  validationRules.forEach((rules, key) => {
    const value = R.view(R.lensPath(key.split('.')))(data);
    const firstInvalidRule = rules.find((item: any) => !item.rule(value, data));
    let validationStatus;

    if (firstInvalidRule) {
      isValid = false;
      validationStatus = {
        status: 'invalid',
        message: firstInvalidRule.message,
      }
    } else {
      validationStatus = {
        status: 'valid',
      }
    }

    map.set(key, validationStatus);
  });

  return {
    fields: map,
    isValid: isValid, 
  };
}
