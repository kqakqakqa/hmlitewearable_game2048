export default {
  data: {
    uiSizes: $app.getImports().uiSizes,
    licenses: `开放源代码许可：

名称：hmlitewearable_game2048
源码：https://github.com/kqakqakqa/hmlitewearable_game2048
许可：MIT License`,
  },
  onInit() { },
  swipeBack(data) {
    if (data.direction === "right") return $app.getImports().router.replace({
      uri: "/pages/menu/menu",
    });
  },
}