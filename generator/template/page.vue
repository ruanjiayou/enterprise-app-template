<style lang="sass">
@import "../styles/common.sass"
page
  height: 100%
{{{ pageStyle }}}
</style>
<template>
  <view class="container">
    {{{ html }}}
  </view>
</template>

<script>
import wepy from "wepy";
import seed from '../seed';
{{{ import }}}

const pageInSeed = {{{ pageInSeed }}};
let pageData = {};
if (pageInSeed.components.length !== 0) {
  pageInSeed.components.forEach(component => {
    const dom = component.id ? `${component.type}ID${component.id}` : component.type;
    pageData[dom] = component.data || {};
    if (component.id) {
      pageData[dom].componentId = component.id;
    }
  });
}
if (pageInSeed.navigation) {
  pageData.navigation = seed.app.navigation;
}

export default class Index extends wepy.page {
  data = Object.assign({}, pageData);

  components = {
    {{{ components }}}
  };
  onLoad(){ }
  {{#if page.share }}
  onShareAppMessage() {
    return {
      title: '{{{ page.title }}}',
      desc: '{{{ page.description }}}',
      path: '{{{ page.path }}}'
    }
  }
  {{else}}
  onShareAppMessage() {
    return {
      title: '{{{ basic.title }}}',
      desc: '{{{ basic.description }}}',
      path: '{{{ basic.home }}}'
    }
  }
  {{/if}}
}
</script>
