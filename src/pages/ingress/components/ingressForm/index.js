import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Radio
} from 'antd';
import { actionCreator } from '../../store';
import * as formRules from './data/rules';
import ingressAdapterTypeList from '@common/resource/ingressAdapterType';
import cryptoMethodList from '@common/resource/cryptoMethod';
import balanceTypeList from '@common/resource/ingressBalanceType.js';
import DestinationsFormItem from './destinationsFormItem';

const FormItem = Form.Item;
const Option = Select.Option;

class IngressRecordForm extends PureComponent {
  constructor(props) {
    super(props);

    this.actions = this.props.actions;
    this.renderFormItem = this.renderFormItem.bind(this);
    this.renderAdapterTypeSelector = this.renderAdapterTypeSelector.bind(this);
    this.handleAdapterTypeOnSelect = this.handleAdapterTypeOnSelect.bind(this);
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
        title="Ingress"
        okText="Save"
        onCancel={onCancel}
        onOk={onOK}
        width={690}
        centered={true}
        destroyOnClose={true}
        afterClose={ () => this.actions.changeIngressFormAdapterType(ingressAdapterTypeList[0]) }>
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
    )
  }

  renderAdapterTypeSelector() {
    if (ingressAdapterTypeList.length > 0) {
      return this.props.form.getFieldDecorator('type', {
        initialValue: ingressAdapterTypeList[0],
      })(
        <Select onSelect={this.handleAdapterTypeOnSelect} style={{ width: 90 }}>
          {
            ingressAdapterTypeList.map(item => {
              if (item !== 'https' && item !== 'socks5s') {
                return <Option key={item} value={item}>{item}</Option>;
              }

              return null;
            })
          }
        </Select>
      );
    }

    return null;
  }

  renderFormItem() {
    const ignoreFieldList = {
      http: ['password', 'method', 'destinationList', 'balance', 'cert_file', 'key_file'],
      https: ['password', 'method', 'destinationList', 'balance'],
      tunnel: ['password', 'method', 'tls', 'cert_file', 'key_file'],
      socks5: ['password', 'method', 'destinationList', 'balance', 'cert_file', 'key_file'],
      socks5s: ['password', 'method', 'destinationList', 'balance'],
      ss: ['destinationList', 'balance', 'tls', 'cert_file', 'key_file']
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 20,
        offset: 4
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
        renderItem: <Input placeholder="Please input ingress name." />
      },
      {
        name: 'bind',
        formItemCommonLayout,
        item: {
          key: 'Bind',
          label: 'Bind'
        },
        fieldDecorator: {
          fieldName: 'bind',
          opts: {
            rules: formRules.bind
          }
        },
        renderItem: <Input placeholder="Please input bind, support ipv6." addonBefore={this.renderAdapterTypeSelector()} />
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
                <Option key={item} value={item}>{item}</Option>
              ))
            }
          </Select>
        )
      },
      {
        name: 'balance',
        formItemCommonLayout,
        item: {
          key: 'balance',
          label: 'Balance',
        },
        fieldDecorator: {
          fieldName: 'balance',
          opts: {
            rules: formRules.balance
          }
        },
        renderItem: (
          <Select placeholder="Please select a balance type.">
            {
              balanceTypeList.map(item => (
                <Option key={item} value={item}>{item}</Option>
              ))
            }
          </Select>
        )
      },
      {
        name: 'destinationList',
        type: 'complex',
        renderItem: (
          <DestinationsFormItem
            formItemCommonLayout={formItemCommonLayout}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
            key={'destination'}
            form={this.props.form}
          />
        )
      },
      {
        name: 'tls',
        formItemCommonLayout,
        item: {
          key: 'tls',
          label: 'Tls'
        },
        fieldDecorator: {
          fieldName: 'tls',
          opts: {
            initialValue: false
          }
        },
        renderItem: (
          <Radio.Group onChange={this.handleToggleTlsChange}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        )
      },
      {
        name: 'cert_file',
        formItemCommonLayout,
        item: {
          key: 'cert_file',
          label: 'CertFile'
        },
        fieldDecorator: {
          fieldName: 'cert_file',
          opts: {
            rules: [{ required: true }]
          }
        },
        renderItem: <Input placeholder="Please input cert file path." autoComplete="true" />
      },
      {
        name: 'key_file',
        formItemCommonLayout,
        item: {
          key: 'key_file',
          label: 'KeyFile'
        },
        fieldDecorator: {
          fieldName: 'key_file',
          opts: {
            rules: [{ required: true }]
          }
        },
        renderItem: <Input placeholder="Please input key file path." autoComplete="true" />
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
    this.actions.changeIngressFormAdapterType(val);
  }

  handleToggleTlsChange(evt) {
    const typeVal = this.props.form.getFieldValue('type');
    this.props.form.resetFields();

    if (evt.target.value) {
      if (typeVal === 'http') {
        this.actions.changeIngressFormAdapterType('https');
      } else if (typeVal === 'socks5') {
        this.actions.changeIngressFormAdapterType('socks5s');
      }
    } else {
      this.actions.changeIngressFormAdapterType(typeVal);
    }
  }
}

const mapStateToProps = (state) => {
  return {
    adapterType: state.getIn(['ingress', 'adapterType'])
  }
};

const mapDispatchToPros = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToPros)(IngressRecordForm);
