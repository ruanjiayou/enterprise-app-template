<!--图文遮罩组件-->
<style lang="sass" scoped>
$lineHeight: 60rpx;

.company-container
  position: relative
  margin-bottom: 20rpx
  background: #555
  color: white
  font-size: 24rpx
  font-weight: 200
  padding: 50rpx

.company-header
  display: flex
  justify-content: space-between
  align-items: center

.company-logo
  width: 225rpx
  height: 77rpx

.company-item
  position: relative
  min-height: 121rpx
  border-bottom: 1rpx solid #313131
  &:last-of-type
    border-bottom: unset

.company-label
  line-height: $lineHeight

.company-value
  line-height: $lineHeight

.company-icon
  position: absolute
  bottom: 20rpx
  right: 0
  width: 35rpx
  height: 35rpx

.company-title
  line-height: $lineHeight

.company-wechat
  line-height: $lineHeight

.company-qrcode
  position: absolute
  top: 20rpx
  right: 0
  width: 116rpx
  height: 116rpx

</style>
<template>
  <view class="company-container" style="{{companyStyle}}">
    <view class="company-header">
      <image class="company-logo" src="{{company.logoUrl}}" mode="aspectFill"></image>
      <view class="company-name">{{company.name}}</view>
    </view>
    <block wx:for="{{infoList}}" wx:key="unique" data-index='{{item}}'>
      <view class="company-item" wx:if="{{item.normal}}" catchtap="click" data-type="{{item.type}}">
        <view class="company-label">{{item.label}}</view>
        <view class="company-value">{{item.value}}</view>
        <image class="company-icon" src="{{item.icon}}" mode="aspectFit"></image>
      </view>
      <view class="company-item" wx:if="{{item.type==='weibo'}}" catchtap="copy('{{item.value}}')" data-type="{{item.type}}">
        <view class="company-label">{{item.label}}</view>
        <view class="company-value">{{item.value}}</view>
        <image class="company-icon" src="{{item.icon}}" mode="aspectFit"></image>
      </view>
      <view class="company-item" wx:if="{{item.type==='boss'}}" catchtap="copy('{{company.bossWechat}}')">
        <view class="company-title">{{company.bossTitle}}-{{company.bossName}}</view>
        <view class="company-wechat">微信号 {{company.bossWechat}}</view>
        <image class="company-qrcode" src="{{company.bossQrcode}}" mode="aspectFit" catchtap="previewImg"></image>
      </view>
    </block>
  </view>
</template>
<script>
/**
  @param keywords<string[]> 需要展示的类目
    @argument mobilephone 手机 
    @argument address 公司地址
    @argument boss 老板信息
  @param style<object> css样式
    @argument background
    @argument color
    @argument fontSize
  @example
    "data": {
      "keywords": [
        "mobilephone",
        "address",
        "boss"
      ],
      "style": {
        "background": "#1b1b1b",
        "color": "white",
        "fontSize": "24rpx"
      }
    }
 */
import wepy from "wepy";
import { shttp } from "../utils/http";
import {
  ICON_PHONE,
  ICON_LOCATION,
  ICON_WEIBO
} from "../constant/iconConstant";
import { showSuccessToast } from "../utils/tools";
import { CONTEXT } from "../constant/configConstant";

export default class Company extends wepy.component {
  props = {
    companyOption: Object
  };
  data = {
    company: "",
    infoList: [],
    companyStyle: ""
  };

  methods = {
    click: e => {
      const type = e.currentTarget.dataset.type;
      switch (type) {
        case "mobilephone":
          wx.makePhoneCall({
            phoneNumber: this.company.mobilephone[0]
          });
          break;
        case "phone":
          wx.makePhoneCall({
            phoneNumber: this.company.phone[0]
          });
          break;
        case "address":
          if (this.company.latitude && this.company.longitude) {
            wx.openLocation({
              latitude: this.company.latitude,
              longitude: this.company.longitude,
              name: this.company.name,
              address: this.company.address
            });
          }
          break;
        default:
          break;
      }
    },
    copy: value => {
      wx.setClipboardData({
        data: value,
        success: res => {
          showSuccessToast("复制成功");
        },
        fail: err => {
          console.error(err);
        }
      });
    },
    previewImg: e => {
      wepy.previewImage({
        current: this.company.bossQrcode,
        urls: [this.company.bossQrcode],
        success: res => {},
        fail: err => {
          console.error(err);
        }
      });
    }
  };

  async onLoad() {
    try {
      this.init();
      await this.getCompany();
      await this.getData();
      this.$apply();
    } catch (err) {
      return console.error(err);
    }
  }
  init() {
    this.keywords = this.companyOption.keywords;
    const style = this.companyOption.style;
    this.companyStyle =
      `background:${style.background};` +
      `color:${style.color};` +
      `font-size:${style.fontSize};`;
  }

  async getData() {
    const companyRes = await shttp.get(`/contexts/${CONTEXT}/company`).end();
    this.company = companyRes.result;
    const infoList = [];
    this.keywords.forEach(item => {
      switch (item) {
        case "mobilephone":
          infoList.push({
            type: item,
            label: "联系电话：",
            normal: true,
            value: this.company.mobilephone[0],
            icon: ICON_PHONE
          });
          break;
        case "address":
          infoList.push({
            type: item,
            label: "所在地址：",
            normal: true,
            value: this.company.address,
            icon: ICON_LOCATION
          });
          break;
        case "weibo":
          infoList.push({
            type: item,
            label: "微博：",
            normal: false,
            value: this.company.weibo,
            icon: ICON_WEIBO
          });
          break;
        case "boss":
          infoList.push({
            type: item
          });
          break;
        default:
          console.error(`Error: company组件发现位置的展示类型:${item}`);
          break;
      }
    });
    this.infoList = infoList;
  }

  async getCompany() {
    const res = await shttp.get("/company").end();
    this.company = res.result;
  }
}
</script>
