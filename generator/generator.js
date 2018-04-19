const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const handlebars = require('handlebars');

// gulp中调用,__dirname 是{project}/generator
class Generator {
  constructor(seedJson) {
    this.initDirs();
    this.seed = seedJson;
    this.pages = this.findoutPages();
  }
  initDirs() {
    // 必要的文件夹不存在则创建
    this._createDir(this._2abspath('../src/constant'));
    this._createDir(this._2abspath('../src/pages'));
    this._createDir(this._2abspath('../src/images'));
    this._createDir(this._2abspath('../src/components'));
    this._createDir(this._2abspath('../src/styles'));
    this._createDir(this._2abspath('../src/utils'));
  }
  // gulp generate 一键生成
  generate() {
    let isGenerated = false;
    // fs.existsSync(this._2abspath('../src/app.vue'))
    if (!isGenerated){
      this.generateApp();
      this.generatePages();
      this.generateConfig();
      this.copyFiles();
    } else {
      throw new Error('已经generator了?');
    }    
  }
  /**
   * 1.找到页面和tabBar页面路径
   * @returns {string[]}
   */
  findoutPages() {
    let pages = [];
    this.seed.app.tabBar.list.forEach((item) => {
      pages.push(item.pagePath);
    });
    if (this.seed.app.pages) {
      this.seed.app.pages.forEach((item) => {
        pages.push(item.path);
      });
    }
    return pages;
  }
  /**
   * 2.根据路径生成页面
   * @param {string[]} pages 页面数组
   */
  generateApp() {
    const templatePath = this._2abspath('./template/app.vue');
    const appPath = this._2abspath('../src/app.vue');
    let appContent = fs.readFileSync(templatePath, 'utf8');

    let tabBarList = [];
    this.seed.app.tabBar.list.forEach((item) => {
      tabBarList.push({
        pagePath: item.pagePath,
        text: item.text,
        iconPath: item.iconPath,
        selectedIconPath: item.selectedIconPath
      });
    });
    const appConfigCustom = {
      pages: this.pages,
      window: this.seed.app.window,
      tabBar: this.seed.app.tabBar
    };
    appConfigCustom.list = tabBarList;
    const appConfigDefault = require('./template/app-config');
    const tabBar = Object.assign(appConfigDefault.tabBar, appConfigCustom.tabBar);
    appConfigCustom.tabBar = tabBar;
    const appConfig = JSON.stringify(Object.assign(appConfigDefault, appConfigCustom)).replace(/,/g, ',\n');
    const appConfigSlash = this._compile(appContent, {
      basic: this.seed.basic,
      config: appConfig
    });
    fs.writeFileSync(appPath, appConfigSlash, 'utf8');
  }
  /**
   * 生成 单个页面
   * @param {object} data 
   * @param {int} index 
   */
  generateSinglePage(data, index) {
    const appPath = this._2abspath(`../src/${data.path}.vue`);
    const templatePath = this._2abspath('./template/page.vue');
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    if (data.navigation) {
      data.components.unshift({
        type: 'navigation',
        data: Object.assign(this.seed.app.navigation, { tabPage: data.tabPage })
      });
    }
    data.components.forEach((component) => {
      component.dom = component.id ? `${component.type}ID${component.id}` : component.type;
    });
    const tplData = {
      basic: this.seed.basic,
      page: data,
      import: this.getImportData(data),
      pageInSeed: this.getIndexData(data, index),
      pageStyle: this.getStyleData(data),
      components: this.getComponentsData(data),
      html: this.getHtmlData(data)
    };
    fs.writeFileSync(appPath, this._compile(templateContent, tplData), 'utf8');
  }
  /**
   * 3.生成 所有页面
   */
  generatePages() {
    this.seed.app.tabBar.list.forEach((item, index) => {
      const pagePath = item.pagePath;
      const data = {
        path: pagePath,
        components: item.components,
        navigation: item.navigation,
        tabPage: true,
        style: item.style
      };
      this.generateSinglePage(data, index);
    });
    this.seed.app.pages.forEach((item, index) => {
      this.generateSinglePage(item, index);
    });
  }
  /**
   * 4.生成 配置文件
   */
  generateConfig() {
    // const configTemplate = this._2abspath('./constant/configConstant.js');
    // const configPath = this._2abspath('../src/constant/configConstant.js');
    // let configContent = fs.readFileSync(configTemplate, 'utf8');
    // fs.writeFileSync(configPath, this._compile(configContent, { basic: this.seed.basic }), 'utf8');
  }
  /**
   * 5.seed.json改到src/seed.js
   */
  copyFiles() {
    const seedJsPath = this._2abspath('../src/seed.js');
    let seedContent = 'export default ' + JSON.stringify(this.seed) + ';';
    fs.writeFileSync(seedJsPath, seedContent, 'utf8');
    shell.cp('-R', this._2abspath('./components'), this._2abspath('../src'));
    shell.cp('-R', this._2abspath('./constant'), this._2abspath('../src'));
    shell.cp('-R', this._2abspath('./styles'), this._2abspath('../src'));
    shell.cp('-R', this._2abspath('./utils'), this._2abspath('../src'));

    const configTemplate = this._2abspath('./constant/configConstant.js');
    const configPath = this._2abspath('../src/constant/configConstant.js');
    let configContent = fs.readFileSync(configTemplate, 'utf8');
    fs.writeFileSync(configPath, this._compile(configContent, { basic: this.seed.basic }), 'utf8');
  }
  /**
   * 将模板编译为字符串
   * @param {string} str 字符串模板
   * @param {*} data 数据
   * @returns {string} 编译好的字符串
   */
  _compile(str, data) {
    let tpl = handlebars.compile(str);
    return tpl(data);
  }
  /**
   * 处理文件路径
   * @param {string} filepath 文件路径
   * @returns {string} 绝对路径
   */
  _2abspath(filepath) {
    return path.resolve(__dirname, filepath);
  }
  /**
   * 文件夹不存在则创建
   */
  _createDir(dir) {
    let isExists = fs.existsSync(dir) && fs.lstatSync(dir).isDirectory();
    if (isExists === false) {
      fs.mkdirSync(dir);
    }
  }
  /**
   * 获取 模板html数据
   * @param {object} data 
   * @returns {string} 
   */
  getHtmlData(data) {
    let template = '';
    data.components.forEach((component) => {
      const dom = component.dom;
      const singleDom = `<${dom} :${component.type}Option='${dom}'></${dom}>`;
      template += singleDom;
      template += '\n    ';
    });
    return template.replace(/\n\s*$/m, '');
  }
  /**
   * 获取 导入import数据
   * @param {object} data 
   * @returns {string}
   */
  getImportData(data) {
    let template = '';
    let types = [];
    data.components.forEach((component) => {
      if (types.indexOf(component.type) !== -1) return;
      types.push(component.type);
      const componentClass = _.upperFirst(_.camelCase(component.type));
      template += `import ${componentClass} from '../components/${component.type}';\n`;
    });
    return template.replace(/\n$/m, '');
  }
  /**
   * 获取数据部分数据
   * @param {object} data 
   * @returns {string}
   */
  getData(data) {
    let template = '';
    let pageData = {};
    data.components.forEach((component) => {
      const dom = component.dom;
      pageData[dom] = component.data || {};
      if (component.id) {
        pageData[dom].componentId = component.id;
      }
    });
    template = JSON.stringify(pageData);
    return template;
  }
  /**
   * 生成 样式部分
   * @param {object} data 
   * @param {string} templateContent 
   * @returns {string}
   */
  getStyleData(data) {
    let style = '';
    if (data.style) {
      const keys = Object.keys(data.style);
      keys.forEach((key) => {
        style += `  ${key}: ${data.style[key]}\n`;
      });
    }
    return style.replace(/\n$/m, '');
  }
  /**
   * 获取pageInSeed部分数据
   * @param {object} data 
   * @param {int} index 
   * @returns {string}
   */
  getIndexData(data, index) {
    let indexString;
    // 判断是tab页还是page页
    if (data.tabPage) {
      indexString = `seed.app.tabBar.list[${index}]`;
    } else {
      indexString = `seed.app.pages[${index}]`;
    }
    return indexString;
  }
  /**
   * 获取组件部分数据
   * @param {object} data 
   * @returns {string}
   */
  getComponentsData(data) {
    let template = '';
    data.components.forEach((component) => {
      const dom = component.dom;
      const componentClass = _.upperFirst(_.camelCase(component.type));
      template += `    ${dom}: ${componentClass},\n`;
    });
    return template.replace(/,\n$/mg, '').trim();
  }
}

module.exports = Generator;