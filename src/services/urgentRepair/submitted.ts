import request from '@/utils/request';

export async function urgentSubList(params: pageProps) {
    const listParams = {
        ...params,
        reportType: "1",
        searchType: "1",
        isDesc:"1",
    }
    return request('/query/reportList', {
        data: listParams
    });
}
export async function urgentSubInfo(params:{id:string} ) {    
    return request('/query/fix/reportDetail', {        
        data: params
    });
}
export async function urgentSubExport(params:{id:string} ) {    
    return request('/query/fix/export', {        
        data: params
    });
}


