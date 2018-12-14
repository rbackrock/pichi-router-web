import React, { Fragment, PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Antd, {Divider, Form, message, Modal, Table} from "antd";
import * as actionCreator from "../rules/store/actionCreator";
import RulesForm from '../rules/components/rulesForm';
import { helper } from '@common/utils';
import uuid from 'uuid/v1';

const confirm = Modal.confirm;
const RulesFormModal = Form.create()(RulesForm);

class Rules extends PureComponent {
  constructor(props) {
    super(props);

    this.cols = [
      {
        title: 'Name',
        dataIndex: 'name',
        className: 'column-center',
        render: name => {
          return name || '-';
        }
      },
      {
        title: 'IP Range',
        dataIndex: 'range',
        className: 'column-center',
        render: ipRange => {
          if (ipRange && _.isArray(ipRange)) {
            return ipRange.map(ip => (
              <div key={ip}>{ip}</div>
            ));
          } else {
            return '-'
          }
        }
      },
      {
        title: 'Ingress Name',
        dataIndex: 'ingress_name',
        className: 'column-center',
        render: ingressName => {
          if (ingressName && _.isArray(ingressName)) {
            return ingressName.map(ingressName => (
              <div key={ingressName}>{ingressName}</div>
            ));
          } else {
            return '-'
          }
        }
      },
      {
        title: 'Ingress Type',
        dataIndex: 'ingress_type',
        className: 'column-center',
        render: ingressType => {
          if (ingressType && _.isArray(ingressType)) {
            return ingressType.map(ingressType => (
              <div key={ingressType}>{ingressType}</div>
            ));
          } else {
            return '-'
          }
        }
      },
      {
        title: 'Pattern',
        dataIndex: 'pattern',
        className: 'column-center',
        render: pattern => {
          if (pattern && _.isArray(pattern)) {
            return pattern.map(pattern => (
              <div key={pattern}>{pattern}</div>
            ));
          } else {
            return '-'
          }
        }
      },
      {
        title: 'Domain',
        dataIndex: 'domain',
        className: 'column-center',
        render: domain => {
          if (domain && _.isArray(domain)) {
            return domain.map(domain => (
              <div key={domain}>{domain}</div>
            ));
          } else {
            return '-'
          }
        }
      },
      {
        title: 'Country',
        dataIndex: 'country',
        className: 'column-center',
        render: countryCode => {
          if (countryCode && _.isArray(countryCode)) {
            return countryCode.map(countryCode => (
              <div key={countryCode}>{countryCode}</div>
            ));
          } else {
            return '-'
          }
        }
      },
      {
        title: 'Operation',
        className: 'column-center',
        render: (text, record) => (
          <span>
            <Antd.Button size="small" onClick={evt => this.handleModifyRules(evt, text, record)} >Edit</Antd.Button>
            <Divider type="vertical" />
            <Antd.Button size="small" onClick={evt => this.handleDeleteRules(evt, record.name)} >Delete</Antd.Button>
          </span>
        )
      }
    ];

    this.handleOnLoadList = this.handleOnLoadList.bind(this);
    this.handleShowRulesForm = this.handleShowRulesForm.bind(this);
    this.handleSaveRules = this.handleSaveRules.bind(this);
    this.handleCancelRules = this.handleCancelRules.bind(this);
    this.handleModifyRules = this.handleModifyRules.bind(this);
    this.handleDeleteRules = this.handleDeleteRules.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div style={{marginBottom: 16}}>
          <Antd.Button
            htmlType="button"
            type="primary"
            onClick={this.handleShowRulesForm}
          >Add</Antd.Button>
          <Antd.Button
            style={{marginLeft: '10px'}}
            htmlType="button"
            type="dashed"
            onClick={this.handleOnLoadList}
          >Reload</Antd.Button>
        </div>
        <Table
          columns={this.cols}
          bordered
          rowKey="name"
          dataSource={this.props.rulesList.toJS()}
          loading={this.props.fetchRulesPending}
        >
        </Table>
        <RulesFormModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.rulesFormModalVisible}
          onOK={this.handleSaveRules}
          onCancel={this.handleCancelRules}
        />
      </Fragment>
    )
  }

  componentDidMount() {
    this.fetchRules();
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  fetchRules() {
    this.props.actions.fetchRules().catch(error => {
      message.error(error.errMsg);
    });
  }

  handleOnLoadList() {
    this.fetchRules();
  }

  handleShowRulesForm() {
    this.props.actions.changeRulesFormModalVisible(true);
  }

  handleSaveRules() {
    const form = this.formRef.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.actions.saveRules(values).then(rsp => {
          message.success('successfully');
          form.resetFields();
          this.props.actions.changeRulesFormModalVisible(false);
          this.fetchRules();
        }, error => {
          message.error(error.errMsg);
        });
      }
    });
  }

  handleCancelRules() {
    const form = this.formRef.props.form;
    form.resetFields();
    this.props.actions.changeRulesFormModalVisible(false);
  }

  handleModifyRules(evt, text, record) {
    const form = this.formRef.props.form;
    const formDataKeys = {};
    const formDataFieldVal = {};

    formDataFieldVal['name'] = record.name;
    _.forIn(record, (val, key) => {
      if (_.isArray(val)) {
        formDataKeys[`${key}Keys`] = val.map(() => uuid());
        formDataFieldVal[key] = val;
      }
    });

    this.props.actions.changeRulesFormModalVisible(true);
    // 因为 react 渲染机制的问题，这里需要特殊处理，首先设置 keys 其次再延迟后再进行赋值
    helper.delayFunction(() => {
      form.setFieldsValue(formDataKeys);

      helper.delayFunction(() => {
        form.setFieldsValue(formDataFieldVal);
      });
    });
  }

  handleDeleteRules(evt, ruleName) {
    confirm({
      title: 'Operation',
      content: 'Do you want to delete this item ?',
      onOk: () => {
        this.props.actions.delteRules(ruleName).then(rsp => {
          message.success('successfully');
          this.fetchRules();
          return Promise.resolve();
        }, error => {
          message.error(error.errMsg);
          return Promise.reject();
        });
      }
    });
  }
}

const mapStateToProps = (state) => {
  return {
    rulesList: state.getIn(['rules', 'fetchRulesList']),
    fetchRulesPending: state.getIn(['rules', 'fetchRulesListPending']),
    rulesFormModalVisible: state.getIn(['rules', 'rulesFormModalVisible'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rules);
