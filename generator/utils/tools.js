import wepy from 'wepy';
import dateFormat from "dateformat";

let showFailToast = (title, showTime) => {
  wepy.showToast({
    title: title,
    image: "../images/alert.png",
    showTime: showTime
  });
};

let showDeepFailToast = (title) => {
  wepy.showToast({
    title: title,
    image: "../../images/alert.png"
  });
};

let showSuccessToast = (title) => {
  wepy.showToast({
    title: title,
    icon: "success"
  });
};



let toUTC = (date, app) => {
  if (typeof date === "number" || typeof date === "string") {
    date = new Date(date);
  }
  if (app && app.globalData.devtools) {
    return date;
  }
  let newDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );
  return newDate;
};



let getStartTime = (arr) => {
  arr.forEach(lesson => {
    lesson.displayTime = dateFormat(
      new Date(lesson.startTime),
      "yyyy-mm-dd HH:MM:ss"
    );
  });
};
/*
 * @button(string): the name of click function
 * @fun(fun): bussiness logic
 */
let onceClick = (page, button, fun) => {
  let bussiness = () => {
    fun();
    page[`${button}ed`] = true;
    page[button] = () => { };
    let timer = setTimeout(() => {
      page[button] = bussiness;
      page[`${button}ed`] = false;
    }, 1500);
  };
  if (page[`${button}ed`] == undefined || page[`${button}ed`] == false) {
    page[button] = bussiness;
  }

  page[button]();
};
export {
  showFailToast,
  showSuccessToast,
  showDeepFailToast,
  toUTC,
  getStartTime,
  onceClick
};
