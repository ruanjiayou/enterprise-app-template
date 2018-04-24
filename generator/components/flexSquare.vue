<style lang="sass" scoped>
.header-lean
  border-left: 12rpx solid #3478ff
  padding-left: 20rpx
  font-size: 30rpx
  margin: 30rpx
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
    color: #3478ff
.list
  margin: 0 40rpx
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  &>view
    flex: 0 0 45%
    margin: 1%
.square
  border: 1rpx solid #666
  padding-top: 100%
  position: relative
  overflow: hidden
  image
    width: 100%
    transform: translate(-50%,-50%)
    position: absolute
    left: 50%
    top: 50%
.center
  position: absolute
  left: 50%
  top: 50%
  color: white
  transform: translate(-50%,-50%)
  border-top: 10rpx solid #3478ff
  font-size: 30rpx;
  white-space: nowrap;
.outer
  font-size: 28rpx
  margin: 16rpx
  line-height: 1.2
  display: box
  display: -webkit-box
  line-clamp: 2
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  text-overflow: ellipsis
  overflow: hidden

</style>

<template>
  <!-- 
    需求:
    1.文字的位置: center/outer
    2.每行的列数: 2/3
    3.文字的行数: <2
    4.宽高的比例: 数字
    5.直角圆角或圆形
   -->
  <view wx:if="{{ flexSquareOption.titlePos === 'center' }}" class="header">
    <view class="line"></view>
    <view class="title">
      <view class="h1">{{ flexSquareOption.title }}</view>
      <view class="h2" style="color: {{ themeColor }};">{{ flexSquareOption.subTitle }}</view>
    </view>
  </view>
  <view wx:if="{{ flexSquareOption.titlePos === 'left' }}" class="header-lean">{{ flexSquareOption.title }}</view>
  <view class="list">
    <repeat for="{{ flexSquareOption.data }}" item="image">
      <view style="flex: 0 0 {{ 90/flexSquareOption.column }}%;">
        <view class="square" style="padding-top: {{ 100 /(flexSquareOption.WHratio || 1) }}%;{{ flexSquareOption.type === 'circle' ? 'border-radius:50%;' : '' }}{{ flexSquareOption.type === 'radius' ? 'border-radius: 20rpx;' : '' }}">
          <image src="{{ image.src }}"></image>
          <text wx:if="{{ flexSquareOption.position !== 'outer' }}" class="{{ flexSquareOption.position }}">{{ image.title }}</text>
        </view>
        <view class="outer" wx:if="{{ flexSquareOption.position === 'outer' }}">{{ image.title }}</view>
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
      titlePos: 'center',
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
      'titlePos',
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