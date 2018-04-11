<!--form表单组件-->
<style lang="sass" scoped>
@import "../styles/common.sass"

.form-container
  font-size: 32rpx

.form-item
  padding: 24rpx 30rpx
  background: #fff
  display: flex
  align-items: center
  font-size: 32rpx
  border: 1px solid transparent

.form-item_white
  @extend .form-item
  color: #888

.form-item_black
  @extend .form-item
  background: #4F514F
  border: transparent
  color: #80807f

.form-label
  display: block
  line-height: 36rpx
  white-space: nowrap

.form-input
  line-height: 36rpx
  width: 590rpx

.form-containerCheckbox 
  font-size: 34rpx
  background: #fff

.form-checkboxName
  font-size: 28rpx
  height: 88rpx
  display: flex
  align-items: center
  background: #eaeaea
  padding-left: 30rpx

.form-checkbox
  height: 88rpx
  display: flex
  align-items: center
  margin-left: 30rpx

.form-radioBox
  height: 88rpx
  display: flex
  align-items: center
  justify-content: space-between 
  margin-left: 30rpx
  padding-right: 30rpx 

.form-button
  margin: 0 auto
  width: 100%
  height: 100%
  line-height: 150%
  background: transparent
  border: 0
  &::after
    content: none

.form-submit
  @extend .form-button

.form-contact
  @extend .form-button

.form-reset
  @extend .form-button

textarea .form-input
  position: relative
  top: -20rpx
  margin-left: 45rpx
  height: 120rpx
  padding: 0
.submit-box
  position: relative
.submit-reset
  position: absolute
  width: 100%
  height: 100%
  top: 0
</style>
<template>
  <form bindsubmit="formSubmit" bindreset="formReset">
    <view class="form-container" style="{{formStyle}}">

      <block wx:for="{{formOption.formConfig}}" wx:key="unique" data-index='{{item}}'>
        <view class="{{formItemTheme}}" wx:if="{{item.type==='input'}}" style="{{itemStyle}}">
          <view class="form-label" wx:if="{{item.label}}">{{item.label}}：</view>
          <input class="form-input" value="{{name}}" type="{{item.inputType}}" maxlength="{{item.maxlength}}" name="{{item.field}}" placeholder="{{item.placeholder}}" placeholder-style="color:{{placeholderColor}}" disabled="{{item.disabled}}" />
        </view>
        <!-- 多选 -->
        <view class="form-containerCheckbox" wx:if="{{item.type==='checkbox'}}" style="margin-bottom:{{formOption.formStyle.marginBottom}}">
          <view class="form-checkboxName">{{item.label}}：</view>
          <checkbox-group name="{{item.checkboxType}}">
            <label wx:for="{{item.checkboxData}}">
              <view class="form-checkbox">
                <checkbox color="#0db0ff" value="{{item}}" />{{item}}
              </view>
            </label>
          </checkbox-group>
        </view>
        <!-- 单选 -->
        <view class="form-containerCheckbox" wx:if="{{item.type === 'radio'}}" style="{{itemStyle}}">
          <view class="form-checkboxName">{{item.label}}：</view>
          <radio-group name="{{item.radioType}}">
            <label wx:for="{{item.radioData}}">
              <view class="form-radioBox">
                {{item}}
                <radio color="#0DB0FF" value="{{item}}"/>
              </view>
            </label>
          </radio-group>
        </view>
        <view class="form-item" wx:if="{{item.type==='datePicker'}}" style="{{itemStyle}}">
          <view class="section_title">{{item.label}}：</view>
          <picker mode="date" name="{{item.datePickerType}}" value="{{item.datePickerVal}}" start="1970-01-01" end="2050-01-01" bindchange="bindDateChange" data-index="{{item}}">
            <view class="picker" style="color:{{item.datePickerVal != ''?'#333':'#bfbfbf'}};">
              {{item.datePickerVal||'请选择'}}
            </view>
          </picker>
        </view>
        <view class="form-item" wx:if="{{item.type==='regionPicker'}}" style="{{itemStyle}}">
          <view class="section_title">{{item.label}}：</view>
          <picker mode="region" name="{{item.regionPickerType}}" bindchange="bindRegionChange" value="{{item.region}}" custom-item="{{customItem}}" data-index="{{item}}">
            <view class="picker">
              {{item.region[0]}}，{{item.region[1]}}，{{item.region[2]}}
            </view>
          </picker>
        </view>
        <view class="form-item" wx:if="{{item.type==='submit'}}" style="{{itemStyle+submitStyle}}">
          <button class="form-submit" formType="submit" style="{{submitStyle}}">{{item.label}}</button>
        </view>
        <view class="form-item" wx:if="{{item.type==='contact'}}" style="{{itemStyle+contactStyle}}">
          <button class="form-contact" open-type="contact" style="{{contactStyle}}">{{item.label}}</button>
        </view>
        <view class="form-item" wx:if="{{item.type==='reset'}}" style="{{itemStyle+resetStyle}}">
          <button class="form-reset" formType="reset" style="{{resetStyle}}">{{item.label}}</button>
        </view>

      </block>
      <view>
      </view>
    </view>
  </form>
