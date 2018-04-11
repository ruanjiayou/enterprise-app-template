<!--图文遮罩组件-->
<style lang="sass" scoped>
.shadeText-container
  position: relative
  margin-bottom: 4rpx

.shadeText-wrap
  position: relative
  overflow: hidden

.shadeText-image
  height: 100%
  width: 100%

.shadeText-shade
  position: absolute
  display: flex
  flex-direction: column
  justify-content: center
  z-index: 999

.shadeText-shade_left
  @extend .shadeText-shade 
  top: 0
  left: 0
  height: 100%
  width: 70%
  background: linear-gradient(to left, rgba(0,0,0,0), red)
  .shadeText-title, .shadeText-content
    margin-top: 20rpx
    text-align: left

.shadeText-shade_right
  @extend .shadeText-shade 
  top: 0
  right: 0
  height: 100%
  width: 70%
  background: linear-gradient(to right, rgba(0,0,0,0), red) 
  .shadeText-title, .shadeText-content
    margin-top: 20rpx
    text-align: right

.shadeText-shade_top
  @extend .shadeText-shade 
  top: 0
  right: 0
  height: 35%
  width: 100%
  justify-content: flex-start
  padding-top: 20rpx
  background: linear-gradient(to top, rgba(0,0,0,0), red) 

.shadeText-shade_bottom
  @extend .shadeText-shade 
  bottom: 0
  right: 0
  height: 35%
  width: 100%
  justify-content: flex-end
  padding-bottom: 20rpx
  background: linear-gradient(to bottom, rgba(0,0,0,0), red) 

.shadeText-title
  font-size: 100rpx
  font-weight: bolder
  color: white
  padding: 0 35rpx
  text-align: left

.shadeText-content
  color: white
  font-size: 50rpx
  text-align: left
  background: rgba(0,0,0,0.5)
  height: 60rpx
  line-height: 60rpx
  width: 192rpx
  text-align: center
  border-radius: 10rpx
.shadeText-shade_right
  .shadeText-content
    margin-left: 230rpx
.shadeText-shade_left
  .shadeText-content
    margin-left: 80rpx
.get-details
  position:absolute
  color: #ffffff
  z-index: 99
  font-size: 28rpx
  width: 200rpx
  height: 60rpx
  top: 0
.san
  float: left
  width: 0
  height: 0
  border-top: 15rpx solid transparent
  border-right: 15rpx solid transparent
  border-bottom: 15rpx solid transparent
  border-left: 15rpx solid #ffffff
  margin-top: 16rpx
  margin-left: 4rpx
.san-content
  text-align: center
  float: left
  height: 100%
  width: 150rpx
</style>
<template>
  <view class="shadeText-container" style="height:{{hight}}" catchtap="click" wx:if="{{image}}">
    <image class="shadeText-image" src="{{image}}" mode="aspectFill"/>
    <view class="{{shadeClass}}" style="background: {{gradient}}">
      <view class="shadeText-title" style="font-size: {{titleSize}}">{{title}}</view>
      <view class="shadeText-content" style="font-size: {{contentSize}}"><view class="san-content">{{content}}</view><view class="san"></view></view>
      <!-- <view class="get-details">{{content}}</view> -->
    </view>
    
  </view>
</template>
<script>
/**
  @param titleSize<String>  标题字体大小
  @param contentSize<String>  内容字体大小
  @param direction<String>  遮罩处在的方向(left, right, top, bottom)
  @param hight<String>  组件高度
  @param color<String>  遮罩颜色
  @param url<String>  点击跳转链接
*/
import wepy from "wepy";
import { shttp } from "../utils/http";
import { autoNavigate } from "../utils/wx-async";
import { CONTEXT } from "../constant/configConstant";

export default class ShadeText extends wepy.component {
  props = {
    shadeTextOption: Object
  };
  data = {
    title: "",
    titleSize: "",
    content: "",
    contentSize: "",
    image: "",
    url: "",
    hight: "33vh",
    shadeClass: "",
    gradient: ""
  };

  methods = {
    // 点击图片触发事件
    click: e => {
      autoNavigate(this.$parent.$parent, this.url);
    }
  };

  onLoad() {
    this.init();
    this.getData().catch(err => {
      return console.error(err);
    });
  }

  init() {
    this.titleSize = this.shadeTextOption.titleSize || "50rpx";
    this.contentSize = this.shadeTextOption.contentSize || "30rpx";
    this.color = this.shadeTextOption.color || "#333";
    this.hight = this.shadeTextOption.hight || "33vh";
    this.direction = this.shadeTextOption.direction || "left";
    this.shadeClass = `shadeText-shade_${this.direction}`;
    this.gradient = `linear-gradient(to ${this.direction}, rgba(0,0,0,0), ${
      this.color
    })`;
  }

  async getData() {
    const res = await shttp.get(`/contexts/${CONTEXT}/shadeTexts?componentId=${this.shadeTextOption.componentId}`).end();
    const resData = res.result[0];
    if (!resData) return;
    this.title = resData.title || "标题";
    this.content = resData.content || "内容";
    this.image = resData.image || "";
    this.url = resData.url || "";
    this.$apply();
  }
}
</script>
