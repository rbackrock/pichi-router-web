import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from '../../store';
import {Form, Input, InputNumber, Modal, Radio, Select} from "antd";
import egressesAdapterTypeList from '@common/resource/egressesAdapterType'
import cryptoMethodList from '@common/resource/cryptoMethod';
import egressesModeList from '@common/resource/egressesMode'
import * as formRules from './data/rules';
import CredentialFormItem from './credentilFormItem';

const FormItem = Form.Item;
const Option = Select.Option;

class EgressesForm extends PureComponent {
  constructor(props) {
    super(props);
    this.actions = this.props.actions;

    this.renderFormItem = this.renderFormItem.bind(this);
    this.handleAdapterTypeOnSelect = this.handleAdapterTypeOnSelect.bind(this);
    this.handleRejectModeType = this.handleRejectModeType.bind(this);
    this.handleToggleTlsChange = this.handleToggleTlsChange.bind(this);
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

              if (formItemConfig.fieldDecorator) {
                let { fieldName, opts } = formItemConfig.fieldDecorator;
                return (
                  <FormItem {...formItemConfig.item} {...formItemConfig.formItemCommonLayout}>
                    {
                      getFieldDecorator(fieldName, opts)(formItemConfig.renderItem)
                    }
                  </FormItem>
                )
              } else {
                return formItemConfig.renderItem
              }
            })
          }
        </Form>
      </Modal>
    );
  }

  renderAdapterTypeSelector() {
    if (egressesAdapterTypeList.length > 0) {
      return this.props.form.getFieldDecorator('type', {
        initialValue: egressesAdapterTypeList[0]
      })(
        <Select onSelect={this.handleAdapterTypeOnSelect} style={{ width: 90 }}>
          {
            egressesAdapterTypeList.map(item => {
              if (item !== 'https' && item !== 'socks5s') {
                return <Option key={item} value={item}>{item}</Option>
              } else {
                return null;
              }
            })
          }
        </Select>
      );
    }

    return null;
  }

  renderModeSelector() {
    return this.props.form.getFieldDecorator('mode', {
      initialValue: this.props.modeType,
    })(
      <Select onSelect={this.handleRejectModeType} style={{ width: 100 }}>
        {
          egressesModeList.map(item => {
            return <Option key={item} value={item}>{item}</Option>
          })
        }
      </Select>
    );
  }

  renderFormItem() {
    const ignoreFieldList = {
      http: ['password', 'method', 'mode', 'ca_file', 'insecure', 'credentialInfo'],
      https: ['password', 'method', 'mode'],
      socks5: ['password', 'method', 'mode', 'ca_file', 'insecure', 'credentialInfo'],
      socks5s: ['password', 'method', 'mode'],
      direct: ['password', 'method', 'port', 'mode', 'tls', 'ca_file', 'insecure', 'credentialInfo'],
      reject: ['password', 'method', 'port', 'tls', 'ca_file', 'insecure', 'credentialInfo'],
      ss: ['mode', 'tls', 'ca_file', 'insecure', 'credentialInfo']
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
          label: 'Name',
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
            rules: formRules.host(!(this.props.adapterType === 'direct' || this.props.adapterType === 'reject'))
          }
        },
        renderItem: <Input disabled={this.props.adapterType === 'direct' || this.props.adapterType === 'reject'} placeholder="Please input host, support ipv6." addonBefore={this.renderAdapterTypeSelector()} />
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
      },
      {
        name: 'mode',
        formItemCommonLayout,
        item: {
          key: 'mode',
          label: 'Mode'
        },
        fieldDecorator: {
          fieldName: 'delay',
          opts: {
            rules: formRules.delay(this.props.modeType === 'fixed')
          },
        },
        renderItem: <Input disabled={this.props.modeType === 'random'} placeholder="Please input delay." addonBefore={this.renderModeSelector()} />
      },
      {
        name: 'tls',
        formItemCommonLayout,
        item: {
          key: 'tls',
          label: 'TLS'
        },
        fieldDecorator: {
          fieldName: 'tls',
          opts: {
            initialValue: false
          }
        },
        renderItem: (
          <Radio.Group onChange={this.handleToggleTlsChange}>
            <Radio value={true}>Enabled</Radio>
            <Radio value={false}>Disabled</Radio>
          </Radio.Group>
        )
      },
      {
        name: 'ca_file',
        formItemCommonLayout,
        item: {
          key: 'ca_file',
          label: 'CaFile'
        },
        fieldDecorator: {
          fieldName: 'ca_file',
          opts: {
            rules: [{ required: true }]
          }
        },
        renderItem: <Input placeholder="Please input ca file path." autoComplete="true" />
      },
      {
        name: 'insecure',
        formItemCommonLayout,
        item: {
          key: 'insecure',
          label: 'Insecure'
        },
        fieldDecorator: {
          fieldName: 'insecure',
          opts: {
            initialValue: true
          }
        },
        renderItem: (
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        )
      },
      {
        name: 'credentialInfo',
        type: 'complex',
        renderItem: (
          <CredentialFormItem
            formItemCommonLayout={formItemCommonLayout}
            key={'credential'}
            form={this.props.form}
          />
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
    this.props.form.resetFields();
    this.actions.changeEgressesFormAdapterType(val);
  }

  handleRejectModeType(val) {
    this.actions.changeEgressesFormModeType(val);
  }

  handleToggleTlsChange(evt) {
    const typeVal = this.props.form.getFieldValue('type');
    this.props.form.resetFields();

    if (evt.target.value) {
      if (typeVal === 'http') {
        this.actions.changeEgressesFormAdapterType('https');
      } else if (typeVal === 'socks5') {
        this.actions.changeEgressesFormAdapterType('socks5s');
      }
    } else {
      this.actions.changeEgressesFormAdapterType(typeVal);
    }
  }
}

const stateMapToProps = (state) => {
  return {
    adapterType: state.getIn(['egresses', 'adapterType']),
    modeType: state.getIn(['egresses', 'modeType']),
  }
};

const dispatchMapToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(stateMapToProps, dispatchMapToProps)(EgressesForm);
