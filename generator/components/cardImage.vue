<style lang="sass" scoped>
.main-img
  width: 710rpx
  margin: 44rpx 20rpx 40rpx 20rpx
  position: relative
  image
    width: 100%
    height: 100%
.img-radius
  border-radius: 10rpx
  overflow: hidden
  image
   width: 100%
   height: 100%
.img-content
  position: absolute
  top: 0
  height: 100%
  width: 100%
  color: #fff
  font-family: PingFang-SC-Regular
.zhubo-title
  width: 100%
  height: 40rpx
  line-height: 40rpx
  text-align: center
  margin-top: 12.8%
.zhubo-name
  width: 100%
  height: 66rpx
  line-height: 66rpx
  text-align: center
  margin-top: 2.8%
.zhubo-to
  width: 192rpx
  height: 60rpx
  border-radius: 10rpx
  background: #FF258C
  text-align: center
  line-height: 60rpx
  margin-left: 266rpx
  margin-top: 3.7%
  font-size: 28rpx
</style>
<template>
  <navigator url="{{url}}" style="height: {{height}}"
               class="main-img {{isRadius? 'img-radius' : ''}}">
      <image src="{{image}}" mode="aspectFill"></image>
      <view class="img-content">
        <view class="zhubo-title" style="font-size: {{titleSize}}">{{title}}</view>
        <view class="zhubo-name" style="font-size: {{contentSize}}">{{content}}</view>
        <view class="zhubo-to">了解更多</view>
      </view>
    </navigator>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import { autoNavigate } from "../utils/wx-async";
import { CONTEXT } from "../constant/configConstant";
export default class CardImage extends wepy.component {
  props = {
    cardImageOption: Object
  };
  data = {
    title: "",
    titleSize: "40rpx",
    content: "",
    contentSize: "66rpx",
    image: "",
    url: "",
    height: "400rpx",
    isRadius: false,
    componentId: ""
  };
  methods = {};
  async getData() {
    const res = await shttp.get(`/contexts/${CONTEXT}/shadeTexts?componentId=${this.componentId}`).end();
    const resData = res.result[0];
    if (!resData) return;
    this.title = resData.title || "标题";
    this.content = resData.content || "内容";
    this.image = resData.image || "";
    this.url = resData.url || "";
    this.$apply();
  }
  async init() {
    if (this.cardImageOption.height) {
      this.height = parseInt(this.cardImageOption.height) + "rpx";
    }
    if (this.cardImageOption.contentSize) {
      this.contentSize = parseInt(this.cardImageOption.contentSize) + "rpx";
    }
    if (this.cardImageOption.titleSize) {
      this.titleSize = parseInt(this.cardImageOption.titleSize) + "rpx";
    }
    this.isRadius = this.cardImageOption.isRadius;
    this.componentId = this.cardImageOption.componentId;
    this.$apply();
  }
  async onLoad() {
    this.init();
    await this.getData().catch(err => {
      return console.error(err);
    });
    this.$apply();
  }
}
</script>