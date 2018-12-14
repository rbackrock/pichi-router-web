import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Antd, {Divider, Form, message, Modal, Table} from "antd";
import * as actionCreator from "../rules/store/actionCreator";
import RulesForm from '../rules/components/rulesForm';
import { helper } from '@common/utils';

const RulesFormModal = Form.create()(RulesForm);

class Rules extends PureComponent {
  constructor(props) {
    super(props);

    this.cols = [
      {
        title: 'Name',
        dataIndex: 'name',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'IP Range',
        dataIndex: 'range',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Ingress Name',
        dataIndex: 'ingress_name',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Ingress Type',
        dataIndex: 'ingress_type',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Pattern',
        dataIndex: 'pattern',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Domain',
        dataIndex: 'domain',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Country',
        dataIndex: 'country',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Operation',
        className: 'column-center',
        render: (text, record) => (
          <span>
            <Antd.Button size="small" >Edit</Antd.Button>
            <Divider type="vertical" />
            <Antd.Button size="small" >Delete</Antd.Button>
          </span>
        )
      }
    ];

    this.handleOnLoadList = this.handleOnLoadList.bind(this);
    this.handleShowRulesForm = this.handleShowRulesForm.bind(this);
    this.handleSaveRules = this.handleSaveRules.bind(this);
    this.handleCancelRules = this.handleCancelRules.bind(this);
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

          <Antd.Button onClick={() => this.handleTest()}>Test</Antd.Button>

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

  handleTest() {
    let form = this.formRef.props.form;
    const json = '{"rangeKeys":["initRangeKey","6128fa70-ff67-11e8-be5e-5b4805779716"],"range":{"initRangeKey":"123","6128fa70-ff67-11e8-be5e-5b4805779716":"456"}}';
    this.props.actions.changeRulesFormModalVisible(true);
    form.setFieldsValue({
      // rangeKeys: ["0","1"]
      rangeKeys: ["initRangeKey","6128fa70-ff67-11e8-be5e-5b4805779716"]
    });

    window.setTimeout(() => {
      console.log(form.getFieldValue('range'))

      form.setFieldsValue({
        range: ['456', '123']
      });
    }, 1000);
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
      console.log(JSON.stringify(values));
    });
  }

  handleCancelRules() {
    const form = this.formRef.props.form;
    form.resetFields();
    this.props.actions.changeRulesFormModalVisible(false);
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
