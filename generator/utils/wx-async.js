import wepy from 'wepy';

const chooseImage = async (options) => {
  options = options || {};
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: options.count,
      success: (res) => {
        return resolve(res.tempFilePaths);
      },
      fail: (err) => {
        return reject(err);
      }
    });
  });
};

const autoNavigate = (app, url, redirect) => {
  if (!/pages/.test(url)) {
    return console.log(url);
  }
  const tabBar = [];
  app.config.tabBar.list.forEach((item) => {
    tabBar.push(`/${item.pagePath}`);
  });
  if (redirect) {
    wx.redirectTo({
      url
    });
  } else if (tabBar.indexOf(url) === -1) {
    wx.navigateTo({
      url
    });
  } else {
    wx.switchTab({
      url
    });
  }
};


export {
  chooseImage,
  autoNavigate
};