<style lang="sass" scoped>
.show-box
  width: calc(100% - 22rpx)
  height: 540rpx
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
  height: 438rpx
.swiper-item
  float: left
  height: 100%
.slide-image
  height: 100%
</style>
<template>
  <view class="show-box" style="color:{{color}}">
    <view class="show-top">
      <view class="show-name">{{result.title}}</view>
      <!-- <p class="bottom-line"></p>
      <view class="show-contain">{{result.subTitle}}</view> -->
    </view>
    <swiper class="swiper-box"
            indicator-dots="{{indicatorDots}}"
            autoplay="{{autoplay}}"
            interval="{{interval}}"
            duration="{{duration}}"
            next-margin="{{nextMargin}}">
      <block wx:for="{{result.images}}"
             wx:key="{{index}}">
        <swiper-item class="swiper-item">
          <image src="{{item}}"
                 class="slide-image"
                 @tap="bigImg"
                 data-index="{{index}}"
                 mode="aspectFill" style="width:{{imageWidth}}"></image>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { CONTEXT } from "../constant/configConstant";

export default class CollegeItem extends wepy.component {
  props = {
    swiperOption: Object
  };
  data = {
    result: {},
    urls: [],
    color: "#ffffff",
    imageWidth: "604rpx",
    nextMargin: "94rpx",
    componentId: ""
  };
  methods = {
    bigImg: e => {
      const index = e.currentTarget.dataset.index;
      wx.previewImage({
        current: this.urls[index],
        urls: this.urls
      });
    }
  };
  async getData() {
    let res = await shttp.get(`/contexts/${CONTEXT}/swipers?componentId=${this.componentId}`).end();
    this.result = res.result[0];
    for (var j = 0; j < this.result.images.length; j++) {
      this.urls.push(this.result.images[j]);
    }
    this.$apply();
  }
  async init() {
    if (this.swiperOption.imageWidth) {
      this.imageWidth = parseInt(this.swiperOption.imageWidth) + "rpx";
    }
    this.nextMargin = 698 - parseInt(this.swiperOption.imageWidth) + "rpx";
    if (this.swiperOption.color) {
      this.color = this.swiperOption.color;
    }
    this.componentId = this.swiperOption.componentId;
    this.$apply();
  }
  async onLoad() {
    this.init();
    await this.getData();
  }
}
</script>