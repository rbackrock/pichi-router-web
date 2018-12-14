import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import {Form, Icon, Button, Input} from "antd";
import { actionCreator } from '../../store';
import { bindActionCreators } from "redux";
import uuid from 'uuid/v1';

const FormItem = Form.Item;

class CountryCodeFormItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { formItemCommonLayout, formItemLayoutWithOutLabel } = this.props;
    const keysName = 'countryKeys',
      fieldName = 'country';
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator(keysName, { initialValue: ['initCountryCode'] });
    const keysValue = getFieldValue(keysName);

    return (
      <Fragment>
        {
          keysValue.map((k, index) => (
            <FormItem
              {...(index === 0 ? formItemCommonLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Country Code' : ''}
              key={k}
            >
              {
                getFieldDecorator(`${fieldName}[${index}]`, {
                  rules: index === 0 ? [{ pattern: /^[A-Z]+$/, message: "Please input country's code of the capital letter or delete this field." }] : [{ required: true, whitespace: true, message: "Please input country's code of the capital letter or delete this field.", pattern: /^[A-Z]+$/}]
                })(<Input placeholder="Please input country." style={{ width: '80%', marginRight: 8 }}/>)
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
            <Icon type="plus" /> Add country code
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

export default connect(stateMapToProps, dispatchMapToProps)(CountryCodeFormItem);
