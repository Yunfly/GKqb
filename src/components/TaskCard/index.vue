<template>
  <div class="normal" @click="clickMethod">
      <div class="app-logo">
          <img :src="item.app_ico" alt="">
      </div>
      <div class="app-content">
          <p class="title">{{ item.task_name |words}}</p>
          <p v-if="item.status===1" class="process">进行中...</p>
          <p v-else class="suv-title"><span v-if="item.exclusive_bonus>0">有专属，</span></p>
      </div>
      <div class="task-reward">
          +<span>{{item.bonus+(item.exclusive_bonus||0)|numeral}}</span>元
      </div>
  </div>
</template>
<script>
import { fetchTask } from "@/api/user";
import { mapGetters } from "vuex";

export default {
  name: "taskcard",
  props: ["item", "turn"],
  filters: {
    words(value) {
      if (!!value) {
        return `${value[0]}***`;
      } else {
        return "无法获取app信息";
      }
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    clickMethod() {
      if (!this.turn) return;
      const self = this;
      fetchTask({ apps: [this.item], userInfo: this.userInfo })
        .then(res => {
          self.$emit("handleClick", res);
          // const { code, desc } = res;
          // if (code === 0) {
          //   self.$emit("handleClick", res);
          //   return;
          // }
          // alert(desc);
        })
        .catch(() => self.$emit("errNetWord"));
    }
  }
};
</script>

<style lang="less" scoped>
.normal {
  display: flex;
  margin: 15px;
  align-items: center;
  .app-logo {
    width: 60px;
    border: 1px solid #eee;
    padding: 1px;
    img {
      width: 100%;
      height: auto;
      position: relative;
      top: 1px;
    }
  }
  .app-content {
    flex: 1;
    padding-left: 10px;
    .title {
      font-size: 1.8rem;
      line-height: 1.5;
    }
    .suv-title {
      color: #c4c4c4;
      font-size: 1.4rem;
    }
  }
  .task-reward {
    color: #fb724c;
    span {
      font-size: 1.8rem;
      font-weight: 600;
    }
  }
  .process {
    color: #a7c1eb;
    font-size: 1.4rem;
  }
}
</style>
