import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import md5 from 'md5';

import { approvalYjsbSpList,approvalYjsbSpInfo,approvalYjsbSpExport} from '@/services/ApprovalC/approvalMyC';
//import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { json } from 'express';
import { Local } from '@/utils/session';


export interface appSubItemType {
  list?: any;
  infoList?:any;
  exportList?:any;
  info:{
    total?:string,
    pageNum?:string,
    pageSize?:string,
    size?:string,
  }
}

export interface appSubModelType {
  namespace: 'approvalMyC';
  state: appSubItemType;
  effects: {
    queryList: Effect;
    queryInfo: Effect;
    queryExport:Effect;
   
  };
  reducers: {
    setList: Reducer<appSubItemType>;
    setInfo: Reducer<appSubItemType>;
    setExport: Reducer<appSubItemType>;
    setPage:Reducer<appSubItemType>;
  };
}

const Model: appSubModelType = {
  namespace: 'approvalMyC',
  state: {
    list: [],
    infoList: [],
    exportList:[],
    info:{
      total:'',
      pageNum:'',
      pageSize:'',
      size:'',
    }
  },

  effects: {    
    *queryList({ payload }, { call, put }) {
      const res = yield call(approvalYjsbSpList, payload);
      console.log(res, "res*");
      const { code, data} = res;
      if (code !== '0') {
        yield put({
          type: 'setList',
          payload: [],
        });
        yield put({
          type: 'setPage',
          payload: {},
        });
        return 
      };
      const { info={
        total:data.total,
        pageNum:parseInt(data.pageNum)+1,
        pageSize:data.pageSize,
        size:data.size
      }  } = res;
      const { list } = data
     console.log(list,"list&&&&&");
     // headerParams ? JSON.parse(JSON.stringify(headerParams)) : {}
      console.log(list,"listlistlist");
      yield put({
        type: 'setList',
        payload: list,
      });
      yield put({
        type: 'setPage',
        payload: info,
      });
    },
    *queryInfo({ payload },{ call, put }){
      const res = yield call(approvalYjsbSpInfo, payload);
      console.log(res, "Info  res*");
      const { code, data } = res;
      console.log(res.data);
      const infoList  =res.data
      console.log(infoList,"infoListinfoListinfoList");
      //if (code !== '0') return;
      yield put({
        type: 'setInfo',
        payload: infoList,
      });
    },
    *queryExport({ payload },{ call, put }){
      const res = yield call(approvalYjsbSpExport, payload);
      console.log(res, "Info  res*");
      const { code, data } = res;
      console.log(res.data);
      const exportList  =res.data
      
      yield put({
        type: 'setExport',
        payload: exportList,
      });
    },
    
  
  },

  reducers: {
  
    setList(state, { payload }) {
      return {
        ...state,
        list: payload || [],
      };
    },
    setInfo(state, { payload }) {
      return {
        ...state,
        infoList: payload || [],
      };
    },
    setExport(state, { payload }) {
      return {
        ...state,
        exportList: payload || [],
      };
    },
    setPage(state, { payload }) {
      return {
        ...state,
        info: payload || {},
      };
    },
  },
};

export default Model;
