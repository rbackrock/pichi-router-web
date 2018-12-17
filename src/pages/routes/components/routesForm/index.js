import React, { PureComponent } from 'react';
import {Form, Modal, Select} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class RoutesForm extends PureComponent {
  render() {
    const {
      visible,
      onCancel,
      onOK,
      form,
      rulesList,
      egressesList
    } = this.props;
    const { getFieldDecorator } = form;
    const formItemCommonLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      }
    };

    return (
      <Modal
        visible={visible}
        title="Rule"
        okText="Save"
        onCancel={onCancel}
        onOk={onOK}
        width={550}
        centered={true}
        destroyOnClose={true}
      >
        <Form layout="horizontal" >
          <FormItem
            {...formItemCommonLayout}
            label='Rule'
          >
            {
              getFieldDecorator('rule', {
                rules: [{
                  required: true,
                }]
              })(
                <Select
                  placeholder="Please select a rule"
                >
                  {
                    rulesList.map(rule => (
                      <Option key={rule} value={rule}>{rule}</Option>
                    ))
                  }
                </Select>
              )
            }
          </FormItem>
          <FormItem
            {...formItemCommonLayout}
            label='Egress'
          >
            {
              getFieldDecorator('egress', {
                rules: [{
                  required: true,
                }]
              })(
                <Select
                  placeholder="Please select a egress"
                >
                  {
                    egressesList.map(egress => (
                      <Option key={egress} value={egress}>{egress}</Option>
                    ))
                  }
                </Select>
              )
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default RoutesForm;
