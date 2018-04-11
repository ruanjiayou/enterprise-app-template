<!--轮播组件-->
<style lang="sass" scoped>
.carousel-container
  position: relative
  margin-top: 150rpx

.carousel-swiper
  height: 30vh

.carousel-img
  width: 100%
  height: 100%

.carousel-item
  position: relative

.carousel-video
  position: absolute
  width: 90vw
  top: 50%
  transform: translateX(-50%) translateY(-50%)
  left: 50%

.carousel-prev
  position: absolute 
  left: 0
  top: 50%
  transform: translate(0,-50%)
  width: 30rpx
  height: 60rpx

.carousel-next
  position: absolute 
  right: 0
  top: 50%
  transform: translate(0,-50%)
  width: 30rpx
  height: 60rpx
  line-height: 60rpx

</style>
<template>
  <view class="carousel-container">
    <swiper class="carousel-swiper"
      style="height:{{carouselOption.carouselHeight}}"
      indicator-dots='{{carouselOption.carouselDots}}'
      autoplay="{{carouselOption.carouselAutoplay}}"
      interval="{{carouselOption.carouselInterval}}"
      duration="{{carouselOption.carouselDuration}}"
      circular="{{carouselOption.carouselCircular}}"
      current="{{carouselCurrent}}"
      vertical="{{carouselOption.carouselVertical}}"
      indicator-active-color="{{carouselOption.carouselActiveDotColor}}"
      skip-hidden-item-layout="{{}}"
      bindchange="swiperchange">
      <block wx:for="{{carouselImg}}"
        wx:key="unique">
        <swiper-item class="carousel-item">
          <!-- <video muted src="{{item.video}}" poster="{{item.poster}}" id="carouselVideo" class="carousel-video" wx:if="{{item.video}}" autoplay="{{carouselOption.videoAutoplay}}" bindended="playEnd" bindplay="playStart"></video> -->
          <image src="{{item.image}}"
            class="carousel-img"
            catchtap="swipclick"
            mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <view wx:if="{{carouselOption.carouselArrows}}"
      class="carousel-prev"
      bindtap="prevImg">〈</view>
    <view wx:if="{{carouselOption.carouselArrows}}"
      class="carousel-next"
      bindtap="nextImg">〉</view>
  </view>
</template>
<script>
/** 
  @param carouselDots<Boolean>  是否显示面板指示点 默认true
  @param carouselArrows<Boolean>  是否显示箭头 默认false
  @param carouselAutoplay<Boolean>  是否自动切换 默认true
  @param carouselCircular<Boolean>  是否采用衔接滑动 默认true
  @param carouselVertical<Boolean>  滑动方向是否为纵向 默认true
  @param carouselInterval<Number>  自动切换时间间隔 ms 默认2000
  @param carouselDuration<Number>  滑动动画时长 ms 默认800
  @param carouselHeight<String>  轮播组件高度，需要带单位，可以为px>rpx>vh等css单位
  @param carouselActiveDotColor<String>  当前选中的指示点颜色 
*/
import wepy from "wepy";
import { shttp } from "../utils/http";
import { autoNavigate } from "../utils/wx-async";
import { CONTEXT } from "../constant/configConstant";

export default class Carousel extends wepy.component {
  props = {
    carouselOption: Object
  };
  data = {
    carouselCurrent: 0, //图片index 默认0
    carouselImg: [],
    videoContext: {}
  };

  methods = {
    playEnd: () => {
      this.afterPlay();
    },

    playStart: e => {
      this.carouselOption.carouselAutoplay = false;
    },

    // 轮播图的切换事件
    swiperchange: e => {
      this.carouselCurrent = e.detail.current;
      this.videoContext.pause();
      this.afterPlay();
    },
    // 点击图片触发事件
    swipclick: e => {
      autoNavigate(
        this.$parent.$parent,
        this.carouselImg[this.carouselCurrent].url
      );
    },
    //左箭头，上一个
    prevImg: () => {
      this.carouselCurrent =
        this.carouselCurrent > 0
          ? this.carouselCurrent - 1
          : this.carouselOption.carouselImg.length - 1;
    },
    //右箭头，下一个
    nextImg: () => {
      this.carouselCurrent =
        this.carouselCurrent < this.carouselImg.length - 1
          ? this.carouselCurrent + 1
          : 0;
    }
  };
  async onLoad() {
    await this.getCarouselData();
    this.defaultData();
    this.initVideo();
  }
  defaultData() {
    let carouselDots = this.carouselOption.carouselDots;
    let carouselAutoplay = this.carouselOption.carouselAutoplay;
    // let carouselArrows = this.carouselOption.carouselArrows;
    let carouselCircular = this.carouselOption.carouselCircular;
    let carouselInterval = this.carouselOption.carouselInterval;
    let carouselDuration = this.carouselOption.carouselDuration;
    let carouselActiveDotColor = this.carouselOption.carouselActiveDotColor;
    if (!Boolean(carouselDots) && carouselDots != false) {
      this.carouselOption.carouselDots = true;
    }
    if (!Boolean(carouselAutoplay) && carouselAutoplay != false) {
      this.carouselOption.carouselAutoplay = true;
    }
    // if (!Boolean(carouselArrows) && carouselAutoplay != false) {
    //   this.carouselOption.carouselArrows = true;
    // }
    if (!Boolean(carouselCircular) && carouselCircular != false) {
      this.carouselOption.carouselCircular = true;
    }
    if (!Boolean(carouselInterval)) {
      this.carouselOption.carouselInterval = 2000;
    }
    if (!Boolean(carouselDuration)) {
      this.carouselOption.carouselDuration = 800;
    }
    if (!Boolean(carouselActiveDotColor)) {
      this.carouselOption.carouselActiveDotColor = "rgba(73,178,245, .8)";
    }
  }

  initVideo() {
    this.videoContext = wx.createVideoContext("carouselVideo");
  }
  async getCarouselData() {
    let res = await shttp.get(`/contexts/${CONTEXT}/carousels?componentId=${this.carouselOption.componentId}`).end();
    if (res.result.length == 0) {
      return;
    }
    this.carouselImg = res.result[0].data;
    this.$apply();
  }
  afterPlay() {
    this.carouselOption.carouselAutoplay = true;
    this.carouselOption.videoAutoplay = false;
  }
}
</script>
