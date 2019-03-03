import React from 'react';
import { Table, Divider, Popconfirm } from 'antd';
import Contract from '../../model/Contract';
import Currency from '../Currency';

export type Props = {
  contracts: Array<Contract>,
  onRemove: any,
  onEdit: any,
};

export function normalizeContract(contract: Contract): any {
  return {
    id: contract.id,
    name: `${contract.user.name} ${contract.user.surname}`,
    balance: contract.balance,
  }
}

export type ColumnProps = {
  onRemove: () => void,
  onEdit: () => void,
};

export const createColumns = ({ onRemove, onEdit }: ColumnProps) => [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Balance',
  dataIndex: 'balance',
  key: 'balance',
  render: (balance: string) => <Currency value={balance} />,
}, {
  title: 'Actions',
  key: 'actions',
  render: (_: any, record: any) => (
    <>
      <a onClick={onEdit.bind(null, record.id)} className="edit-item" href="javascript:;">
        Edit
      </a>
      <Divider type="vertical" />
      <Popconfirm
        title="Are you sure to delete this contract?"
        onConfirm={onRemove.bind(null, record.id)}
        okText="Yes"
        cancelText="No"
      >
        <a className="remove-item" href="javascript:;">Delete</a>
      </Popconfirm>
    </> 
  ),
}];

const createRowKey = (record: any) => record.id;

class ContractsTable extends React.Component<Props, {}> {
  render() {
    const dataSource = this.props.contracts.map(normalizeContract)

    return (
      <Table dataSource={dataSource} columns={createColumns({
        onRemove: this.props.onRemove,
        onEdit: this.props.onEdit,
      })} rowKey={createRowKey}/>
    );
  }
}

export default ContractsTable;
