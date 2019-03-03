/* istanbul ignore file */
import { connect } from 'react-redux';
import { reduceState } from './utils';

export const mapStateToProps = optionFn => (state, props) => {
  const dispatch = () => false;
  const get = (type, ...args) => reduceState(state, type, ...args);

  return optionFn({
    dispatch,
    get,
    props,
  }).properties || {};
};

export const mapDispatchToProps = optionFn => (dispatch, props) => {
  const customDispatch = (type, payload) => dispatch({ type, ...payload });
  const get = () => false;
  const result = optionFn({
    dispatch: customDispatch,
    get: get,
    props: props,
  });
  if (result.init) {
    result.init();
  }
  return result.methods || {};
};

export default optionFunction => connect(() => mapStateToProps(optionFunction), () => mapDispatchToProps(optionFunction));
