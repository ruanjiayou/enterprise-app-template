<style lang="sass">
@import "../styles/common.sass"

.show-btn
  margin-top: 100rpx
  color: #22cc22

.modal-mask
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  background: #000
  opacity: 0.5
  overflow: hidden
  z-index: 9000
  color: #fff

.modal-dialog
  width: 600rpx
  height: 350rpx
  overflow: hidden
  position: fixed
  top: 50%
  left: 0
  z-index: 9999
  background: #f9f9f9
  margin: -180rpx 75rpx
  border-radius: 8rpx

.modal-title
  padding-top: 40rpx
  color: #030303
  font-size: 45rpx
  text-align: center

.modal-content
  padding: 10rpx 80rpx
  text-align: center
  font-size: 36rpx
  color: #9a9a9a

.input
  width: 100%
  height: 82rpx
  font-size: 28rpx
  line-height: 28rpx
  padding: 0 20rpx
  box-sizing: border-box
  color: #333

input-holder
  color: #666
  font-size: 28rpx

.modal-footer
  position: absolute
  bottom: 0
  width: 600rpx;
  display: flex
  flex-direction: row
  height: 110rpx
  border-top: 1px solid #dedede
  line-height: 110rpx

.modal-button
  width: 50%
  text-align: center
  font-size: 45rpx
  line-height: 110rpx
  border-radius: 0
  &:after
    border: none

.modal-cancel
  color: #666
  border-right: 1px solid #dedede

.modal-confirm
  color: #3cc51f

</style>
<template>
<view class="modal"  wx:if="{{showModal}}">
  <view class="modal-mask" wx:if="{{showModal}}"/>
  <view class="modal-dialog">
    <view class="modal-title">{{title}}</view>
    <view class="modal-content">{{content}}</view>
    <view class="modal-footer">
      <view class="modal-button modal-cancel" bindtap="onCancel" data-status="cancel">取消</view>
      <view class="modal-button modal-confirm" wx:if="{{!canShare}}" bindtap="onConfirm" data-status="confirm">确定</view>
      <button class="modal-button modal-confirm" wx:if="{{canShare}}" open-type="share" bindtap="onConfirm">分享</button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
export default class List extends wepy.component {
  props = {
    title: String,
    content: String,
    canShare: true,
    confirm: String,
    cancel: String
  };

  data = {
    showModal: false
  };

  methods = {
    onConfirm: () => {
      if (this.confirm) {
        setTimeout(() => {
          this.$parent[this.confirm]();
        }, 300);
        this.showModal = false;
      }
    },

    onCancel: () => {
      if (this.cancel) {
        this.$parent[this.cancel]();
        this.showModal = false;
      }
    }
  };

  events = {
    showModal: $event => {
      this.showModal = true;
    }
  };

  hideModal() {
    this.showModal = false;
  }
}
</script>