</template>
<script>
/**
  @param formStyle  表单样式
    @param form  表单总体样式(css)
    @param item  单条输入栏样式(css)
      @param theme<string> 主题: "white"(默认), "black"
      @param isRadius<boolean> 是否为圆角
  @param formConfig  表单配置
    @param type<string>  单条输入栏类型
    @param inputType<string>  input输入栏类型的子类型(默认为text)
      @argument text  文本输入键盘(默认)
      @argument number  数字输入键盘
      @argument digit  带小数点的数字键盘
      @argument idcard  身份证输入键盘, 会验证身份证
      @argument phone  数字键盘，会验证手机号
      @argument email  文本键盘，会验证email
    @param maxlength<number>  最大输入长度，默认为 140 设置为 -1 的时候不限制最大长度
    @param label<string>  组件页面显示名，若不配置，则不显示
    @param field<string>  表单post数据名，名称不能重复
    @param placeholder<string>  输入框为空时占位符
    @param disabled<boolean>  是否禁止输入,不填写默认为false
    @param require<boolean>  是否是必填项目, 若为空时, 给出提示
  @example
  formStyle: {
    form: {
      background: "#888",
      placeholderColor: "#80807f"
    },
    item: {
      "theme": "black"
      "background": "#4F514F",
      "height": "60rpx",
      "fontSize": "34rpx",
      "color": "#80807f",
      "marginBottom": "20rpx",
      "borderRadius": "20rpx"
    }
  },
  formConfig: [{
    type: "input",
    inputType: "text",
    label: "姓名",
    field: "name",
    placeholder: "请填写",
    require: true
  }, {
    type: "input",
    inputType: "phone"
    label: "电话",
    field: "phone",
    require: true
  }]
  */
//     /**
//      * checkbox多项选择器组件+数据格式
//      */
//     {
//       type: "checkbox",
//       checkboxType: "like",
//       checkboxShow: true,
//       checkboxData: ["篮球", "足球", "羽毛球"]
//     },
//     {
//       type: "checkbox",
//       checkboxType: "like2",
//       checkboxShow: true,
//       checkboxData: ["篮球2", "足球2", "羽毛球2"]
//     },
//     /**
//      * radio单项选择器组件+数据格式
//      */
//     {
//       type: "radio",
//       radioType: "sex",
//       radioShow: true,
//       radioData: ["男", "女"]
//     },
//     /**
//      * datePicker滚动日期选择器组件+数据格式
//      * 从底部弹起的滚动选择器
//      */
//     {
//       type: "datePicker",
//       datePickerType: "date1",
//       label: "开始日期",
//       datePickerShow: true,
//       datePickerVal: ""
//     },
//     {
//       type: "datePicker",
//       datePickerType: "date2",
//       label: "结束日期",
//       datePickerShow: true,
//       datePickerVal: ""
//     },
//     /**
//      * regionPicker省份选择器组件+数据格式
//      */
//     {
//       type: "regionPicker",
//       regionPickerType: "region",
//       label: "地址",
//       regionPickerShow: true,
//       region: ["北京市", "北京市", "东城区"]
//     }
//   ]
// }

