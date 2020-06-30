import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Space, Card,InputNumber, Typography, Alert,Table,Select,Row, Col,Form, Input,DatePicker,Button,Modal } from 'antd';
import { connet, Dispatch } from 'umi';
import { appSubItmeType } from '@/models/ApprovalC/submitted'

const { Option } = Select;
const { RangePicker } = DatePicker;
// const [state, setChatModal] = useState<boolean>(false);
//const state=false;
const { Column, ColumnGroup } = Table;
function handleChange(value) {
  console.log(`selected ${value}`);
}
function showModal(){
  alert("11");
}
const layout = {
  labelCol: { span: 6},
  wrapperCol: { span:18 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const { Column, ColumnGroup } = Table;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  
  const [form] = Form.useForm();
  

  return (
    <Modal
      visible={visible}
      title="详情"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      
      <Form {...layout}  form={form}>
        <Form.Item label="填报单位" name="studentName">
          <Input disabled />
        </Form.Item>
        <Form.Item label="填报人" name="gender">
          <Input disabled />
        </Form.Item>
        <Form.Item label="标题" name="age">
          <Input disabled />
        </Form.Item>
        <Form.Item label="降雨量(毫米)" name="teacherName">
          <Input disabled />
        </Form.Item>
        <Form.Item label="降雨开始时间" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="降雨结束时间" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="统计截止时间" name="appointmentTime">
          <Input disabled />
        </Form.Item>        
        <Form.Item label="在岗人数" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="查房数量" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="积水情况" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="房屋漏雨" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="抢修情况" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="报修数量" name="appointmentTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="审批流程" name="status">
          <Input disabled />
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

const CollectionsPage = () => {
  // const { Option } = Select;
  // const { RangePicker } = DatePicker;
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '填报单位',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '提交时间',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '审批状态',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '最新审批人',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '最新审批时间',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '审批状态',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: () => 
      <Space size="middle">
           <Button type="primary" onClick={() => {
            setVisible(true);
          }}>详情</Button>
           <Button type="primary" onClick={showModal}>导出</Button>
         </Space>,
     
    },
  ];

  return (   
      <PageHeaderWrapper>
        <Row gutter={16}>    
        <Col className="gutter-row" span={6}>
          <Form.Item name="name" label="审批状态：">
            <Select defaultValue="lucy" onChange={handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
          </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="name" label="日期">
           <RangePicker/>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={2}>
        <Button type="primary">查询</Button>
        </Col>     
      </Row>  
        
        <Table dataSource={dataSource} columns={columns} />   
      
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      </PageHeaderWrapper>
      
    
  );
};

export default CollectionsPage;