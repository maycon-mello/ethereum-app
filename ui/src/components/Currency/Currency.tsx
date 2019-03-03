import React from 'react';
import Loader from '../Loader';

type Prop = {
  value: number | string,
  code?: string,
  isLoading?: boolean,
}

export const formatValue = (value: number | string) => {
  return parseFloat(`${value}`).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// TODO: Need to implement the currency format component
class Currency extends React.Component<Prop, any> {
  render() {
    const { value = 0, isLoading } = this.props;

    if (isLoading) {
      return <Loader size={12} />
    }

    return (
      <React.Fragment>
        ${ formatValue(value) }
      </React.Fragment>
    )
  }
}

export default Currency;