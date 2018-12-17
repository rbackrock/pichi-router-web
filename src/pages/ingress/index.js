import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreator } from './store';
import Antd, {
  Table,
  Divider,
  Form,
  message,
  Modal
} from 'antd';
import IngressRecordForm from './components/ingressForm';
import { helper } from '@common/utils';

const confirm = Modal.confirm;
const IngressRecordFormModal = Form.create()(IngressRecordForm);

class Ingress extends PureComponent {
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
        title: 'Bind',
        dataIndex: 'bind',
        className: 'column-center'
      },
      {
        title: 'Port',
        dataIndex: 'port',
        className: 'column-center'
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
            <Antd.Button size="small" onClick={(evt) => this.handleModifyIngress(evt, text, record)}>Edit</Antd.Button>
              <Divider type="vertical" />
            <Antd.Button size="small" onClick={(evt) => this.handleDeleteIngress(evt, text, record)}>Delete</Antd.Button>
          </span>
        )
      }
    ];

    this.actions = this.props.actions;

    this.handleFetchIngressList = this.handleFetchIngressList.bind(this);
    this.handleSaveIngressForm = this.handleSaveIngressForm.bind(this);
    this.handleShowIngressModal = this.handleShowIngressModal.bind(this);
    this.handleCancelIngressForm = this.handleCancelIngressForm.bind(this);
    this.fetchIngressList = this.fetchIngressList.bind(this);
  }

  render() {
    const {
      ingressFormModalVisible,
    } = this.props;
    const ingressList = this.props.ingressList.toJS();

    return (
      <Fragment>
        <div style={{marginBottom: 16}}>
          <Antd.Button
            htmlType="button"
            type="primary"
            onClick={this.handleShowIngressModal}
          >Add</Antd.Button>
          <Antd.Button
            style={{marginLeft: '10px'}}
            htmlType="button"
            type="dashed"
            onClick={this.fetchIngressList}
          >Reload</Antd.Button>
        </div>
        <Table
          columns={this.cols}
          dataSource={ingressList}
          bordered
          rowKey="name"
          loading={this.props.fetchIngressListPending}
        >
        </Table>
        <IngressRecordFormModal
          wrappedComponentRef={this.saveFormRef}
          visible={ingressFormModalVisible}
          onOK={this.handleSaveIngressForm}
          onCancel={this.handleCancelIngressForm}
        />
      </Fragment>
    )
  }

  componentDidMount() {
    this.fetchIngressList();
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  fetchIngressList() {
    this.actions.fetchIngressList().catch(error => {
      message.error(error.errMsg);
    });
  }

  handleFetchIngressList() {
    this.fetchIngressList();
  }

  handleSaveIngressForm() {
    const form = this.formRef.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.actions.saveIngress(values).then(() => {
          message.success('successfully');
          form.resetFields();
          this.actions.changeIngressFormModalVisible(false);
          this.fetchIngressList();
        }, error => {
          message.error(error.errMsg);
        })
      }
    });
  }

  handleCancelIngressForm() {
    const form = this.formRef.props.form;
    form.resetFields();
    this.actions.changeIngressFormModalVisible(false);
  }

  handleShowIngressModal() {
    this.actions.changeIngressFormModalVisible(true);
  }

  handleDeleteIngress(evt, text, record) {
    confirm({
      title: 'Operation',
      content: 'Do you want to delete this item ?',
      onOk: () => {
        this.actions.deleteIngress(record.name).then(rsp => {
          message.success('successfully');
          this.fetchIngressList();
          return Promise.resolve();
        }, error => {
          message.error(error.errMsg);
          return Promise.reject();
        });
      }
    });
  }

  handleModifyIngress(evt, text, record) {
    this.actions.changeIngressFormModalVisible(true);
    this.actions.changeIngressFormAdapterType(record.type);

    // 因为要根据不同入口动态渲染模态框，渲染完成后才可以设置表单值，所以需要延迟
    helper.delayFunction(() => {
      this.formRef.props.form.setFieldsValue(record);
    });
  }
}

const mapStateToProps = (state) => {
  return {
    ingressList: state.getIn(['ingress', 'fetchIngressList']),
    fetchIngressListPending: state.getIn(['ingress','fetchIngressListPending']),
    ingressFormModalVisible: state.getIn(['ingress', 'ingressFormModalVisible'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ingress);
