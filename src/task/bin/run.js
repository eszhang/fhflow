#!/usr/bin/ env node

const path = require('path');
const commander = require('commander');
const SocketIO = require('socket.io');
const spawn = require('cross-spawn');
const ansiHTML = require('ansi-html');
const chalk = require('chalk');
const fs = require('fs');

const pkg = require(path.resolve('package.json'));

ansiHTML.setColors({
    reset: ['fff', '1d212d'],
    black: 'fff',
    red: 'f36666',
    green: '00f2ff',
    yellow: '00f2ff',
    blue: '00bdff',
    magenta: 'f47eff',
    cyan: '00f2ff',
    lightgrey: '888',
    darkgrey: '777'
});


const child = spawn(command, args, {
    env: process.env,
    stdio: [null, null, null, null],
    detached: true
});

const server = new SocketIO(8666, {
    reconnect: false
});

server.on('connection', (socket) => {
    socket.on('metrics', (data) => {
        console.log(ansiHTML(data));
    });

    socket.on('error', (err) => {
        console.log('Received error from agent, exiting: ', err);
    });
});


child.stdout.on('data', (data) => {
    console.log(ansiHTML(data));
    console.log(ansiHTML(2222 + chalk.green(1111)));
    // notifier.notify({
    //     type: 'info',
    //     message: data.toString('utf8'),
    //     wait: true
    // });
    fs.writeFile('./message.txt', ansiHTML(data), (err) => {
        if (err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    });
});

child.stderr.on('data', (data) => {
    console.log(ansiHTML(data.toString('utf8')));
});

process.on('exit', () => {
    process.kill(process.platform === 'win32' ? child.pid : -child.pid);
});
// };
// run('dev', '/aaa');
// module.exports = run;

