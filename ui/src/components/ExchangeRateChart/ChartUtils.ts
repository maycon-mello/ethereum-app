import { ChartOptions, ChartData } from 'chart.js';
import { ExchangeRate } from '../../services/ExchangeRatesService';

export interface ChartProps {
  options: ChartOptions;
  data: ChartData;
}

export function createChartProps(rates: Array<ExchangeRate>): ChartProps {
  const labels: Array<string> = [];
  const values: Array<number> = [];
  let minValue: number = rates[0].price;

  rates.forEach((item: ExchangeRate) => {
    labels.push(item.period);
    values.push(item.price);
    minValue = Math.min(minValue, item.price);
  });

  const data = {
    labels,
    datasets: [{
      label: 'ETH',
      data: values,
    }], 
  };

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          min: minValue * .99,
        }
    }]
    }
  };

  return {
    data,
    options,
  };
}