import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import md5 from 'md5';

import { urgentSpList, urgentspInfo, urgentSpExport } from '@/services/urgentRepair/urgentRepairSp';
//import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { json } from 'express';
import { Local } from '@/utils/session';

export interface appSubItemType {
  list?: any;
  infoList?:any;
  exportList?:any;
}

export interface appSubModelType {
  namespace: 'urgentSp';
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
  };
}

const Model: appSubModelType = {
  namespace: 'urgentSp',
  state: {
    list: [],
    infoList:[],
    exportList:[],
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      const res = yield call(urgentSpList, payload);
      console.log(res, "res*");
      const { code, data } = res;
      if (code !== '0') {
        yield put({
          type: 'setList',
          payload: [],
        });
        return 
      };
      const { list } = data
      yield put({
        type: 'setList',
        payload: list,
      });
    },
    
    *queryInfo({ payload },{ call, put }){
      const res = yield call(urgentspInfo, payload);
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
      const res = yield call(urgentSpExport, payload);
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
    }
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
  },
};

export default Model;
