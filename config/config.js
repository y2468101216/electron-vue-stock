const fs = require('fs');
const projectdir = require('os').homedir()+'/electron-vue-stock';

if (!fs.existsSync(projectdir)) {
  fs.mkdirSync(projectdir, '0755');
}

module.exports = {
  development: {
    "host": "localhost",
    "storage": projectdir+"/database.sqlite",
    "dialect": "sqlite",
    "operatorsAliases": false
  },
  test: {
    "host": "localhost",
    "storage": projectdir+"/database.sqlite",
    "dialect": "sqlite",
    "operatorsAliases": false
  },
  production: {
    "host": "localhost",
    "storage": projectdir+"/database.sqlite",
    "dialect": "sqlite",
    "operatorsAliases": false
  }
};
