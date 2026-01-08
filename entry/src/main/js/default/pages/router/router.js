console.info("pages/router/router onInit");

export default {
  data: {
    uri: "",
    params: {},
  },
  onInit() {
    console.log(this.uri)
    $app.getImports().router.replace({
      uri: this.uri,
      params: this.params,
      direct: true,
    });
  },
}