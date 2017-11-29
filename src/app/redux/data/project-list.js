
/*
 *  projectList 数据
 */

const projectManageData ={
    data : [
        {
            key: 0,
            class: 'project-floader',
            name: 'ued0',
            path: 'E://test/ued0'
        }, {
            key: 1,
            class: 'project-floader',
            name: 'ued1',
            path: 'E://test/ued1'
        }, {
            key: 2,
            class: 'project-floader',
            name: 'ued2',
            path: 'E://test/ued2'
        }, {
            key: 3,
            class: 'project-floader',
            name: 'ued3',
            path: 'E://test/ued3'
        }, {
            key: 4,
            class: 'project-floader',
            name: 'ued4',
            path: 'E://test/ued4'
        }, {
            key: 5,
            class: 'project-floader',
            name: 'ued5',
            path: 'E://test/ued5'
        }
    ],
    leftOperateData: [
        {
            key: 0,
            title: '增加项目',
            icon: 'folder-add',
            type: 'add'
        },
        {
            key: 1,
            title: '删除项目',
            icon: 'delete',
            type: 'del'
        },
        {
            key: 2,
            title: '打开项目',
            icon: 'folder-open',
            type: 'open'
        }
    ],
    rightOperateData: [
        {
            key: 0,
            name: '开发',
            type: 'dev'
        },
        {
            key: 1,
            name: '编译',
            type: 'compile'
        },
        {
            key: 2,
            name: '上传',
            type: 'upload'
        },
        {
            key: 3,
            name: '打包',
            type: 'package'
        }
    ]
} 
 

export default projectManageData;