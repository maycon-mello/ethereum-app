import React from 'react';
import * as R from 'ramda';
import { Form, Input, Select, InputNumber } from 'antd';
import FormItem from '../FormItem';
import Contract from '../../model/Contract';
import { ValidationStatus } from '../../core/Validation';
import ConfigMapping from './ContractConfigMapping';

export interface Props {
  onChange: any,
  contract: Contract,
  formValidation: Map<string, ValidationStatus>,
}

const formLayout = {
  labelCol: {
    xs: { span: 24 }, sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 }, sm: { span: 14 },
  },
};

const CurrencyFormatter = {
  formatter: (value: any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  parser: (value: any) => value.replace(/\$\s?|(,*)/g, ''),
};

class ContractConfigForm extends React.Component<Props, any> {
  handleChange = (prop: string) => (value: any) => this.props.onChange(prop, value);

  renderNumberField({ label, propKey, isCurrency }: { label: string, propKey: string, isCurrency: boolean }) {
    const { formValidation, contract } = this.props;
    let extraProps = isCurrency ? CurrencyFormatter : {};
    let value: any = R.view(R.lensPath(propKey.split('.')))(contract);

    return (
      <FormItem
        label={label}
        validation={formValidation.get(propKey)}
        layout={formLayout}
      >
        <InputNumber
          { ...extraProps}
          value={value}
          onChange={this.handleChange(propKey)}
          style={{ width: '100%' }}
          name={propKey}
        />
      </FormItem>
    )
  }

  render() {
    const { contract } = this.props;
    const type: string = contract.type || '';
    const fields = ConfigMapping[type] || [];
  
    
    return (
      <Form className="contract-config-form">
        <FormItem label="Selected contract" layout={formLayout}>
          <Input
            size="default"
            value={contract.type}
            name="type"
            disabled
          />
        </FormItem>
        <FormItem label="Currency" layout={formLayout}>
          <Select
            size="default"
            value={contract.currency}
            onChange={this.handleChange('currency')}
            className="contract-currency-select"
          >
            <Select.Option value="USD">USD</Select.Option>
          </Select>
        </FormItem>
        {
          fields.map((config: any) => this.renderNumberField(config))
        }
      </Form>
    );
  }
}

export default ContractConfigForm;
