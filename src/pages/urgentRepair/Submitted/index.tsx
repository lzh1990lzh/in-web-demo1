import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Space, Table, Select, Row, Col, Form, DatePicker, Button } from 'antd';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect'
import { urgentSubItemType } from '@/models/urgentSubmitted';
import Detail from './submitDetail/index'
import { text } from 'express';

const { Option } = Select;
const { RangePicker } = DatePicker;
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  dispatch: Dispatch;
  appSubList?: urgentSubItemType[];
  appSubInfo:urgentSubItemType;
  appSubExport:urgentSubItemType;
  loading?: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionsPage: React.FC<CollectionCreateFormProps> = (props) => {
  const {appSubInfo={}}=props; 
  const {appSubExport={}}=props; 
  
  const { dispatch, appSubList } = props

  const [visible, setVisible] = useState(false);
  const [pageIndex, setPageNum] = useState<number>(0);
  const pageSize: number = 10;
  const [reportStatus, setReportStatus] = useState<String>('');
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>(''); 

  
  const onCreate = values => {
    setVisible(false);
  }; 

  const columns = [   
    {
      title: '填报单位',
      dataIndex: 'orgName',
      key: 'orgName',
    },
    {
      title: '提交时间',
      dataIndex: 'reportTime',
      key: 'reportTime',
    },
    {
      title: '审批状态',
      dataIndex: 'reportStatusName',
      key: 'reportStatusName',
    },
    {
      title: '最新审批人',
      dataIndex: 'checkUserName',
      key: 'checkUserName',
    },
    {
      title: '最新审批时间',
      dataIndex: 'checkTime',
      key: 'checkTime',
    },
    
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text:appSubItemType) =>
        <Space size="middle">
          <Button type="primary" onClick={() => {
            checkDetail(text);
            //setVisible(true);
          }}>详情</Button>
          <Button type="primary" onClick={() => {
            expectDatail(text);            
          }}>导出</Button>
        </Space>,

    },
  ];
  function checkDetail(info:urgentSubItemType){    
      const { id }=info;
      setVisible(true);   
      const iid='0:'+id;
      dispatch({
        type: 'urgentSubmit/queryInfo',
        payload: {
          id:iid,
        }
      });
    }
  

  function handleChange(value: string) {
    setReportStatus(`${value}`);

  }
  function expectDatail(info:urgentSubItemType) {
    const { id }=info;  
    const iid='0:'+id;
    dispatch({
      type: 'urgentSubmit/queryExport',
      payload: {
        id:iid,
      }
    });

    const { path, baseUrl } = appSubExport;
    if(!path || !baseUrl) return
    window.location.href = `${baseUrl}${path}`
  }
 
  function handleSearch(){
    dispatch({
      type: 'urgentSubmit/queryList',
      payload: {
        pageIndex, pageSize,beginTime,endTime,reportStatus
      }
    });
  }

  function onChange(date: moment, dateString: string){
    setBeginTime(dateString[0]);
    setEndTime(dateString[1]);
  }
  
  useEffect(() => {
    dispatch({
      type: 'urgentSubmit/queryList',
      payload: {
        pageIndex, pageSize
      }
    });    
  }, []);

  return (
    <PageHeaderWrapper>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Form.Item name="name" label="审批状态：">
            <Select onChange={handleChange}>
              <Option value="">全部</Option>
              <Option value="0">审批中</Option>
              <Option value="1">已撤销</Option>
              <Option value="2">已转审</Option>
              <Option value="3">已通过</Option>
              <Option value="4">已驳回</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item name="name" label="日期">
          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
          />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={2}>
          <Button type="primary"
           onClick={handleSearch}
          >查询</Button>
        </Col>
      </Row>

      <Table dataSource={appSubList} columns={columns} rowKey="id"/>
      <Detail
        visible={visible}
        detail={appSubInfo}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />

    </PageHeaderWrapper>


  );
};


export default connect(({ urgentSubmit, loading }: ConnectState) => ({  
  appSubList: urgentSubmit.list,
  appSubInfo: urgentSubmit.infoList,
  appSubExport: urgentSubmit.exportList,
}))(CollectionsPage);