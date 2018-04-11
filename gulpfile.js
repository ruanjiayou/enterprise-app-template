const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const shell = require('shelljs');
const Generator = require('./generator/generator');
const SeedJson = require('./generator/seed');

// 自动生成页面
gulp.task('generate', () => {
  const generate = new Generator(SeedJson);
  generate.generate();
});
// 清除编译的dist文件夹
gulp.task('clean', () => {
  shell.rm('-rf', 'dist');
  shell.mkdir('dist');
  shell.cp('-R', 'src/images', 'dist/images');
});
gulp.task('clean:generate', () => {
  shell.rm('-rf', 'src/constant');
  shell.rm('-rf', 'src/components');
  shell.rm('-rf', 'src/pages');
  shell.rm('-rf', 'src/styles');
  shell.rm('-rf', 'src/utils');
  shell.rm('rm', 'src/app.vue');
  shell.rm('rm', 'src/seed.js');
});
// 开发环境下编译运行
gulp.task('dev', () => {
  run('dev');
});
gulp.task('test', () => {
  run('test');
});
// 测试环境下编译运行
gulp.task('production', () => {
  run('production');
});
// 正式环境下编译运行
gulp.task('default', ['clean', 'dev']);

const run = (env) => {
  // 设置环境变量
  process.env.NODE_ENV = env;
  const currentEnv = `const ENV = '${env}'`;
  const configPath = path.resolve(__dirname, 'src/constant/configConstant.js');
  let configContent = fs.readFileSync(configPath, 'utf8');
  configContent = configContent.replace(/const ENV = (['"])\w*(\1)/, currentEnv);
  fs.writeFileSync(configPath, configContent, 'utf8');
  // 运行
  shell.exec('wepy build --watch');
};