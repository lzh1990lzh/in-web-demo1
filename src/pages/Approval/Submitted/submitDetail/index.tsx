import React from 'react';
import { Modal, Form, Input, Timeline } from 'antd';
import { submitItemType } from '@/models/appSubmitted';

interface submitDetailProps{
    visible:boolean;
    detail:submitItemType;
    onCancel:()=>void;
}
const appSubmitDetail: React.FC<submitDetailProps>=(props)=>{
    
    const{ visible, detail, onCancel} = props;
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8},
        wrapperCol: { span:16 },
    };    
    const arr = detail.checkList || []
    
    form.setFieldsValue(detail);
    return (
        <Modal
      destroyOnClose
      title="详情"
      visible={visible}
      onOk={() => {
        form.resetFields();
        setTimeout(() => {
          onCancel();
        }, 20);
      }}
      onCancel={() => {
        form.resetFields();
        setTimeout(() => {
          onCancel();
        }, 20);
      }}
    >
          <Form {...layout}  form={form}>
            <Form.Item label="填报单位" name="orgName">
              <Input disabled />
            </Form.Item>
            <Form.Item label="填报人" name="reportUserName">
              <Input disabled />
            </Form.Item>
            <Form.Item label="标题" name="reportTitle">
              <Input disabled />
            </Form.Item>
            <Form.Item label="降雨量(毫米)" name="rainFall">
              <Input disabled />
            </Form.Item>
            <Form.Item label="降雨开始时间" name="rainBeginTime">
              <Input disabled />
            </Form.Item>
            <Form.Item label="降雨结束时间" name="rainEndTime">
              <Input disabled />
            </Form.Item>
            <Form.Item label="统计截止时间" name="statisticsTime">
              <Input disabled />
            </Form.Item>        
            <Form.Item label="在岗人数" name="dutyCount">
              <Input disabled />
            </Form.Item>
            <Form.Item label="查房数量(楼房)" name="roundsBuildingCount">
              <Input disabled />
            </Form.Item>
            <Form.Item label="查房数量(平房)" name="roundsBungalowCount">
              <Input disabled />
            </Form.Item>            
            <Form.Item label="积水院落积水(处)" name="waterSiteCount">
              <Input disabled />             
            </Form.Item>
            <Form.Item label="积水雨水进屋(间)" name="rainRoomCount">
              <Input disabled />             
            </Form.Item>
            <Form.Item label="积水地下室倒灌(处)" name="waterBasementCount">
              <Input disabled />             
            </Form.Item>
            <Form.Item label="地下室积水面积(平方米)" name="waterBasementArea">
              <Input disabled />             
            </Form.Item>
            <Form.Item label="房屋漏雨(平房)" name="rainBungalowCount">
              <Input disabled />
            </Form.Item>
            <Form.Item label="房屋漏雨(楼房)" name="rainBuildingCount">
              <Input disabled />
            </Form.Item>
            <Form.Item label="抢修补苫或加固(间)" name="steadyCount">
              <Input disabled />
            </Form.Item>
             <Form.Item label="抢修疏通排水(处)" name="drainPointCount">
              <Input disabled />
            </Form.Item>
            <Form.Item label="抢修疏通排水(间)" name="drainRoomCount">
              <Input disabled />
            </Form.Item>
            <Form.Item label="报修数量" name="reqairCount">
              <Input disabled />
            </Form.Item>            
            <Form.Item label="审批流程" name="checkList">
            <Timeline>            
                {
                  arr.map(function (value, key) {
                      return (<Timeline.Item key={key}>{value.checkUserName}--{value.checkStatusName}    {value.checkTime}</Timeline.Item>);
                  })
                }              
            </Timeline>
            </Form.Item>
            
          </Form>
        </Modal>
      );
}
export default appSubmitDetail;