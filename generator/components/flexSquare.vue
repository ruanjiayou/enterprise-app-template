<style lang="sass" scoped>
.header
  padding: 20rpx 10rpx
  .line
    border-top: 1rpx solid #666
    height: 0
.title
  display: inline-block
  background-color: white
  .h1
    font-size: 34rpx
  .h2
    font-size: 24rpx
</style>

<template>
  <view class="title">
    <view class="h1">{{ title }}</view>
    <view class="h2">{{ subTitle }}</view>
  </view>
  <view class="list">
    <repeat for="{{ data }}" item="image">
      <view>
        <view>
          <image src="{{ image.src }}"></image>
          <text wx:if="{{ position !== 'outer' }}">{{ data.title }}</text>
        </view>
        <text wx:if="{{ position === 'outer' }}">{{ data.title }}</text>
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
    flexSquareOpt: Object
  };
  data = {
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
  };
  methods = {};

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
    for (let k in flexSquareOpt) {
      if (attrs.indexOf(k) !== -1) {
        this[k] = flexSquareOpt[k];
      }
    }
    this.$apply();
  }
}
</script>