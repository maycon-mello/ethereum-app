import React from 'react';
import { Icon, Row, Col } from 'antd';
import { Card } from 'antd';

import Contract from '../../model/Contract';

import './ContractTypeForm.scss';

const { Meta } = Card;

interface Props {
  onChange: any,
  contract: Contract,
}

export const contractTypes = [{
  title: 'Lottery',
  description: 'Allow users to bet in your lottery',
  type: 'lottery',
  image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
}, {
  title: 'Donation',
  description: 'User can donate money',
  type: 'donation',
  image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
}, {
  title: 'Guess the number',
  description: 'User needs to guess a number',
  type: 'guess',
  image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
}];

class ContractTypeForm extends React.Component<Props, any> {
  handleContractSelect = (type: string) => () => this.props.onChange('type', type);

  render() {
    const { contract } = this.props;
    return (
      <Row gutter={16} className="contract-type">
        {
          contractTypes.map((contractType) => (
            <Col span={8}>
              <Card
                hoverable
                style={{ width: 200 }}
                cover={<img alt={`${contractType.type}`} src={contractType.image} />}
                onClick={this.handleContractSelect(contractType.type)}
                className={`contract-card-${contractType.type}`}
              >
                <Meta
                  title={contractType.title}
                  description={contractType.description}
                />
                { contract.type === contractType.type && (
                  <div className="check-mark">
                    <Icon type="check-circle" style={{ fontSize: '33px' }}/>
                  </div>
                )}
              </Card>
            </Col>
          ))
        }
      </Row>
    );
  }
}

export default ContractTypeForm;
