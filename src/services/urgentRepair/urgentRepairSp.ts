import request from '@/utils/request';

export async function urgentSpList(params: pageProps) {
    const listParams = {
        ...params,
        reportType: "1",
        searchType: "2",
        isDesc:"1",
    }
    return request('/query/reportList', {
        data: listParams
    });
}
export async function urgentspInfo(params:{id:string} ) {    
    return request('/query/fix/reportDetail', {        
        data: params
    });
}
export async function urgentSpExport(params:{id:string} ) {    
    return request('/query/fix/export', {        
        data: params
    });
}


