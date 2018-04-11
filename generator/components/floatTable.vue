<style lang="sass" scoped>
.couch-box
  position: fixed
  width: 100%
  height: 100%
  z-index: 99999
  top: 0
  background: rgba(0, 0, 0, 0.5)
  float: left
.couch-main
  width: 600rpx
  height: 580rpx
  background: #ffffff
  margin: 296rpx 75rpx 0 75rpx
  border-radius: 5px
.couch-title
  width: 100%
  height: 36rpx
  line-height: 36rpx
  font-size: 36rpx
  text-align: center
  color: #990000
  margin: 38rpx 0 34rpx 0
  float: left
.couch-name
  height: 88rpx
  font-size: 32rpx
  padding-left: 24rpx
  margin-bottom: 30rpx
.couch-phone
  height: 88rpx
  font-size: 32rpx
  padding-left: 24rpx
  margin-bottom: 30rpx
.couch-wxphone
  height: 88rpx
  font-size: 32rpx
  padding-left: 24rpx
.input-radius
   border-radius: 10rpx
.couch-tip
  width: 490rpx
  height: 20rpx
  font-size: 20rpx
  margin-top: 2rpx
.couch-bottom
  width: 100%
  height: 100rpx
.close-couch
  width: 50%
  height: 100rpx
  font-size: 36rpx
  color: #888888
  text-align: center
  line-height: 100rpx
  float: left
.push-couch
  width: 50%
  height: 100rpx
  font-size: 36rpx
  color: #990000
  text-align: center
  line-height: 100rpx
  float: left
.enroll-boxs
  position: fixed
  width: 80rpx
  height: 80rpx
  z-index: 99
  overflow: hidden
.enroll-from
  width: 80rpx
  height: 80rpx
  border-radius: 50%
  image
   width: 100%
   height: 100%
</style>
<template>
   <view class="enroll-boxs" style="bottom:{{bottom}};right:{{right}}">
         <view class="enroll-from" catchtap="openModel"><image class="contact-icon" src="{{url}}"></image></view>
  </view>
   <view class="couch-box" wx:if="{{isOpen}}">
       <view class="couch-main">
         <view class="couch-title">面试预约</view>
         <input class="couch-name {{isRadius?'input-radius':''}}" placeholder="姓名"  bindblur="getName" style="width:{{inputWidth}};color:{{color}};background:{{backgroundColor}};margin-left:{{marginLeft}}"/>
         <input class="couch-phone {{isRadius?'input-radius':''}}"  placeholder="手机号"  bindblur="getPhone" style="width:{{inputWidth}};color:{{color}};background:{{backgroundColor}};margin-left:{{marginLeft}}"/>
         <input class="couch-wxphone {{isRadius?'input-radius':''}}"  placeholder="微信号" bindblur="getwxPhone" style="width:{{inputWidth}};color:{{color}};background:{{backgroundColor}};margin-left:{{marginLeft}}"/>
         <view class="couch-tip" style="margin-left:{{marginLeft}};color:{{color}}">恐不能及时回复，可微信沟通</view>
         <view class="couch-bottom">
           <view class="close-couch" @tap="closemodel">取消</view>
           <view class="push-couch" @tap="push">提交预约</view>
         </view>
       </view>
   </view>
</template>
<script>
import wepy from "wepy";
import { shttp } from "../utils/http";
import {
  showFailToast,
  showSuccessToast,
  onceClick,
  showloading
} from "../utils/tools";
import { CONTEXT } from "../constant/configConstant";

export default class Fixed extends wepy.component {
  props = {
    floatTableOption: Object
  };
  data = {
    name: "",
    phone: "",
    wxphone: "",
    isOpen: false,
    url: "",
    componentId: "",
    bottom: "254rpx",
    right: "30rpx",
    inputWidth: "490rpx",
    color: "#aaaaaa",
    backgroundColor: "#E6EBEE",
    isRadius: true,
    marginLeft: "43rpx"
  };
  methods = {
    openModel: () => {
      this.isOpen = true;
    },
    closemodel: () => {
      this.isOpen = false;
      this.name = "";
      this.phone = "";
      this.wxphone = "";
    },
    push: () => {
      this.getData();
    },
    getName: e => {
      this.name = e.detail.value;
    },
    getPhone: e => {
      this.phone = e.detail.value;
    },
    getwxPhone: e => {
      this.wxphone = e.detail.value;
    },
    call: () => {
      wx.makePhoneCall({
        phoneNumber: this.$parent.$parent.globalData.company[0].mobilephone[0]
      });
    }
  };
  async getData() {
    var textName = new RegExp("^.{1,}$", "g");
    var textPhone = new RegExp("^[0-9]{11}$", "g");
    var textWechat = new RegExp("^[0-9]{5,11}$", "g");
    if (!textName.test(this.name)) {
      showFailToast("姓名不能为空");
      return;
    }
    if (!textPhone.test(Number(this.phone))) {
      showFailToast("电话号码不正确");
      return;
    }
    if (!textWechat.test(Number(this.wxphone))) {
      showFailToast("微信号不正确");
      return;
    }
    var data = {
      name: this.name,
      mobilephone: this.phone,
      wechat: this.wxphone
    };
    let res = await shttp.post(`/contexts/${CONTEXT}/visitors?componentId=${this.componentId}`).send(data).end();
    if (res.status == "success") {
      this.isOpen = false;
      this.name = "";
      this.phone = "";
      this.wxphone = "";
      showSuccessToast("预约成功！");
    } else {
      showFailToast("预约失败！");
    }
    this.$apply();
  }
  async init() {
    this.componentId = this.floatTableOption.componentId;
    if (this.floatTableOption.bottom) {
      this.bottom = parseInt(this.floatTableOption.bottom) + "rpx";
    }
    this.url = this.floatTableOption.image;
    if (this.floatTableOption.right) {
      this.right = parseInt(this.floatTableOption.right) + "rpx";
    }
    if (this.floatTableOption.color) {
      this.color = this.floatTableOption.color;
    }
    this.isRadius = this.floatTableOption.isRadius;
    if (this.floatTableOption.backgroundColor) {
      this.backgroundColor = this.floatTableOption.backgroundColor;
    }
    if (this.floatTableOption.inputWidth) {
      this.inputWidth = parseInt(this.floatTableOption.inputWidth) + "rpx";
    }
    this.marginLeft = (576 - parseInt(this.inputWidth)) / 2 + "rpx";
    this.$apply();
  }
  async onLoad() {
    this.init();
  }
}
</script>