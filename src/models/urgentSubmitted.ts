import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import md5 from 'md5';

import { urgentSubList, urgentSubInfo, urgentSubExport } from '@/services/urgentRepair/submitted';
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
  namespace: 'urgentSubmit';
  state: appSubItemType;
  effects: {
    queryList: Effect;
    queryInfo: Effect;
    queryExport:Effect;
  };
  reducers: {
    setList: Reducer<appSubItemType>;
    setInfo: Reducer<appSubItemType>;
    setExport:Reducer<appSubItemType>;
    setPage:Reducer<appSubItemType>;
  };
}

const Model: appSubModelType = {
  namespace: 'urgentSubmit',
  state: {
    list: [],
    infoList:[],
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
      const res = yield call(urgentSubList, payload);
      console.log(res, "res*");
      const { code, data,info={
        total:data.total,
        pageNum:data.pageNum,
        pageSize:data.pageSize,
        size:data.size
      }  } = res;
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
      const { list } = data
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
      const res = yield call(urgentSubInfo, payload);
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
      const res = yield call(urgentSubExport, payload);
      console.log(res, "Info  res*");
      const { code, data } = res;
      console.log(res.data);
      const exportList  =res.data
      console.log(exportList,"infoListinfoListinfoList");
      //if (code !== '0') return;
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
