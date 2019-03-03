/* istanbul ignore file */

import React from 'react';
import { Button } from 'antd';
import ContractsTable from '../../components/ContractsTable';
import Loader from '../../components/Loader';

import './ContractListPage.scss';

interface Props {
  onEdit: () => void,
  onRemove: () => void,
  onNewContract: () => void,
  contracts: any, // TODO: better typing
  isLoading: boolean,
}

class ContractList extends React.Component<Props, any> {
  render() {
    const {
      isLoading,
      contracts,
      onNewContract,
      onEdit,
      onRemove,
    } = this.props;

    return (
      <div className="contract-list-page">
        <h1>Contract list</h1>
        { isLoading
          ? <Loader size={24} />
          : <ContractsTable
              contracts={contracts}
              onEdit={onEdit}
              onRemove={onRemove}
            />
        }
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          className="add-contract-btn"
          size="large"
          onClick={onNewContract}
        />
      </div>
    );
  }
}

export default ContractList;