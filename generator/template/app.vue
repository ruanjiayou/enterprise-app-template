<style lang="sass">
page
  background-color: #f4f4f4
  height: 100%
  width: 100%
  font-family: arial, 'PingFang SC', 'Microsoft Yahei', 'Hiragino Sans GB'
</style>

<script>
import wepy from "wepy";
import "wepy-async-function";
import { shttp } from "./utils/http";
import { signIn } from "./utils/user-tools";

export default class extends wepy.app {
  config = {{{config}}};

  globalData = {
    userInfo: {},
    devtools: false,
    context: {{{ basic.context }}}
  };

  constructor() {
    // inject async await function
    super();
    this.use("requestfix");
    this.use("promisify");
  }

  async onLaunch() {
    // 是否以获取授权的方式登录
    const isGetUserInfo = {{ basic.autoLogin }};
    // 获取微信信息登录
    const res = await signIn(isGetUserInfo);
  }
}
</script>
