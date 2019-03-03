import React from 'react';
import { Line } from 'react-chartjs-2';
import { createChartProps } from './ChartUtils';
import { ExchangeRate } from '../../services/ExchangeRatesService';

export interface Props {
  rates: Array<ExchangeRate>;
  width: number;
  height: number;
}

export default class ExchangeRateChart extends React.Component<Props, any> {
  render() {
    const { rates, width, height } = this.props;
    const { data, options } = createChartProps(rates);

    return (
      <Line
        data={data}
        options={options}
        width={width}
        height={height}
      />
    );
  }
}
