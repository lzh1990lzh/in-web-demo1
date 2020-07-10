import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Space, Table, Select, Row, Col, Form, DatePicker, Button,Timeline,pagination  } from 'antd';
import { connect, Dispatch } from 'umi';
import moment, { Moment } from 'moment';
import { ConnectState } from '@/models/connect'
import { appSubItemType } from '@/models/appSubmitted';
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
  appSubList?: appSubItemType[];
  appSubInfo:appSubItemType;
  appSubExport:appSubItemType;
  appSubPage:appSubItemType;
  loading?: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  pages?:appSubItemType;
  pagination?:{};
  total?:string;
  pageSize?:string;
  pageNum?:string;
}

const CollectionsPage: React.FC<CollectionCreateFormProps> = (props) => {
  const {appSubInfo={}}=props;  
  const {appSubExport=[]}=props;
  
  const { dispatch, appSubList } = props

  const [visible, setVisible] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const pageSize: number = 10;
  const [reportStatus, setReportStatus] = useState<String>('');
  const [beginTime, setBeginTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>(''); 
  
 //page 为 model 层的数据，存放总数，当前页码，以及size
  const {pages={}}=props;
  const pagination = {
    showSizeChanger: true, //是否可以改变 pageSize
    showQuickJumper: false, //是否可以快速跳转至某页
    pageSizeOptions:[],
    total: pages.total,
    pageSize,
    current: pageNum,
    //显示总条数
    showTotal: ( total:number ) => `总共 ${total} 条`,   
    
    //页码改变的回调，参数是改变后的页码及每页条数
    onChange: (current: number, pageSize: number) => setPageNum(current),
  }

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
          }}>详情</Button>
          <Button type="primary"  onClick={() => {
            expectDatail(text);            
          }}>导出</Button>
        </Space>,

    },
  ];
  function checkDetail(info:appSubItemType){   
    const { id }=info;
    setVisible(true);   
    const iid='0:'+id;
    console.log(iid,"&&iidiid");
    dispatch({
      type: 'appSubmit/queryInfo',
      payload: {
        id:iid,
      }
    });
  }
  

  function handleChange(value: string) {
    setReportStatus(`${value}`);
  }
  function expectDatail(info:appSubItemType) {
    console.log(info,"导入***********");
    const { id }=info;  
    const iid='0:'+id;
    console.log(iid);
    dispatch({
      type: 'appSubmit/queryExport',
      payload: {
        id:iid,
      }
    });

    // const { path, baseUrl } = appSubExport;
    // console.log(path, baseUrl,"path, baseUrl")
    // if(!path || !baseUrl) return
    // window.location.href = `${baseUrl}${path}`
  }
 
  function queryLit() {
    let params = {
      pageIndex: pageNum,
      pageSize,
      beginTime, endTime, reportStatus
    }

    dispatch({
      type: 'appSubmit/queryList',
      payload: { ...params }
    });
  }

  function onChange(date: Moment, dateString: string){
    setBeginTime(dateString[0]);
    setEndTime(dateString[1]);
  }
  
  useEffect(() => {
    queryLit();
  }, [pageNum]);
  
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
              今天: [moment(), moment()],
              '当月': [moment().startOf('month'), moment().endOf('month')],
            }}
            onChange={onChange}
          />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={2}>        
          <Button type="primary" 
          onClick={() => {
            if (pageNum === 1) {
              queryLit();
            } else {
              setPageNum(1)
            }
          }}
          >查询</Button>
        </Col>
      </Row>
   

      <Table dataSource={appSubList} columns={columns}   pagination={pagination} rowKey="id"/>
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
export default connect(({ appSubmit, loading }: ConnectState) => ({  
  appSubList: appSubmit.list,
  appSubInfo:appSubmit.infoList,
  appSubExport:appSubmit.exportList,
  pages:appSubmit.info,
}))(CollectionsPage);