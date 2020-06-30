import request from '@/utils/request';

export async function approvalYjsbSpList(params: pageProps) {
    const listParams = {
        ...params,
        reportType: "0",
        searchType: "2",
        isDesc:"1",
    }
    console.log(listParams,"@@listParamslistParamslistParamslistParams");
    return request('/query/reportList', {        
        data: listParams
    });
}
export async function approvalYjsbSpInfo(params:{id:string} ) {    
    return request('/query/rain/reportDetail', {        
        data: params
    });
}
export async function approvalYjsbSpExport(params:{id:string} ) {    
    return request('/query/rain/export', {        
        data: params
    });
}


