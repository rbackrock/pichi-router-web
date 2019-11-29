import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button, InputNumber } from "antd";
import { actionCreator } from '../../store';
import { bindActionCreators } from "redux";
import uuid from 'uuid/v1';

const FormItem = Form.Item;

class DestinationsFormItem extends PureComponent {
  render() {
    const { formItemCommonLayout, formItemLayoutWithOutLabel } = this.props;
    const keysName = 'destinationKeys',
      fieldName = 'destination';
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator(keysName, { initialValue: ['initDestination'] });
    const keysValue = getFieldValue(keysName);

    return (
      <Fragment>
        {
          keysValue.map((k, index) => (
            <FormItem
              {...(index === 0 ? formItemCommonLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Destination' : ''}
              key={k}
            >
              <FormItem
                style={{display: 'inline-block', width: '50%', marginRight: '10px'}}
              >
                {
                  getFieldDecorator(`${fieldName}[${index}][0]`, {
                    rules: [{required: true, message: 'Please input destination name.'}]
                  })(
                    <Input placeholder="Destination name" style={{ width: '100%' }} />
                  )
                }
              </FormItem>
              <FormItem
                style={{display: 'inline-block', width: '40%', marginRight: '10px'}}
              >
                {
                  getFieldDecorator(`${fieldName}[${index}][1]`, {
                    rules: [{required: true, message: 'Please input destination value.'}]
                  })(
                    <InputNumber placeholder="Destination value" style={{ width: '100%'}} />
                  )
                }
              </FormItem>
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
          <Button type="dashed" onClick={() => this.handleAddItem(keysName)} style={{ width: '100%' }}>
            <Icon type="plus" /> Add Destination
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

export default connect(stateMapToProps, dispatchMapToProps)(DestinationsFormItem);
