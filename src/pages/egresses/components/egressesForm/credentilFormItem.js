import React, { PureComponent } from 'react';
import {Form, Input} from 'antd';
import {bindActionCreators} from "redux";
import {actionCreator} from "../../../ingress/store";
import {connect} from "react-redux";

const FormItem = Form.Item;

class CredentialFormItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const fieldName = 'credential';
    const { formItemCommonLayout } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <FormItem
        {...formItemCommonLayout}
        label={'Credential'}
      >
        <FormItem
          style={{display: 'inline-block', width: '48%', marginRight: '10px'}}
        >
          {
            getFieldDecorator(`${fieldName}[0]`, {
              rules: [{required: true, message: 'Please input credential username.'}]
            })(
              <Input placeholder="username" style={{ width: '100%' }} />
            )
          }
        </FormItem>
        <FormItem
          style={{display: 'inline-block', width: '48%'}}
        >
          {
            getFieldDecorator(`${fieldName}[1]`, {
              rules: [{required: true, message: 'Please input credential password.'}]
            })(
              <Input placeholder="password" style={{ width: '100%' }} />
            )
          }
        </FormItem>
      </FormItem>
    )
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

export default connect(stateMapToProps, dispatchMapToProps)(CredentialFormItem);

