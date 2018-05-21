<template>
  <div id="app">
    <router-view v-if="!!userInfo.user_id"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { fetchUserInfo, fetchCurrent } from "@/api/user";
export default {
  name: "App",
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["saveUserInfo"])
  },
  async mounted() {
    const response = await fetchCurrent();
    if (response.code === 0) {
      this.saveUserInfo({...response,token:"dd1f8a4b-c6ff-41ce-c10d-0839fc4e3610"});
    } else {
      alert(response.desc);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
}
* {
  margin: 0;
}
.el-input__inner {
  border: none !important;
  border-bottom: 1px solid !important;
  border-radius: 0 !important;
}
.el-message {
  min-width: 200px !important;
  left: 45% !important;
  top: 20% !important;
  border: none !important;
}
.el-message--success,
.el-message--error {
  margin: 0 20px;
  background: rgba(0, 0, 0, 0.8);
}
.el-message__content {
  color: #fff !important;
}
</style>
