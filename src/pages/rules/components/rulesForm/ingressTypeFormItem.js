import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form, Icon, Button, Select} from "antd";
import { actionCreator } from '../../store';
import { bindActionCreators } from "redux";
import uuid from 'uuid/v1';
import ingressAdapterTypeList from '@common/resource/ingressAdapterType';

const FormItem = Form.Item;
const Option = Select.Option;

class IngressTypeFormItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { formItemCommonLayout, formItemLayoutWithOutLabel } = this.props;
    const keysName = 'ingressTypeKeys',
      fieldName = 'ingress_type';
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator(keysName, { initialValue: ['initIngressType'] });
    const keysValue = getFieldValue(keysName);

    return (
      <Fragment>
        {
          keysValue.map((k, index) => (
            <FormItem
              {...(index === 0 ? formItemCommonLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Ingress Type' : ''}
              key={k}
            >
              {
                getFieldDecorator(`${fieldName}[${index}]`, {
                  rules: index === 0 ? [] : [{ required: true, whitespace: true, message: "Please select ingressType's name or delete this field." }]
                })(
                  <Select placeholder="Please select a ingress adapter" style={{ width: '80%', marginRight: 8 }}>
                    {
                      ingressAdapterTypeList.map(item => (
                        <Option key={item} value={item}>{item}</Option>
                      ))
                    }
                  </Select>
                )
              }
              {keysValue.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keysValue.length === 1}
                  onClick={() => this.handleRemoveItem(keysName, fieldName, index)}
                />
              ) : null}
            </FormItem>
          ))
        }
        <FormItem
          {...formItemLayoutWithOutLabel}
        >
          <Button type="dashed" onClick={() => this.handleAddItem(keysName)} style={{ width: '80%' }}>
            <Icon type="plus" /> Add ingress type
          </Button>
        </FormItem>
      </Fragment>
    )
  }

  handleRemoveItem(keysName, fieldName, removeIndex) {
    const { form } = this.props;
    const keys = form.getFieldValue(keysName);
    const fieldValue = form.getFieldValue(fieldName);

    if (keys.length > 1) {
      form.setFieldsValue({
        [`${keysName}`]: keys.filter((key, index) => index !== removeIndex),
        [`${fieldName}`]: fieldValue.filter((item, index) => index !== removeIndex)
      });
    }
  }

  handleAddItem(keysName) {
    const { form } = this.props;
    const keys = form.getFieldValue(keysName);

    form.setFieldsValue({
      [keysName]: keys.concat(uuid())
    });
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

export default connect(stateMapToProps, dispatchMapToProps)(IngressTypeFormItem);
