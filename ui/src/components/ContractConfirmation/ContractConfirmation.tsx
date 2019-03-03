import React from 'react';
import { Row, Col } from 'antd';
import Contract from '../../model/Contract';
import Loader from '../Loader';

export interface Props {
  contract: Contract,
  isLoading: boolean,
  loadingDetails?: string,
}

export const getDeployPrice = (contract: Contract): string => {
  const { deployPriceInUsd } = contract;
  return deployPriceInUsd ? deployPriceInUsd.toFixed(3) : '0.000';
}

class ContractConfirmation extends React.Component<Props, any> {
  render() {
    const { contract, isLoading } = this.props;

    return (
      <Row gutter={16} className="contract-confirmation">
        <Col span={24} style={{ textAlign: 'center' }}>
          {
            isLoading
            ? <Loader />
            : (
              <span className="confirmation-message">
                To create this contract you need to pay ${getDeployPrice(contract)}, please confirm
              </span>
            )
          }
        </Col>
      </Row>
    )
  }
}

export default ContractConfirmation;