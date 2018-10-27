import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Antd, {Divider, Form, message, Modal, Table} from "antd";
import * as actionCreator from "../egresses/store/actionCreator";
import EgressesForm from "../egresses/components/egressesForm";
import { helper } from '@common/utils';

const confirm = Modal.confirm;
const EgressesFormModal = Form.create()(EgressesForm);

class Egresses extends PureComponent {
  constructor(props) {
    super(props);

    this.cols = [
      {
        title: 'Name',
        dataIndex: 'name',
        className: 'column-center'
      },
      {
        title: 'Type',
        dataIndex: 'type',
        className: 'column-center'
      },
      {
        title: 'Host',
        dataIndex: 'host',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Port',
        dataIndex: 'port',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Method',
        dataIndex: 'method',
        className: 'column-center',
        render: (text) => {
          return text || '-';
        }
      },
      {
        title: 'Password',
        dataIndex: 'password',
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
            <Antd.Button size="small" onClick={(evt) => this.handleModifyEgresses(evt, text, record)}>Edit</Antd.Button>
              <Divider type="vertical" />
            <Antd.Button size="small" onClick={(evt) => this.handleDeleteEgresses(evt, text, record)}>Delete</Antd.Button>
          </span>
        )
      }
    ];
    this.actions = this.props.actions;

    this.fetchEgressesList = this.fetchEgressesList.bind(this);
    this.handleShowEgressesForm = this.handleShowEgressesForm.bind(this);
    this.handleSaveEgresses = this.handleSaveEgresses.bind(this);
    this.handleCancelEgresses = this.handleCancelEgresses.bind(this);
  }

  render() {
    return (
      <Fragment>
        <div style={{marginBottom: 16}}>
          <Antd.Button
            htmlType="button"
            type="primary"
            onClick={this.handleShowEgressesForm}
          >Add</Antd.Button>
          <Antd.Button
            style={{marginLeft: '10px'}}
            htmlType="button"
            type="dashed"
            onClick={this.fetchEgressesList}
          >Reload</Antd.Button>
        </div>
        <Table
          columns={this.cols}
          dataSource={this.props.egressesList.toJS()}
          bordered
          rowKey="name"
          loading={this.props.fetchEgressesListPending}
        >
        </Table>
        <EgressesFormModal
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.egressesFormModalVisible}
          onOK={this.handleSaveEgresses}
          onCancel={this.handleCancelEgresses}
        />
      </Fragment>
    )
  }

  componentDidMount() {
    this.fetchEgressesList();
  }

  handleDeleteEgresses(evt, text, record) {
    confirm({
      title: 'Operation',
      content: 'Do you want to delete this item ?',
      onOk: () => {
        this.actions.deleteEgresses(record.name).then(rsp => {
          message.success('successfully');
          this.fetchEgressesList();
          return Promise.resolve();
        }, error => {
          message.error(error.errMsg);
          return Promise.reject();
        });
      }
    });
  }

  handleShowEgressesForm() {
    this.actions.changeEgressesFormModalVisible(true);
  }

  handleSaveEgresses() {
    const form = this.formRef.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.actions.saveEgresses(values).then(rsp => {
          message.success('successfully');
          form.resetFields();
          this.actions.changeEgressesFormModalVisible(false);
          this.fetchEgressesList();
        }, error => {
          message.error(error.errMsg);
        })
      }
    });
  }

  handleCancelEgresses() {
    const form = this.formRef.props.form;
    form.resetFields();
    this.actions.changeEgressesFormModalVisible(false);
  }

  handleModifyEgresses(evt, text, record) {
    this.actions.changeEgressesFormModalVisible(true);
    this.actions.changeEgressesFormAdapterType(record.type);

    // 因为要根据不同入口动态渲染模态框，渲染完成后才可以设置表单值，所以需要延迟
    helper.delayFunction(() => {
      this.formRef.props.form.setFieldsValue(record);
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  fetchEgressesList() {
    this.actions.fetchEgresses().catch(error => {
      message.error(error.errMsg);
    });
  }
}

const mapStateToProps = (state) => {
  return {
    egressesList: state.getIn(['egresses', 'fetchEgressesList']),
    fetchEgressesListPending: state.getIn(['egresses', 'fetchEgressesListPending']),
    egressesFormModalVisible: state.getIn(['egresses', 'egressesFormModalVisible'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Egresses);