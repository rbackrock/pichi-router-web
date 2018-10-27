import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from '../../store';
import {Form, Input, InputNumber, Modal, Select} from "antd";
import egressesAdapterTypeList from '@common/resource/egressesAdapterType'
import cryptoMethodList from '@common/resource/cryptoMethod';
import * as formRules from './data/rules';

const FormItem = Form.Item;
const Option = Select.Option;

class EgressesForm extends PureComponent {
  constructor(props) {
    super(props);
    this.actions = this.props.actions;

    this.renderFormItem = this.renderFormItem.bind(this);
    this.handleAdapterTypeOnSelect = this.handleAdapterTypeOnSelect.bind(this);
  }

  render() {
    const {
      visible,
      onCancel,
      onOK,
      form
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="Egresses"
        okText="Save"
        onCancel={onCancel}
        onOk={onOK}
        width={550}
        centered={true}
        destroyOnClose={true}
        afterClose={ () => this.actions.changeEgressesFormAdapterType(egressesAdapterTypeList[0]) }>
        <Form layout="horizontal" >
          {
            this.renderFormItem().map(formItemConfig => {
              let { fieldName, opts } = formItemConfig.fieldDecorator;

              return (
                <FormItem {...formItemConfig.item} {...formItemConfig.formItemCommonLayout}>
                  {
                    getFieldDecorator(fieldName, opts)(formItemConfig.renderItem)
                  }
                </FormItem>
              )
            })
          }
        </Form>
      </Modal>
    );
  }

  renderAdapterTypeSelector() {
    if (egressesAdapterTypeList.length > 0) {
      return this.props.form.getFieldDecorator('type', {
        initialValue: egressesAdapterTypeList[0],
      })(
        <Select onSelect={this.handleAdapterTypeOnSelect} style={{ width: 90 }}>
          {
            egressesAdapterTypeList.map(item => {
              return <Option key={item} value={item}>{item}</Option>
            })
          }
        </Select>
      );
    }

    return null;
  }

  renderFormItem() {
    const ignoreFieldList = {
      http: ['password', 'method'],
      socks5: ['password', 'method'],
      direct: ['password', 'method'],
      reject: ['password', 'method'],
      ss: []
    };
    const ignoreFormItemList = ignoreFieldList[this.props.adapterType];

    const formItemCommonLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      }
    };
    const formItemConfig = [
      {
        name: 'name',
        formItemCommonLayout,
        item: {
          key: 'name',
          label: 'name',
        },
        fieldDecorator: {
          fieldName: 'name',
          opts: {
            rules: formRules.name
          }
        },
        renderItem: <Input placeholder="Please input egresses name." />
      },
      {
        name: 'host',
        formItemCommonLayout,
        item: {
          key: 'Host',
          label: 'Host'
        },
        fieldDecorator: {
          fieldName: 'host',
          opts: {
            rules: formRules.host
          }
        },
        renderItem: <Input placeholder="Please input host, support ipv6." addonBefore={this.renderAdapterTypeSelector()} />
      },
      {
        name: 'port',
        formItemCommonLayout,
        item: {
          key: 'port',
          label: 'Port'
        },
        fieldDecorator: {
          fieldName: 'port',
          opts: {
            rules: formRules.port
          }
        },
        renderItem: <InputNumber placeholder="Please input port." style={{width: '100%'}} maxLength="5" />
      },
      {
        name: 'password',
        formItemCommonLayout,
        item: {
          key: 'password',
          label: 'Password'
        },
        fieldDecorator: {
          fieldName: 'password',
          opts: {
            rules: formRules.password
          }
        },
        renderItem: <Input placeholder="Please input password." autoComplete="true" />
      },
      {
        name: 'method',
        formItemCommonLayout,
        item: {
          key: 'method',
          label: 'Crypto',
        },
        fieldDecorator: {
          fieldName: 'method',
          opts: {
            rules: formRules.method
          }
        },
        renderItem: (
          <Select placeholder="Please select a crypto method">
            {
              cryptoMethodList.map(item => (
                <Select.Option key={item} value={item}>{item}</Select.Option>
              ))
            }
          </Select>
        )
      }
    ];
    const willFormItemList = [];
    for (let formItem of formItemConfig) {
      if (ignoreFormItemList.indexOf(formItem.name) === -1) {
        willFormItemList.push(formItem);
      }
    }

    return willFormItemList;
  }

  handleAdapterTypeOnSelect(val) {
    this.actions.changeEgressesFormAdapterType(val);
  }
}

const stateMapToProps = (state) => {
  return {
    adapterType: state.getIn(['egresses', 'adapterType'])
  }
};

const dispatchMapToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(stateMapToProps, dispatchMapToProps)(EgressesForm);