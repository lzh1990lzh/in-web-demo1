import request from '@/utils/request';

export async function approvalYjsbSubList(params: pageProps) {
    const listParams = {
        ...params,
        reportType: "0",
        searchType: "1",
        isDesc:"1",
    }
    console.log(listParams,"@@listParamslistParamslistParamslistParams");
    return request('/query/reportList', {        
        data: listParams
    });
}
export async function approvalYjsbSubInfo(params:{id:string} ) {    
    return request('/query/rain/reportDetail', {        
        data: params
    });
}
export async function approvalYjsbSubExport(params:{id:string} ) {    
    return request('/query/rain/export', {        
        data: params
    });
}