import wepy from "wepy";
import {
  showFailToast,
  showSuccessToast,
  onceClick,
  showloading
} from "../utils/tools";
import { TEL_REG, EMAIL_REG, IDCARD_REG } from "../constant/regExpConstant";
import { shttp } from "../utils/http";
import { CONTEXT } from "../constant/configConstant";
export default class Form extends wepy.component {
  props = {
    formOption: Object
  };
  data = {
    itemStyle: "",
    formStyle: "",
    placeholderColor: "",
    formItemTheme: "",
    submitStyle: "",
    contactStyle: "",
    resetStyle: "",
    name: null,
    componentId: ""
  };
  methods = {
    bindDateChange: e => {
      for (var i = 0; i < this.formOption.formConfig.length; i++) {
        if (this.formOption.formConfig[i].type == "datePicker") {
          if (
            this.formOption.formConfig[i].datePickerType ==
            e.currentTarget.dataset.index.datePickerType
          ) {
            this.formOption.formConfig[i].datePickerVal = e.detail.value;
            break;
          }
        }
      }
    },
    bindRegionChange: e => {
      for (var i = 0; i < this.formOption.formConfig.length; i++) {
        if (this.formOption.formConfig[i].type == "regionPicker") {
          if (
            this.formOption.formConfig[i].regionPickerType ==
            e.currentTarget.dataset.index.regionPickerType
          ) {
            this.formOption.formConfig[i].region = e.detail.value;
            break;
          }
        }
      }
    },
    /**
     * 表单验证+数据提交
     */
    formSubmit: e => {
      onceClick(this, "submitRegisterClick", async () => {
        let data = e.detail.value;
        this.formOption.formConfig.forEach(item => {
          if (item.require) {
            showFailToast(`请输入${item.label || item.placeholder}`);
            return false;
          }
          if (item.type === "input") {
            if (data.phone && !TEL_REG.test(data.phone)) {
              showFailToast("无效的联系电话");
              return false;
            }

            if (data.email && !EMAIL_REG.test(data.email)) {
              showFailToast("无效的邮箱");
              return false;
            }
            if (data.idcard && !IDCARD_REG.test(data.idcard)) {
              showFailToast("无效的身份证号");
              return false;
            }
          }
        });
        var textphone = new RegExp("^[0-9]{11}$", "g");
        if (textphone.test(e.detail.value.phone)) {
          let res = await shttp.post(`/contexts/${CONTEXT}/visitors?componentId=${this.componentId}`).send(e.detail.value).end();
          if (res.status == "success") {
            showSuccessToast("预约成功！");
          } else {
            showFailToast("预约失败！");
          }
          this.name = "";
          this.$apply();
          this.name = null;
        } else {
          console.log("fail");
        }
      });
    }
  };

  onLoad() {
    this.componentId = this.formOption.componentId;
    this.initStyle();
    this.initData();
  }

  initData() {
    this.formOption.formConfig.forEach(item => {
      item.maxlength = item.maxlength || 20;
    });
  }

  initStyle() {
    const formStyle = this.formOption.formStyle;

    /** 总样式 */
    this.placeholderColor = formStyle.form.placeholderColor || "#bfbfbf";
    const formBackground = formStyle.form.background || "#fff";
    const formPadding = formStyle.form.padding || "30rpx";
    this.formStyle = `background:${formBackground};` + `padding:${formPadding}`;

    /** 单条输入框样式 */
    this.formItemTheme = `form-item_${formStyle.item.theme || "white"}`;
    const itemHeight = formStyle.item.height || "60rpx";
    const itemFontSize = formStyle.item.fontSize || "34rpx";
    const itemMarginBottom = formStyle.item.marginBottom || "20rpx";
    const itemBorderRadius = formStyle.item.isRadius ? "20rpx" : "0";
    this.itemStyle =
      `height:${itemHeight};` +
      `font-size:${itemFontSize};` +
      `margin-bottom:${itemMarginBottom};` +
      `border-radius:${itemBorderRadius};`;

    /** 提交样式 */
    if (formStyle.submit) {
      const submitBackground = formStyle.submit.background || "red";
      const submitColor = formStyle.submit.color || "white";
      const submitBorderColor = formStyle.submit.borderColor || "red";
      this.submitStyle =
        `background:${submitBackground};` +
        `color:${submitColor};` +
        `border-color:${submitBorderColor};`;
    }

    /** 客服样式 */
    if (formStyle.contact) {
      const contactBackground = formStyle.contact.background || "red";
      const contactColor = formStyle.contact.color || "white";
      const contactBorderColor = formStyle.contact.borderColor || "red";
      this.contactStyle =
        `background:${contactBackground};` +
        `color:${contactColor};` +
        `border-color:${contactBorderColor};`;
    }

    /** 重置样式 */
    if (formStyle.reset) {
      const resetBackground = formStyle.reset.background || "red";
      const resetColor = formStyle.reset.color || "white";
      const resetBorderColor = formStyle.reset.borderColor || "red";
      this.resetStyle =
        `background:${resetBackground};` +
        `color:${resetColor};` +
        `border-color:${resetBorderColor};`;
    }

    this.$apply();
  }
}
</script>