import React, { Fragment, PureComponent } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Antd, {Divider, Form, message, Modal, Table, Card, Row, Col} from "antd";
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
        className: 'column-left',
        render: name => {
          return name || '-';
        }
      },
      {
        title: 'IP Range',
        dataIndex: 'range',
        className: 'column-center',
        render: ipRange => {
          return '';
        }
      },
      {
        title: 'Ingress Name',
        dataIndex: 'ingress_name',
        className: 'column-center',
        render: ingressName => {
          return '';
        }
      },
      {
        title: 'Ingress Type',
        dataIndex: 'ingress_type',
        className: 'column-center',
        render: ingressType => {
          return '';
        }
      },
      {
        title: 'Pattern',
        dataIndex: 'pattern',
        className: 'column-center',
        render: pattern => {
          return '';
        }
      },
      {
        title: 'Domain',
        dataIndex: 'domain',
        className: 'column-center',
        render: domain => {
          return '';
        }
      },
      {
        title: 'Country',
        dataIndex: 'country',
        className: 'column-center',
        render: countryCode => {
          return '';
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
          showHeader={false}
          rowKey="name"
          dataSource={this.props.rulesList.toJS()}
          loading={this.props.fetchRulesPending}
          expandedRowRender={record => {
            const ipRange = record.range && _.isArray(record.range) ? record.range : [];
            const ingressName = record.ingress_name && _.isArray(record.ingress_name) ? record.ingress_name : [];
            const ingressType = record.ingress_type && _.isArray(record.ingress_type) ? record.ingress_type : [];
            const pattern = record.pattern && _.isArray(record.pattern) ? record.pattern : [];
            const domain = record.domain && _.isArray(record.domain) ? record.domain : [];
            const country = record.country && _.isArray(record.country) ? record.country : [];

            return (
              <Fragment>
                <Row gutter={16}>
                  {
                    ipRange.length > 0 ? (
                      <Col span={4}>
                        <Card title="IP Range" bordered={true} >
                          {
                            ipRange.map((item, index) => (<p key={index}>{item}</p>))
                          }
                        </Card>
                      </Col>
                    ) : null
                  }
                  {
                    ingressName.length > 0 ? (
                      <Col span={4}>
                        <Card title="Ingress Name" bordered={true} >
                          {
                            ingressName.map((item, index) => (<p key={index}>{item}</p>))
                          }
                        </Card>
                      </Col>
                    ) : null
                  }
                  {
                    ingressType.length > 0 ? (
                      <Col span={4}>
                        <Card title="Ingress Type" bordered={true} >
                          {
                            ingressType.map((item, index) => (<p key={index}>{item}</p>))
                          }
                        </Card>
                      </Col>
                    ) : null
                  }
                  {
                    pattern.length > 0 ? (
                      <Col span={4}>
                        <Card title="Pattern" bordered={true} >
                          {
                            pattern.map((item, index) => (<p key={index}>{item}</p>))
                          }
                        </Card>
                      </Col>
                    ) : null
                  }
                  {
                    domain.length > 0 ? (
                      <Col span={4}>
                        <Card title="Domain" bordered={true} >
                          {
                            domain.map((item, index) => (<p key={index}>{item}</p>))
                          }
                        </Card>
                      </Col>
                    ) : null
                  }
                  {
                    country.length > 0 ? (
                      <Col span={4}>
                        <Card title="Country" bordered={true} >
                          {
                            country.map((item, index) => (<p key={index}>{item}</p>))
                          }
                        </Card>
                      </Col>
                    ) : null
                  }
                </Row>
              </Fragment>
            );
          }}
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
