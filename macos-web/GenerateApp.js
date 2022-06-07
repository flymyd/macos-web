(() => {
  const fs = require('fs');
  const rootPath = `./src/apps/`;
  // let data = fs.readFileSync(filePath, "utf-8")
  const inquirer = require("inquirer");
  inquirer
    .prompt([
      {
        type: "input",
        name: "appName",
        message: "请输入App的唯一标识符(identifier id)",
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "需要输入App标识符";
        }
      }, {
        type: "input",
        name: "name",
        message: "请输入Dock及状态栏的显示名",
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return "需要输入显示名";
        }
      }, {
        type: "input",
        name: "titleName",
        message: "请输入标题栏显示的名称，非必填"
      }
    ])
    .then(answers => {
      const template = JSON.stringify(answers);
      fs.mkdirSync(`${rootPath}${answers.appName}/`)
      fs.appendFileSync(`${rootPath}${answers.appName}/plist.json`, template)
    });
})()