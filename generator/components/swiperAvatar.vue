<style lang="sass" scoped>
.show-box
  width: calc(100% - 22rpx)
  font-size: 32rpx
  margin-left: 22rpx
  overflow: hidden
  border-bottom: 1px solid #353535
.show-top
  width: 100%
  height: 106rpx
  padding-top: 16rpx
.case-img
  float: left
  height: 80rpx
  width: 80rpx
  margin-right: 22rpx
  border-radius: 50%
.case-top-right
  width: 626rpx
  height: 80rpx
  float: left
.case-name
  float: left
  width: 60%
  font-size: 30rpx
  height: 34rpx
  line-height: 34rpx
  margin-top: 4rpx
.case-share
  width: 36rpx
  height: 38rpx
  float: right
  background: url(http://collie-1253114089.file.myqcloud.com/basic/share.png) no-repeat
  background-size: 36rpx 38rpx
  margin-right: 16rpx
  margin-top: 6rpx
.show-contain
  float: left
  font-size: 24rpx
  height: 34rpx
  line-height: 34rpx
  margin-top: 10rpx
.swiper-box
.swiper-item
  width: 308rpx
  height: 100%
.slide-image
  width: 300rpx
  height: 100%
.width-more
  width: 100%
</style>
<template>
  <view wx:for="{{result}}" class="show-box" style="color:{{color}};height:{{boxHeight}}" wx:key="{{index}}" wx:for-item="caseItem">
    <view class="show-top">
      <image class="case-img" wx:if="{{caseItem.avatar}}" src="{{caseItem.avatar}}" @tap="bigHeadImg"
        data-avatar="{{caseItem.avatar}}" mode="aspectFill"></image>
      <view class="case-top-right {{caseItem.avatar==''?'width-more':''}}">
        <view class="case-name">{{caseItem.title}}</view>
        <button class="case-share" open-type="share"></button>
        <view class="show-contain">斗鱼主播房间号：{{caseItem.content}}</view>
      </view>
    </view>
    <swiper class="swiper-box" style="height:{{imgHeight}}" indicator-dots="{{indicatorDots}}" autoplay="{{autoplay}}"
      interval="{{interval}}" duration="{{duration}}" next-margin="{{nextMargin}}">
      <block wx:for="{{caseItem.images}}" wx:key="{{index}}">
        <swiper-item class="swiper-item">
          <image src="{{item}}" class="slide-image" @tap="bigImg" data-index="{{index}}"
            data-images="{{caseItem.images}}" mode="aspectFill" style="width:{{imgWidth}}"></image>
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { CONTEXT } from "../constant/configConstant";

export default class CaseItem extends wepy.component {
  props = {
    swiperAvatarOption: Object
  };
  data = {
    result: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    limit: 6,
    page: 1,
    componentId: "",
    color: "#ffffff",
    imgHeight: "450rpx",
    imgWidth: "253rpx",
    nextMargin: "469rpx",
    boxHeight: "592rpx"
  };
  methods = {
    bigHeadImg: e => {
      const avatar = e.currentTarget.dataset.avatar;
      wx.previewImage({
        current: avatar,
        urls: avatar
      });
    },
    bigImg: e => {
      const index = e.currentTarget.dataset.index;
      const images = e.currentTarget.dataset.images;
      wx.previewImage({
        current: images[index],
        urls: images
      });
    }
  };
  async getdata() {
    let res = await shttp.get(`/contexts/${CONTEXT}/cases?&limit=${this.limit}&page=${this.page}&componentId=${this.componentId}`).end();
    res.result.forEach(item => {
      this.result.push(item);
    });
    this.total = res.result.total;
    this.$apply();
  }

  events = {
    getMoreReport: async $event => {
      if (this.result.length >= this.total) return;
      this.page += 1;
      wx.showLoading({
        title: "正在加载"
      });
      await this.getdata();
      wx.hideLoading();
      this.$apply();
    }
  };
  async init() {
    if (this.swiperAvatarOption.imgHeight) {
      this.imgHeight = parseInt(this.swiperAvatarOption.imgHeight) + "rpx";
    }
    if (
      this.swiperAvatarOption.imgWidth == "" ||
      this.swiperAvatarOption.imgWidth == undefined
    ) {
      this.imgWidth = parseInt(parseInt(this.imgHeight) * 0.562) + "rpx";
    } else {
      this.imgWidth = parseInt(this.swiperAvatarOption.imgWidth) + "rpx";
    }
    if (this.swiperAvatarOption.color) {
      this.color = this.swiperAvatarOption.color;
    }
    this.componentId = this.swiperAvatarOption.componentId;
    this.nextMargin = 722 - parseInt(this.imgWidth) + "rpx";
    this.boxHeight = parseInt(this.imgHeight) + 142 + "rpx";
    this.$apply();
  }
  async onLoad() {
    this.init();
    this.getdata();
  }
}
</script>