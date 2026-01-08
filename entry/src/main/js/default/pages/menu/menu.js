console.info("pages/menu/menu onInit");

const _this = {
  data: {
    uiSizes: $app.getImports().uiSizes,
    timeBatteryStr: "",
  },
  onInit() {
    $app.getImports().headerTimeBattery.subscribe(() => {
      this.timeBatteryStr = $app.getImports().headerTimeBattery.time + "  " + $app.getImports().headerTimeBattery.battery;
    });
  },
  clickAbout() {
    $app.getImports().router.replace({
      uri: "pages/menu/about/about",
    });
  },
  clickLicenses() {
    $app.getImports().router.replace({
      uri: "pages/menu/licenses/licenses",
    });
  },
  swipeBack(data) {
    if (data.direction === "up" || data.direction === "top") return $app.getImports().router.replace({
      uri: "/pages/_index/_index",
    });
  },
  nullFn() { },
  exitApp() {
    $app.getImports().app.terminate();
  },
};

export default _this;