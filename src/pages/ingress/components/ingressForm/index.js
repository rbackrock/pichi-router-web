import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select
} from 'antd';
import { actionCreator } from '../../store';
import * as formRules from './data/rules';
import ingressAdapterTypeList from '@common/resource/ingressAdapterType';
import cryptoMethodList from '@common/resource/cryptoMethod';


const FormItem = Form.Item;
const Option = Select.Option;

class IngressRecordForm extends PureComponent {
  constructor(props) {
    super(props);

    this.actions = this.props.actions;

    this.renderFormItem = this.renderFormItem.bind(this);
    this.renderAdapterTypeSelector = this.renderAdapterTypeSelector.bind(this);
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
        title="Ingress"
        okText="Save"
        onCancel={onCancel}
        onOk={onOK}
        width={550}
        centered={true}
        destroyOnClose={true}
        afterClose={ () => this.actions.changeIngressFormAdapterType(ingressAdapterTypeList[0]) }>
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
    this.actions.changeIngressFormAdapterType(val);
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
