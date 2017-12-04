
/*
 *    electron 主线程和渲染之间通信
 */
const { ipcRenderer } = require('electron');
const store = window.store;

console.log(`store=${store}`)
//==接收列表

//新建项目
ipcRenderer.on('createProject', (event, arg) => {
    console.log(arg)
});

//打开项目
ipcRenderer.on('openProject', (event, arg) => {
    console.log(arg)
});

//删除项目
ipcRenderer.on('delProject', (event, arg) => {
    console.log(arg)
});

//==发送列表
store.subscribe(
    (...args) => {
        console.log(2222,args,store.getState())
    }
)