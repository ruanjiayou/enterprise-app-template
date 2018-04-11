## generator说明
根据模板和数据生成页面
- 确保安装了: gulp shelljs lodash handlebars
- 确保已存在: generator文件夹和gulpfile.js文件

#### seed数据格式说明
pages.text pages.parentTab是被占用了的
```
basic: 小程序项目基本信息 title/description/home/context/autoLogin
app.window: 小程序窗口样式
app.navigation: 导航设置
app.tabBar: 选项卡页面样式和数据
app.pages: 页面 title/description/path/components
```
### gulp任务
- 生成代码: gulp generate 
- 编译小程序: gulp/gulp dev/gulp test/gulp production
- 清空生成的代码: gulp clean:generate