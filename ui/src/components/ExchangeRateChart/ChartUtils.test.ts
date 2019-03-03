import { expect } from 'chai';
import { createChartProps } from './ChartUtils';

describe('Components: ChartUtils', () => {
  const rates = [{
    period: '12-22',
    price: 2,
  }, {
    period: '12-23',
    price: 3,
  }];

  const props = createChartProps(rates);

  it('expect to create options', () => {
    expect(props.options).to.exist;
  });

  it('expect to create data', () => {
    const { datasets = [] } = props.data;

    expect(props.data).to.exist;
    expect(props.data.labels).to.have.lengthOf(rates.length);
    expect(datasets).to.have.lengthOf(1);
    expect(datasets[0].data).to.have.lengthOf(rates.length);
  });
});
