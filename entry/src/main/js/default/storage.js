import storage from "@system.storage";

console.info("storage.js onImport");

const _this = {
  get: (param = {}) => {
    console.info("storage.get: key=" + param.key);
    storage.get({
      key: param.key,
      default: param.default,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: value => {
        console.info("success: " + value);
        param.success && param.success(value);
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  set: (param = {}) => {
    console.info("storage.set: key=" + param.key);
    storage.set({
      key: param.key,
      value: param.value,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: () => {
        console.info("success");
        param.success && param.success();
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  clear: (param = {}) => {
    console.info("storage.clear: key=" + param.key);
    storage.clear({
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: () => {
        console.info("success");
        param.success && param.success();
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  delete: (param = {}) => {
    console.info("storage.delete: key=" + param.key);
    storage.delete({
      key: param.key,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: () => {
        console.info("success");
        param.success && param.success();
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
}

export default _this;