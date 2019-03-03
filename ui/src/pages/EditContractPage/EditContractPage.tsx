/* istanbul ignore file */

import React from 'react';
import Contract from '../../model/Contract';
import Loader from '../../components/Loader';
import { Form, Input, Icon, Button, Popconfirm } from 'antd';
import FormItem from '../../components/FormItem';
import './EditContractPage.scss';

export interface Props {
  contract: Contract,
  isLoading: boolean,
  canSave: boolean,
  onSave: any,
  onRemove: any,
  setContractProp: any,
  onBack: any,
}

class EditContractPage extends React.Component<Props, any> {
  handleInputChange = (evt: any) => this.props.setContractProp(evt.target.name, evt.target.value);

  render() {
    const {
      contract,
      isLoading,
      canSave,
      onSave,
      onRemove,
      onBack,
    } = this.props;

    if (isLoading) {
      return (
        <div>
          <h1>Edit Contract</h1>
          <Loader />
        </div>
      )
    }

    return (
      <div className="edit-contract-page">
        <h1>Edit Contract</h1>
        <div className="actions">
          <div className="left">
            <Button onClick={onBack} className="back-btn">Back</Button>
          </div>
          <Button.Group className="right">
            <Button disabled={!canSave} onClick={onSave} type="primary" className="save-contract-btn">Save</Button>
            <Popconfirm
              title="Are you sure to delete this contract?"
              onConfirm={onRemove}
              okText="Yes"
              cancelText="No"
            >
              <Button className="remove-contract-btn">Remove</Button>
            </Popconfirm>
          </Button.Group>
        </div>

        <Form>
          <FormItem label="Name">
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="default"
              placeholder="Enter your name"
              value={contract.user.name}
              name="user.name"
              onChange={this.handleInputChange}
            />
          </FormItem>
          <FormItem label="Surname">
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="default"
              placeholder="Enter your surname"
              value={contract.user.surname}
              name="user.surname"
              onChange={this.handleInputChange}
            />
          </FormItem>
          <FormItem label="Email">
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              size="default"
              placeholder="Enter your email"
              value={contract.user.email}
              name="user.email"
              onChange={this.handleInputChange}

            />
          </FormItem>
          <FormItem label="Date">
            <Input
              size="default"
              value={contract.date && new Date(contract.date).toString()}
              name="type"
              disabled
            />
          </FormItem>
          <FormItem label="Address">
            <Input
              size="default"
              value={contract.address}
              name="type"
              disabled
            />
          </FormItem>
          <FormItem label="Currency">
            <Input
              size="default"
              value={contract.currency}
              name="currency"
              disabled
            />
          </FormItem>
          <FormItem label="Deploy price">
            <Input
              size="default"
              value={contract.deployPriceInUsd}
              name="deployPriceInUsd"
              disabled
            />
          </FormItem>
          <FormItem label="Balance">
            <Input
              size="default"
              value={contract.balance}
              name="balance"
              disabled
            />
          </FormItem>
          <FormItem label="Contract type">
            <Input
              size="default"
              value={contract.type}
              name="type"
              disabled
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default EditContractPage;