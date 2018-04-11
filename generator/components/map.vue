<style lang="sass" scoped>
.map-container
  width: 100%
  height: 30vh
</style>
<template>
  <view class="map-container" style="width:{{mapOption.width}}; height:{{mapOption.height}}">
    <map id="map" longitude="{{mapOption.longitude}}" latitude="{{mapOption.latitude}}" 
    scale="14" 
    markers="{{mapOption.markers}}" 
    style="width:100%; height:100%;">
    </map>
  </view>  
</template>
<script>
import wepy from "wepy";
export default class Map extends wepy.component {
  props = {
    mapOption: Object
  };
  data = {
    /** 
    mapOption:{
      latitude: 23.099994,  //中心经度(Number)
      longitude: 113.32452, //中心纬度(Number)
      width: "50%",         //不填写默认100%
      height: "150px",      //不填写默认 30vh
    markers: [
      {
        iconPath: "/resources/others.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.32452,
        width: 50,
        height: 50
      }
    ],
    }
    */
  };
  methods = {};
}
</script>