import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form, Input, Button, Modal, Select, Icon} from "antd";
import { actionCreator } from '../../store';
import { bindActionCreators } from "redux";

import RangeFormItem from './rangeFormItem';
import IngressNameFormItem from './ingressNameFormItem';
import IngressTypeFormItem from './ingressTypeFormItem';
import PatternFormItem from './patternFormItem';
import DomainFormItem from './domain';
import CountryCodeFormItem from './countryCodeFormItem';

const FormItem = Form.Item;

class RulesForm extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      visible,
      onCancel,
      onOK,
      form
    } = this.props;
    const { formItemCommonLayout, formItemLayoutWithOutLabel } = this.formItemCommonConfig();

    return (
      <Modal
        visible={visible}
        title="Rules"
        okText="Save"
        onCancel={onCancel}
        onOk={onOK}
        width={660}
        centered={true}
        destroyOnClose={true}>
        <Form layout="horizontal" >
          <FormItem
            {...formItemCommonLayout}
            label="Name"
          >
            {
              form.getFieldDecorator('name', {
                rules: [{
                  required: true,
                  whitespace: true,
                  pattern: /^\w+$/,
                  message: 'name only supports letters, numbers, underscores'
                }]
              })(<Input placeholder="Please input rules name." style={{ width: '80%', marginRight: 8 }}/>)
            }
          </FormItem>

          <RangeFormItem
            form={this.props.form}
            formItemCommonLayout={formItemCommonLayout}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
          />

          <IngressNameFormItem
            form={this.props.form}
            formItemCommonLayout={formItemCommonLayout}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
          />

          <IngressTypeFormItem
            form={this.props.form}
            formItemCommonLayout={formItemCommonLayout}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
          />

          <PatternFormItem
            form={this.props.form}
            formItemCommonLayout={formItemCommonLayout}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
          />

          <DomainFormItem
            form={this.props.form}
            formItemCommonLayout={formItemCommonLayout}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
          />

          <CountryCodeFormItem
            form={this.props.form}
            formItemCommonLayout={formItemCommonLayout}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
          />
        </Form>
      </Modal>
    );
  }

  formItemCommonConfig() {
    return {
      formItemCommonLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          span: 20,
          offset: 4
        }
      }
    }
  }
}

const stateMapToProps = (state) => {
  return {

  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  };
};

export default connect(stateMapToProps, dispatchMapToProps)(RulesForm);
