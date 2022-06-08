(() => {
  const fs = require('fs');
  const distPath = './public/plist.js'
  const appPath = './src/apps/';
  let resArr = [];
  fs.readdir(appPath, 'utf8', (err, data) => {
    data.forEach(v => {
      const plistPath = `${appPath}${v}/plist.json`;
      if (fs.existsSync(plistPath)) {
        const plist = fs.readFileSync(plistPath, { encoding: 'utf-8' });
        resArr.push(JSON.parse(plist))
      }
    })
    fs.appendFile(distPath, JSON.stringify(resArr), err => {
      if (err) {
        console.log(err)
      } else {
        // console.log(template)
        console.log('生成完毕')
      }
    })
  })
})()
