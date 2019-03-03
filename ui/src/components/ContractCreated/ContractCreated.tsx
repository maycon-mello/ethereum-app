import React from 'react';
import { Col, Row } from 'antd';
import Contract from '../../model/Contract';

export interface Props {
  contract: Contract,
  goToContractList: () => void,
}

class ContractCreated extends React.Component<Props, any> {
  render() {
    const { goToContractList } = this.props;

    return (
      <Row gutter={16} className="contract-created">
        <Col span={24} style={{ textAlign: 'center' }}>
          Awesome, your contract is ready!
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <a onClick={goToContractList} className="contract-list-anchor" href="javascript:;">Click here</a> to see all your contracts.
        </Col>
      </Row>
    )
  }
}

export default ContractCreated;