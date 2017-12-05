var fs = require('fs');//调用fs函数库

module.exports = function(path, packageModules, callback){
    fs.readFile(path,'utf-8',function(err,data){
        if(err){
            console.error(err);
        }else{
            var setting = JSON.parse(data);
            var businessName = setting.businessName;
            path = path.replace('/fhflow.config.json','');
            callback(path,packageModules,businessName);
        }
    })
}