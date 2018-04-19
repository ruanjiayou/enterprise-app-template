<style lang="sass" scoped>
.header
  padding: 20rpx 10rpx
  text-align: center
  .line
    border-top: 1rpx solid #666
    height: 0
.title
  display: inline-block
  background-color: white
  margin-top: -25rpx
  padding: 0 20rpx 20rpx
  .h1
    font-size: 34rpx
  .h2
    font-size: 24rpx
    margin-top: 10rpx

.list
  margin: 10rpx
  display: flex
  flex-wrap: wrap
  &>view
    border: 1rpx solid #666
    flex: 1 0 300rpx
    margin: 10rpx
    padding-top: 50%
    position: relative
    overflow: hidden
    view
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    image
      width: 100%
      transform: translate(0,-50%)
      margin-top: 50%   
</style>

<template>
  <view class="header">
    <view class="line"></view>
    <view class="title">
      <view class="h1">{{ flexSquareOption.title }}</view>
      <view class="h2" style="color: {{ themeColor }};">{{ flexSquareOption.subTitle }}</view>
    </view>
  </view>
  <view class="list">
    <repeat for="{{ flexSquareOption.data }}" item="image">
      <view>
        <view>
          <image src="{{ image.src }}"></image>
          <text wx:if="{{ flexSquareOption.position !== 'outer' }}">{{ data.title }}</text>
        </view>
        <text wx:if="{{ flexSquareOption.position === 'outer' }}">{{ data.title }}</text>
      </view>
    </repeat>
  </view>
</template>

<script>
import wepy from 'wepy';
import { shttp } from '../utils/http';
import { CONTEXT } from '../constant/configConstant';

export default class FlexSquare extends wepy.component {
  props = {
    flexSquareOption: Object
  };
  data = {
    defaults: {
      componentId: '',
      title: '应用场景',
      subTitle: 'Application Scene',
      themeColor: '#7856ae',
      column: 2,
      // square radius circle
      type: 'radius',
      radius: '20rpx',
      // outer center bottom
      position: 'outer',
      data: []
    }
  };
  methods = {};

  onLoad() {
    this.init();
  }
  init() {
    const attrs = [
      'componentId',
      'title',
      'subTitle',
      'themeColor',
      'column',
      'type',
      'radius',
      'position',
      'data'
    ];
    for (let i = 0; i < attrs.length; i++) {
      if (this.flexSquareOption[attrs[i]] === undefined) {
        this.flexSquareOption[attrs[i]] = this.defaults[attrs[i]];
      }
    }
  }
}
</script>