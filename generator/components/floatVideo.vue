<style lang="sass" scoped>
.video-box
  position: fixed
  width: 100%
  height: 100%
  background: rgba(0,0,0,0.5)
  z-index: 99
  top: 0rpx
  overflow: hidden
.video-close
  width: 58rpx
  height: 58rpx
  margin: 158rpx 0 0 668rpx
.video-close image
  width: 100%
  height: 100%
.video-main
  width: 706rpx
  height: 396rpx
  position: absolute
  z-index: 888
  left: 20rpx
  top: 428rpx
  border: 2rpx solid #990000

.video-img
  width: 334rpx
  height: 68rpx
  background: #990000
  color: #fff
  line-height: 68rpx
  font-size: 36rpx
  text-align: center
  float: left
.video-img-box
  position: absolute
  width: 334rpx
  height: 68rpx
  top: 362rpx
  left: 20rpx
  z-index: 999
  border-radius: 30rpx 30rpx 0 0
  overflow: hidden
</style>
<template>
    <view hover-class="none" class="video-box" wx:if="{{isOpen}}">
        <view catchtap="closeModel" class="video-close"><image src="http://collie-1253114089.file.myqcloud.com/basic/%E6%A4%AD%E5%9C%86691%402x.png" mode="aspectFill"></image></view>
        <video class="video-main" poster="{{result.poster}}" src="{{result.video}}" bindplay="isClose" show-fullscreen-btn="true" direction="90" bindended="closeModel" controls="controls"></video>
        <view class="video-img-box">
            <view class="video-img">来驿动 带你飞</view>
        </view>
    </view>  
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { CONTEXT } from "../constant/configConstant";
export default class VideoItem extends wepy.component {
  props = {};

  data = {
    result: {},
    isOpen: true,
    noOpen: false
  };
  methods = {
    closeModel: () => {
      if (this.noOpen == true) {
        this.isOpen = false;
        this.$emit("scroll", true);
        this.$apply();
      }
    },
    onScroll: e => {
      console.log(e);
    },
    isClose: () => {
      this.noOpen = true;
    }
  };
  async getData() {
    let res = await shttp.get(`/contexts/${CONTEXT}/videos?componentId=gjegewgbwb`).end();
    this.result = res.result[0];
    this.$apply();
  }

  async onLoad() {
    this.getData();
    setTimeout(() => {
      this.noOpen = true;
    }, 2000);
  }
}
</script>