
define(['../template/test.js','http://172.16.1.75:8080/rap.pllugini.js?projectId=76'],function(test){
    RAP.setPrefix('/mockjsdata/');

    $('#test').append(test({a:80000}));
})