
/**
 *  proxyList 数据
 */

const proxyListData = {
    host: {
        ip: '127.0.0.0',
        port: 8080
    },
    data: (function () {
        const data = [];
        for (let i = 0; i < 46; i++) {
            data.push({
                id: i,
                key: i,
                ip: `172.16.10.${i}`,
                port: i,
                project: `London-${i}`
            });
        }
        return data;
    }())
};

export default proxyListData;
