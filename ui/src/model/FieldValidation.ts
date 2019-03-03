
export default interface FieldValidation {
  hasFeedback: boolean,
  validateStatus: 'error' | 'success' | 'validating' | 'warning',
  help: string,
}