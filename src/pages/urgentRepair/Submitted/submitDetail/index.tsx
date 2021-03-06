import React from 'react';
import { Modal, Form, Input, Timeline, TextArea, Avatar  } from 'antd';
import { submitItemType } from '@/models/urgentSubmitted';


interface submitDetailProps{
    visible:boolean;
    detail:submitItemType;
    onCancel:()=>void;
}
const appSubmitDetail: React.FC<submitDetailProps>=(props)=>{
    const { TextArea } = Input;
    const{ visible, detail, onCancel} = props;
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 4},
        wrapperCol: { span:20 },
    }; 
    const imgUrl=detail.baseUrl;
    const imgArr=detail.photoList || []
    const arr = detail.checkList || []
    
    form.setFieldsValue(detail);
    const imgStyle = {
        backgroundColor: "#5D90AB",
        borderRadius: "5px",
        display: "inline-block",
        width: "100%",
        border: '1px #ccc solid',
    };
    const liStyle={
      float:'left',
      width:'20%',
    }

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
              <Input disabled style={{color:'rgba(0, 0, 3, 0.85)'}}/>
            </Form.Item>
            <Form.Item label="填报人" name="reportUserName">
              <Input disabled style={{color:'rgba(0, 0, 3, 0.85)'}}/>
            </Form.Item>
            <Form.Item label="提交时间" name="reportTime">
              <Input disabled style={{color:'rgba(0, 0, 3, 0.85)'}}/>
            </Form.Item>     
            <Form.Item label="标题" name="reportTitle">
              <Input disabled style={{color:'rgba(0, 0, 3, 0.85)'}}/>
            </Form.Item>            
            <Form.Item label="文档" name="reportDoc">
              <TextArea rows={4} disabled style={{color:'rgba(0, 0, 3, 0.85)'}}/>
            </Form.Item>  
            <Form.Item label="图片" name="photoList">
              <ul>
              {
                  imgArr.map(function (value, key) {
                   
                      return (<li style={liStyle} key={key}><a href={imgUrl+value} target="_blank"><img style={imgStyle} src={imgUrl+value}/></a></li>);
                      
                  })
                } 
                <li></li>
              </ul>
            
            </Form.Item>                    
            <Form.Item label="审批流程" name="checkList">
            <Timeline>            
                {
                  arr.map(function (value, key) {
                      return (<Timeline.Item key={key}>{value.checkUserName}  {value.checkStatusName}    {value.checkTime}<p style={{color:'#737171'}}>{value.description}</p></Timeline.Item>);
                  })
                }              
            </Timeline>
            </Form.Item>
            
          </Form>
        </Modal>
      );
}
export default appSubmitDetail;