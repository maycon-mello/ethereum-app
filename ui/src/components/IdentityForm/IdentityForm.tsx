import React from 'react';
import { Form, Input, Icon } from 'antd';
import FormItem from '../FormItem';
import Contract from '../../model/Contract';
import { ValidationStatus } from '../../core/Validation';

interface Props {
  onChange: any,
  contract: Contract,
  formValidation: Map<String, ValidationStatus>,
}

class IdentityForm extends React.Component<Props, any> {
  handleInputChange = (evt: any) => this.props.onChange(evt.target.name, evt.target.value)

  render() {
    const { formValidation, contract } = this.props;
    return (
      <Form className="identity-form">
        <FormItem label="Name" validation={formValidation.get('user.name')}>
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
        <FormItem label="E-mail" validation={formValidation.get('user.email')}>
          <Input
            size="default"
            placeholder="Enter your e-mail"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={contract.user.email}
            name="user.email"
            onChange={this.handleInputChange}
          />
        </FormItem>
      </Form>
    );
  }
}

export default IdentityForm;
