import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

/*
  할일 관리 앱 (CRUD)
  할일 조회
  할일 추가
  할일 삭제
  할일 수정
*/
