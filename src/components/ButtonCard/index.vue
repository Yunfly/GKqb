<template>
  <div class="normal" :style={background:bgcolor}>
      <div class="flex">
        <div>
          <p class="title">{{title}}</p>
          <p class="sub-title">{{subTitle}}</p>
        </div>
    <div>
     <i class="el-icon-arrow-right"></i>
    </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'ButtonCard',
  props: ['title', 'subTitle', 'bgcolor']
}
</script>

<style scoped lang='less'>
.normal {
  border-radius: 4px;
  height: 80px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.48);
  color: #fff;
  padding: 0 30px 0 24px;
}
.flex {
  display: flex;
  align-items:center;
  height: inherit;
  justify-content: space-between;
}
.title {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.5;
}
.sub-title {
  font-size: 1.4rem;
}
.el-icon-arrow-right {
  font-weight: 600;
  font-size: 1.8rem;
}
</style>
