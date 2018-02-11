// 模拟分页获取数据
export function fetchData(data = [], condition = { pageNo: 1, pageSize: 10 }) {
    const { pageNo, pageSize } = condition;
    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / pageSize);

    const res = {
        data: data.slice((pageNo - 1) * pageSize, pageNo * pageSize),
        page: {
            pageNo,
            pageSize,
            totalPages,
            totalRows
        }
    };

    return res;
}
