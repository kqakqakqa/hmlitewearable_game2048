import file from "@system.file";

console.info("file.js onImport");

const _this = {
  move: (param = {}) => {
    console.info("file.move: srcUri=" + param.srcUri + ", dstUri=" + param.dstUri);
    file.move({
      srcUri: param.srcUri,
      dstUri: param.dstUri,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: uri => {
        console.info("success: " + uri);
        param.success && param.success(uri);
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  copy: (param = {}) => {
    console.info("file.copy: srcUri=" + param.srcUri + ", dstUri=" + param.dstUri);
    file.copy({
      srcUri: param.srcUri,
      dstUri: param.dstUri,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: uri => {
        console.info("success: " + uri);
        param.success && param.success(uri);
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  list: (param = {}) => {
    console.info("file.list: uri=" + param.uri);
    file.list({
      uri: param.uri,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: data => {
        console.info("success: len=" + data.fileList.length);
        param.success && param.success(data);
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  get: (param = {}) => {
    console.info("file.get: uri=" + param.uri);
    file.get({
      uri: param.uri,
      recursive: param.recursive,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: data => {
        console.info("success: uri=" + data.uri);
        param.success && param.success(data);
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  delete: (param = {}) => {
    console.info("file.delete: uri=" + param.uri);
    file.delete({
      uri: param.uri,
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
  writeText: (param = {}) => {
    console.info("file.writeText: uri=" + param.uri);
    file.writeText({
      uri: param.uri,
      text: param.text,
      encoding: param.encoding,
      append: param.append,
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
  writeArrayBuffer: (param = {}) => {
    console.info("file.writeArrayBuffer: uri=" + param.uri);
    file.writeArrayBuffer({
      uri: param.uri,
      buffer: param.buffer,
      position: param.position,
      append: param.append,
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
  readText: (param = {}) => {
    console.info("file.readText: uri=" + param.uri);
    file.readText({
      uri: param.uri,
      encoding: param.encoding,
      position: param.position,
      length: param.length,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: data => {
        console.info("success: len=" + data.text.length);
        param.success && param.success(data);
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  readArrayBuffer: (param = {}) => {
    console.info("file.readArrayBuffer: uri=" + param.uri);
    file.readArrayBuffer({
      uri: param.uri,
      position: param.position,
      length: param.length,
      fail: (data, code) => {
        console.error("fail: code=" + code + ", data=" + data);
        param.fail && param.fail(data, code);
      },
      success: data => {
        console.info("success: len=" + data.buffer.length);
        param.success && param.success(data);
      },
      complete: () => {
        console.info("complete");
        param.complete && param.complete();
      },
    });
  },
  access: (param = {}) => {
    console.info("file.access: uri=" + param.uri);
    file.access({
      uri: param.uri,
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
  mkdir: (param = {}) => {
    console.info("file.mkdir: uri=" + param.uri);
    file.mkdir({
      uri: param.uri,
      recursive: param.recursive,
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
  rmdir: (param = {}) => {
    console.info("file.rmdir: uri=" + param.uri);
    file.rmdir({
      uri: param.uri,
      recursive: param.recursive,
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