<!--客服组件-->
<style lang="sass" scoped>
.enroll-box
  position: fixed
  width: 80rpx
  height: 80rpx
  z-index: 9
  overflow: hidden
.enroll-call
  width: 80rpx
  height: 80rpx
  border-radius: 50%
  overflow: hidden
  padding: 0
  border: none 0
  background: tranparent
  image
   width: 80rpx
   height: 80rpx
</style>
<template>
  <!-- <button class="contact" open-type="contact">
    <image class="contact-icon" src="/images/contact.png"></image>
  </button> -->
  <view class="enroll-box" style="bottom:{{bottom}};right:{{right}}">
        <button open-type="contact" class="enroll-call"><image class="contact-icon" src="{{url}}"></image></button>
   </view>
</template>
<script>
import wepy from "wepy";
export default class Contact extends wepy.component {
  props = {
    contactOption: Object
  };
  data = {
    url: "",
    bottom: "254rpx",
    right: "30rpx"
  };
  methods = {};
  async init() {
    this.url = this.contactOption.image;
    if (this.contactOption.bottom) {
      this.bottom = parseInt(this.contactOption.bottom) + "rpx";
    }
    if (this.contactOption.right) {
      this.right = parseInt(this.contactOption.right) + "rpx";
    }
    this.$apply();
  }
  async onLoad() {
    this.init();
  }
}
</script>