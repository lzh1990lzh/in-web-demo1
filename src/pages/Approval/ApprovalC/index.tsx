import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Space, Table, Select, Row, Col, Form, DatePicker, Button,pagination  } from 'antd';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { ConnectState } from '@/models/connect'
import { appMySpItemType } from '@/models/approvalMyC';
import Detail from './approvalDetail/index'
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
  appSubList?: appMySpItemType[];
  appSubInfo:appMySpItemType;
  appSubExport:appMySpItemType;
  loading?: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  pages?:appMySpItemType;
  pagination?:{};
  total?:string;
  pageSize?:string;
  pageNum?:string;
}

const CollectionsPage: React.FC<CollectionCreateFormProps> = (props) => {
 
  const {appSubInfo={}}=props;
  const {appSubExport={}}=props;
  const { dispatch, appSubList={} } = props
 

  const [visible, setVisible] = useState(false);
  const [pageIndex, setPageNum] = useState<number>(0);
  const pageSize: number = 10;
  const [reportStatus, setReportStatus] = useState<String>('');
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>(''); 

  //page 为 model 层的数据，存放总数，当前页码，以及size
//const { page } = this.props
const {pages={}}=props;
console.log(pages,"pages#");
console.log(pages.total);
const pagination = {
  showSizeChanger: true, //是否可以改变 pageSize
  showQuickJumper: false, //是否可以快速跳转至某页
  showSizeChanger:true,
  pageSizeOptions:[],
  total: pages.total,
  pageSize: pages.pageSize,
  current: pages.pageNum,
  //显示总条数
  showTotal: ( total, range ) => `总共 ${total} 条`,   
  //pageSize 变化的回调
  onShowSizeChange: (current, pageSize) =>changePageSize(current, pageSize),
  //页码改变的回调，参数是改变后的页码及每页条数
  onChange: (current, pageSize) =>changePage(current, pageSize),
}

function changePage(current, pageSize){
  console.log(current,pageSize);
    const { dispatch } = props;
    //setReportStatus(`${value}`);
    setPageNum(`${current}`);
    console.log(dispatch,"dispatchdispatchdispatch");
    const params = {
      pageIndex: current,
      pageSize: pageSize,
    };
    dispatch({
      type: 'approvalMyC/queryList',
      payload: params,
    })
}

  const onCreate = values => {
    console.log('Received values of form: ', values);
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
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text:appMySpItemType) =>
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
  function checkDetail(info:appMySpItemType){    
    const { id }=info;
    setVisible(true);   
    const iid='1:'+id;
    console.log(iid);
    dispatch({
      type: 'approvalMyC/queryInfo',
      payload: {
        id:iid,
      }
    });
  }
  

  function handleChange(value: string) {
    console.log(`selected ${value}`,"reportStatusreportStatusreportStatus");
    setReportStatus(`${value}`);

  }
  function expectDatail(info:appSubItemType) {    
    const { id }=info;  
    const iid='1:'+id;
    dispatch({
      type: 'approvalMyC/queryExport',
      payload: {
        id:iid,
      }
    });
    const { path, baseUrl } = appSubExport;
    if(!path || !baseUrl) return
    window.location.href = `${baseUrl}${path}`
  }
 
  function handleSearch() {
    console.log("search##");
    dispatch({
      type: 'approvalMyC/queryList',
      payload: {
        pageIndex, pageSize,beginTime,endTime,reportStatus
      }
    });
    console.log("search");
    console.log(appSubList,"%%infoLlist************")
  }

  function onChange(date: moment, dateString: string){
    setBeginTime(dateString[0]);
    setEndTime(dateString[1]);
  }
  
  useEffect(() => {
    dispatch({
      type: 'approvalMyC/queryList',
      payload: {
        pageIndex, pageSize
      }
    });
    // dispatch({
    //   type: 'approvalMyC/queryPage',
    //   payload: {
        
    //   }
    // });
  }, []);

  return (
    <PageHeaderWrapper>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Form.Item name="name" label="审批状态：">
            <Select  onChange={handleChange}>
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

      <Table dataSource={appSubList} columns={columns} pagination={pagination} rowKey="id"/>
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

export default connect(({ approvalMyC, loading }: ConnectState) => ({  
  appSubList: approvalMyC.list,
  appSubInfo:approvalMyC.infoList,
  appSubExport:approvalMyC.exportList,
  pages:approvalMyC.pages,
}))(CollectionsPage);