/**
 * 配置常量
 */

const CONTEXT = {{{ basic.context }}};
const BASE_URL_LOCAL = 'http://127.0.0.1:3000';
const BASE_URL_DEVELOPMENT = 'https://aaaab.healthsource.com.cn';
const BASE_URL_PRODUCTION = 'https://collie.healthsource.com.cn';
const ENV = 'dev';
const DEBUG = false;
const BASE_URL = {
  dev: BASE_URL_LOCAL,
  test: BASE_URL_DEVELOPMENT,
  production: BASE_URL_PRODUCTION,
};

module.exports = {
  CONTEXT,
  BASE_URL,
  ENV,
  DEBUG
};