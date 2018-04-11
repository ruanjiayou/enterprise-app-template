<style lang="sass" scoped>
.show-box
  width: calc(100% - 22rpx)
  font-size: 32rpx
  padding-left: 22rpx
  overflow: hidden
.show-top
  width: 100%
  height: 62rpx
  padding-top: 40rpx
.show-name
  float: left
  height: 34rpx
  margin-right: 16rpx
  line-height: 34rpx
.bottom-line
  width: 2rpx
  height: 34rpx
  background: #fff
  float: left
.show-contain
  float: left
  height: 34rpx
  margin-left: 16rpx
  line-height: 34rpx
.swiper-box
.swiper-item
  width: 710rpx
  height: 100%
.slide-image
  width: 710rpx
  height: 100%
</style>
<template>
    <view class="show-box" style="color:{{color}};height:{{boxHeight}}">
        <view class="show-top">
            <view class="show-name">{{result.title}}</view>
            <!-- <p class="bottom-line"></p>
            <view class="show-contain">{{result.subTitle}}</view> -->
        </view>
        <swiper class="swiper-box" style="height:{{videoHeight}}" indicator-dots="{{indicatorDots}}"
             interval="{{interval}}" duration="{{duration}}">
            <!-- <block wx:for="{{result.video}}"> -->
              <swiper-item class="swiper-item" >
                <video src="{{result.video}}" autoplay="{{autoplay}}" direction="90" poster="{{result.poster}}" class="slide-image" show-fullscreen-btn="true" controls="controls"></video>
              </swiper-item>
            <!-- </block> -->
        </swiper>
    </view>  
</template>
<script>
import wepy from "wepy";
import {shttp } from "../utils/http";
import { CONTEXT } from "../constant/configConstant";
export default class CollegeItemVideo extends wepy.component {
  props = {
    videoOption: Object
  };
  data = {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    result: {},
    color: "#ffffff",
    videoHeight: "414rpx",
    boxHeight: "540rpx"
  };
  async getData() {
    let res = await shttp.get(`/contexts/${CONTEXT}/videos?componentId=${this.componentId}`);
    this.result = res.result[0];
    this.$apply();
  }
  async init() {
    this.autoplay = this.videoOption.autoplay;
    if (this.videoOption.color) {
      this.color = this.videoOption.color;
    }
    if (this.videoOption.videoHeight) {
      this.videoHeight = parseInt(this.videoOption.videoHeight) + "rpx";
    }
    this.componentId = this.videoOption.componentId;
    this.boxHeight = parseInt(this.videoHeight) + 126 + "rpx";
    this.$apply();
  }
  async onLoad() {
    this.init();
    this.getData();
  }
}
</script>