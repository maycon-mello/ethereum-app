import React from 'react';
import { Form } from "antd";
import { ValidationStatus } from "../../core/Validation";

export type FieldProps = {
  validation?: ValidationStatus,
  layout?: any,
  label: string,
  children: any,
}

const defaultLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 21 },
  },
};

const validationStatusMapping: any = {
  valid: 'success',
  invalid: 'error',
  pending: 'validating',
}

export default function FormItem (props: FieldProps) {
  const validation: ValidationStatus | any = props.validation || {};
  const layout = props.layout || defaultLayout;

  return (
    <Form.Item
      label={props.label}
      {...layout}
      hasFeedback={!!validation.status}
      validateStatus={validationStatusMapping[validation.status]}
      help={validation.message}
    >
      { props.children }
    </Form.Item>
  )
}