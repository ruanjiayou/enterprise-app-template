/**
 * 时间工具
 */

/**
 * 毫秒值转日期
 */
function formatDate(oldtime) {
  let d1;
  if (typeof (oldtime) === 'string') {
    d1 = new Date(oldtime);
  } else {
    d1 = oldtime;
  }
  d1 = new Date(oldtime);
  let d2 = new Date();
  let second = parseInt(parseInt(d2 - d1) / 1000);
  let minute = parseInt(parseInt(d2 - d1) / 1000 / 60);
  let hour = parseInt(parseInt(d2 - d1) / 1000 / 60 / 60);
  let day = parseInt(parseInt(d2 - d1) / 1000 / 60 / 60 / 24);
  // console.log(parseInt(d2 - d1)); //两个时间相差的毫秒数
  // console.log(parseInt(d2 - d1) / 1000); //两个时间相差的秒数
  // console.log(parseInt(d2 - d1) / 1000 / 60); //两个时间相差的分钟数
  // console.log(parseInt(d2 - d1) / 1000 / 60 / 60); //两个时间相差的小时数
  if (second < 60) {
    return '刚刚';
  } else if (minute < 60) {
    return minute + '分钟前';
  } else if (hour < 24) {
    return hour + '小时前';
  } else {
    return day + '天前';
  }

}
export {
  formatDate
};