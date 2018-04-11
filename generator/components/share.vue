<style lang="sass">
@import "../styles/common.sass"
.shadow
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, .7)
  z-index: 999

.shadow-icon
  width: 127rpx
  height: 101rpx
  position: fixed
  top: 20rpx
  right: 38rpx

.shadow-text
  margin-top: 178rpx
  font-size: 32rpx
  color: white
  font-weight: 200
  text-align: center

</style>
<template>
<view class="shadow"  wx:if="{{showShare}}" bindtap="hide">
  <image class="shadow-icon" src="https://wxclassroom-1253114089.cossh.myqcloud.com/assets/share2.png" mode="aspectFill"></image>
  <view class="shadow-text">点击右上方，将课程分享给好友吧</view>
</view>
</template>
<script>
import wepy from "wepy";
import { onceClick } from "../utils/tools";
export default class List extends wepy.component {
  props = {};

  data = {
    showShare: false
  };

  methods = {
    hide: () => {
      onceClick(this, "hideClick", () => {
        this.showShare = false;
        wepy.redirectTo({ url: "/pages/user/open" });
      });
    }
  };

  events = {
    showShare: $event => {
      this.showShare = true;
    }
  };

  onLoad() {}
}
</script>
