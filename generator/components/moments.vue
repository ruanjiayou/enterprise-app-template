<style lang="sass" scoped>
.show-box
  width: calc(100% - 26rpx)
  font-size: 32rpx
  margin-left: 26rpx
  overflow: hidden
  border-bottom: 1px solid #353535
.show-top
  float:left
  width: 700rpx
  padding-bottom: 24rpx
  padding-top: 24rpx
  line-height: 44rpx
.report-title
  width: 100%
.report-contain
  width: 100%
.img-box
  width: 714rpx
  float: left
.report-img
  width: 226rpx
  height: 226rpx
  margin: 0 12rpx 6rpx 0
.img-radius
  border-radius: 10rpx
.bottom-box
  width: 100%
  height: 70rpx
  float: left
  font-size: 24rpx
  line-height: 60rpx
.case-share
  width: 36rpx
  height: 38rpx
  float: right
  background: url(http://collie-1253114089.file.myqcloud.com/basic/share.png) no-repeat
  background-size: 36rpx 38rpx
  margin-right: 16rpx
  margin-top: 6rpx
</style>
<template>
  <view class="show-box" wx:for="{{result}}" class="show-box" wx:key="{{index}}" style="color:{{color}}">
    <view class="show-top">
      <text class="report-title">{{item.title}}</text>
      <view class="report-contain">
        <text>{{item.content}}</text>
      </view>
    </view>
    <view class="img-box">
      <block wx:for="{{item.images}}" wx:key="{{index}}" wx:for-item="image">
        <image src="{{image}}" class="report-img {{isRadius?'img-radius':''}}" @tap="bigImg" data-index="{{index}}"
          data-images="{{item.images}}" mode="aspectFill"></image>
      </block>
    </view>
    <view class="bottom-box">
      {{item.publishTime}}
      <button class="case-share" open-type="share">
    </view>
  </view>
  </view>
</template>
<script>
import wepy from "wepy";
import { formatDate } from "../utils/time";
import { shttp } from "../utils/http";
import { CONTEXT } from "../constant/configConstant";

export default class ReportItem extends wepy.component {
  props = {
    momentsOption: Object
  };
  data = {
    result: [],
    page: 1,
    limit: 4,
    total: 0,
    color: "#ffffff",
    isRadius: false,
    componentId: ""
  };
  methods = {
    bigImg: e => {
      const index = e.currentTarget.dataset.index;
      const images = e.currentTarget.dataset.images;
      wx.previewImage({
        current: images[index],
        urls: images
      });
    }
  };
  async getData() {
    let res = await shttp.get(`/contexts/${CONTEXT}/moments?componentId=${this.componentId}&limit=${this.limit}&page=${this.page}`).end();
    res.result.forEach(item => {
      item.publishTime = formatDate(item.createdAt);
      this.result.push(item);
    });
    this.total = res.result.total;
    this.$apply();
  }
  async init() {
    if (this.momentsOption.color) {
      this.color = this.momentsOption.color;
    }
    this.isRadius = this.momentsOption.isRadius;
    this.componentId = this.momentsOption.componentId;
    this.$apply();
  }
  events = {
    getMoreReport: async $event => {
      if (this.result.length >= this.total) return;
      this.page += 1;
      wx.showLoading({
        title: "正在加载"
      });
      await this.getData();
      wx.hideLoading();
      this.$apply();
    }
  };
  async onLoad() {
    this.init();
    await this.getData();
  }
}
</script>