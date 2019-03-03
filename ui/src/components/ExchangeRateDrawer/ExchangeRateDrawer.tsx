import React from 'react';
import { Drawer, Button } from 'antd';
import ExchangeRateChart from '../ExchangeRateChart';
import Currency from '../Currency';
import Loader from '../Loader';

interface Props {
  rates: any;
  isLoading: boolean,
  visible: boolean,
  toggleDrawer: () => void,
  currentRate: number,
}

export default class ExchangeRateDrawer extends React.Component<Props, any> {
  render() {
    const { rates, isLoading, visible, toggleDrawer, currentRate } = this.props;

    return (
      <React.Fragment>
        <Button onClick={toggleDrawer} className="current-rate-button">
          USD/ETH: <Currency value={currentRate} isLoading={isLoading} />
        </Button>
        <Drawer
          title="Exchange Rate on last hours"
          width={720}
          onClose={toggleDrawer}
          visible={visible}
          style={{
            overflow: 'auto',
            height: 'calc(100% - 108px)',
            paddingBottom: '108px',
          }}
        >
          {
            isLoading
            ? <Loader />
            : <ExchangeRateChart rates={rates} width={100} height={50} />
          }
        </Drawer>
      </React.Fragment>
    );
  }
}
