
<style lang="sass" scoped>
@import "../styles/common.sass"
.navigation-container
  width: 100%
  height: $android-height
  background: #888
  position: fixed
  top: 0
  z-index: 9999
  font-size: 36rpx
.navigation-height
  height: $ios-height
.navigation-info
  position: relative
  top: 70rpx
  width: 100%
  height: 70rpx
  display: flex
  align-items: center
.box-height
  top: 48rpx
.navigation-back
  width: 80rpx
  height: 100rpx
  display: flex
  justify-content: center
  align-items: center

.navigation-backIcon
  display: block
  width: 40rpx
  height: 45rpx
  transform: rotateY(180deg)
  -webkit-filter: brightness(200%)
  filter: brightness(200%)
  margin-bottom: 7rpx

.navigation-logo
  width: 58rpx
  height: 58rpx
  margin: 0 20rpx
  border-radius: 50%
  overflow: hidden
  border: 1px solid #990000
.navigation-logo image
  height: 58rpx
  width: 150rpx
  margin-left: 8rpx
.navigation-name
  font-weight: 200
.strong-font
  font-weight: 500
</style>
<template>
  <view class="navigation-container" style="{{navigationStyle}}">
    <view class="navigation-info {{isIOS?'box-height':''}}">
      <view class="navigation-back" catchtap="navigateBack" wx:if="{{!navigationOption.tabPage}}">
        <image class="navigation-backIcon" src="http://collie-1253114089.file.myqcloud.com/basic/path.png" mode="aspectFit"></image>
      </view>
      <view class="navigation-logo"><image src="http://collie-1253114089.file.myqcloud.com/%E6%98%9F%E9%A9%BF%E5%8A%A8/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180131101857%E6%8B%B7%E8%B4%9D%402x.png" mode="aspectFit"></image></view>
      <view class="navigation-name {{isIOS?'strong-font':''}}">{{navigationOption.name}}</view>
    </view>
  </view>
</template>
<script>
/**
  @param name<string> 导航栏标题
  @param style<object> css样式
  @example
  "navigation": {
    "name": "星驿动",
    "style": {
      "color": "white",
      "gradientLight": "#930101",
      "gradientDark": "#5C0C0B"
    }
  }
 */
import wepy from "wepy";
import { ICON_LOCATION } from "../constant/iconConstant";
export default class Map extends wepy.component {
  props = {
    navigationOption: Object
  };

  data = {
    backIconLocation: ICON_LOCATION,
    name: "",
    company: {},
    navigationStyle: "",
    isIOS: false
  };

  methods = {
    navigateBack: e => {
      wx.navigateBack();
    }
  };
  init() {
    this.company = this.$parent.$parent.globalData.company;
    var str = wx.getSystemInfoSync().system;
    var isSystem = new RegExp("iOS", "g");
    this.isIOS = isSystem.test(str);
    this.$apply();
  }
  onLoad() {
    this.company = this.$parent.$parent.globalData.company;
    const style = this.navigationOption.style;
    this.init();
    this.navigationStyle =
      `background: linear-gradient(0, ${style.gradientLight}, ${
        style.gradientDark
      });` + `color:${style.color};`;
  }
}
</script>