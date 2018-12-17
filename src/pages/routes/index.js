import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from './store';
import {Select, Button, Table, Icon, message, Modal, Form} from 'antd';
import uuid from 'uuid/v1';
import './routes.scss';
import { helper } from '@common/utils';
import RoutesForm from './components/routesForm';

const Option = Select.Option;
const confirm = Modal.confirm;

const RoutesFormModal = Form.create()(RoutesForm);

class Routes extends PureComponent {
  constructor(props) {
    super(props);
    this.fetchRoutes = this.fetchRoutes.bind(this);
    this.handleShowRoutesFormModal = this.handleShowRoutesFormModal.bind(this);
    this.handleSaveRouteForm = this.handleSaveRouteForm.bind(this);
    this.handleCancelRouteForm = this.handleCancelRouteForm.bind(this);
  }

  render() {
    const rulesList = this.props.rulesList.toJS();
    const egressesList = this.props.egressesList.toJS();
    const routesList = this.props.routesList.toJS();
    const columns = [
      {
        title: 'Number',
        dataIndex: uuid(),
        className: 'column-center',
        render: (text, record, index) => (++index)
      },
      {
        title: 'Rule',
        className: 'column-center',
        dataIndex: 'rule',
        width: '35%',
        render: (text, record, index) => (
          <Select style={{ width: '80%', marginLeft: 6 }} onChange={(value, option) => this.handleSelectRule(value, option, text, record, index)} value={record.rule}>
            {
              rulesList.map(rule => <Option key={rule} value={rule}>{rule}</Option>)
            }
          </Select>
        )
      },
      {
        title: 'Egress',
        className: 'column-center',
        dataIndex: 'egress',
        width: '35%',
        render: (text, record, index) => (
          <Select style={{ width: '80%', marginLeft: 6 }} onChange={(value, option) => this.handleSelectEgress(value, option, text, record, index)} value={record.egress}>
            {
              this.props.egressesList.map(egress => <Option key={egress} value={egress}>{egress}</Option>)
            }
          </Select>
        )
      },
      {
        title: 'Operation',
        className: 'column-center',
        width: '20%',
        render: (text, record, index) => {
          return (
            <Fragment>
              <Icon
                className="dynamic-button"
                type="arrow-up"
                onClick={() => this.handleMoveUp(record, index)}
              />
              <Icon
                className="dynamic-button"
                type="arrow-down"
                onClick={() => this.handleMoveDown(record, index)}
              />
              <Icon
                className="dynamic-button"
                type="minus"
                onClick={() => this.handleRemoveRule(index)}
              />
            </Fragment>
          );
        }
      },
    ];

    return (
      <Fragment>
        <div style={{marginBottom: 30}}>
          <span>Default egress:</span>
          <Select style={{ width: 200, marginLeft: 6 }} onChange={(value) => this.handleSelectDefaultEgress(value)} value={this.props.defaultEgress}>
            {
              egressesList.map(egress => (<Option key={egress} value={egress}>{egress}</Option>))
            }
          </Select>
          <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleShowRoutesFormModal}>Add Router</Button>
        </div>
        <Table
          Table rowKey={() => uuid()}
          showHeader={false}
          columns={columns}
          dataSource={routesList}
          loading={this.props.fetchRoutesPending}
          pagination={false}
          size="small"
        />
        <RoutesFormModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.routesFormModalVisible}
          onOK={this.handleSaveRouteForm}
          onCancel={this.handleCancelRouteForm}
          rulesList={rulesList}
          egressesList={egressesList}
        />
      </Fragment>
    )
  }

  componentDidMount() {
    this.fetchRoutes();
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  getNewRules(originIndex, completeIndex, originRulesList=this.props.routesList.toJS()) {
    const newRoutesList = [].concat(originRulesList);
    helper.swapArrayItem(newRoutesList, originIndex, completeIndex);
    return newRoutesList;
  }

  fetchRoutes() {
    this.props.actions.fetchRoutes().catch(error => {
      message.error(error.errMsg);
    });
  }

  saveRoutes(defaultEgress, routesList, nextFn) {
    this.props.actions.saveRoutes(defaultEgress, routesList).then(() => {
      message.success('successfully');
      nextFn && nextFn();
      this.fetchRoutes();
    }, error => {
      message.error(error.errMsg);
    });
  }

  handleSelectDefaultEgress = (value) => {
    const defaultEgress = value;
    const routesList = [].concat(this.props.routesList.toJS());

    this.saveRoutes(defaultEgress, routesList);
  };

  handleSelectRule = (value, option, text, record, index) => {
    const defaultEgress = this.props.defaultEgress;
    const routesList = [].concat(this.props.routesList.toJS());
    routesList[index]['rule'] = value;

    this.saveRoutes(defaultEgress, routesList);
  };

  handleSelectEgress = (value, option, text, record, index) => {
    const defaultEgress = this.props.defaultEgress;
    const routesList = [].concat(this.props.routesList.toJS());
    routesList[index]['egress'] = value;

    this.saveRoutes(defaultEgress, routesList);
  };

  handleMoveUp = (record, index) => {
    if (index !== 0) {
      const defaultEgress = this.props.defaultEgress;
      this.saveRoutes(defaultEgress, this.getNewRules(index, index - 1));
    }
  };

  handleMoveDown = (record, index) => {
    const originRoutesList = this.props.routesList.toJS();
    if (index !== (originRoutesList.length - 1)) {
      const defaultEgress = this.props.defaultEgress;
      this.saveRoutes(defaultEgress, this.getNewRules(index, index + 1));
    }
  };

  handleRemoveRule(index) {
    confirm({
      title: 'Operation',
      content: 'Do you want to delete this item ?',
      onOk: () => {
        const defaultEgress = this.props.defaultEgress;
        const routesList = [].concat(this.props.routesList.toJS());
        routesList.splice(index, 1);
        this.saveRoutes(defaultEgress, routesList);
      }
    });
  }

  handleShowRoutesFormModal() {
    this.props.actions.changeRoutesFormModalVisible(true);
  }

  handleSaveRouteForm() {
    const form = this.formRef.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const defaultEgress = this.props.defaultEgress;
        const routesList = [].concat(this.props.routesList.toJS());
        routesList.push(values);

        this.saveRoutes(defaultEgress, routesList, () => {
          form.resetFields();
          this.props.actions.changeRoutesFormModalVisible(false);
        });
      }
    });
  }

  handleCancelRouteForm() {
    const form = this.formRef.props.form;
    form.resetFields();
    this.props.actions.changeRoutesFormModalVisible(false);
  }
}

const mapStateToProps = (state) => {
  return {
    egressesList: state.getIn(['router', 'egressesList']),
    rulesList: state.getIn(['router', 'rulesList']),
    defaultEgress: state.getIn(['router', 'defaultEgress']),
    routesList: state.getIn(['router', 'routesList']),
    fetchRoutesPending: state.getIn(['router', 'fetchRoutesPending']),
    routesFormModalVisible: state.getIn(['router', 'routesFormModalVisible']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
