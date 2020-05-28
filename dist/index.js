import { MSG_TYPE_SET_INIT_DATA } from '@x-tech/fe-puma-lib/lib/consts';
import { misc } from '@x-tech/fe-puma-lib/lib/helper';

function handlePumaInitDataMsg(e = {}, onSuccess = () => {}) {
  if (!misc.isInXinchaoDomain(e.origin)) {
    return false;
  }

  const {
    type,
    payload
  } = e.data;

  if (type !== MSG_TYPE_SET_INIT_DATA) {
    return false;
  }

  onSuccess(payload);
}

var helper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  handlePumaInitDataMsg: handlePumaInitDataMsg
});

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
}

var mixin = {
  created() {
    window.addEventListener("message", this.$_handlePumaInitDataMsg);
  },

  destroyed() {
    window.removeEventListener("message", this.$_handlePumaInitDataMsg);
  },

  methods: {
    $_handlePumaInitDataMsg(e) {
      handlePumaInitDataMsg(e, (data = {}) => {
        if (isFunction(this.$_loginSuccessByPuma)) {
          this.$_loginSuccessByPuma(data);
        } else {
          console.warn("请设置 $_loginSuccessByPuma 回调");
        }
      });
    }

  }
};

var index = {
  mixin,
  helper
};

export default index;
//# sourceMappingURL=index.js.map
