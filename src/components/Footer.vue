<template>
  <div class="footer-container">
    <div class="info">Welcome to
      <a href="#">gitrank.cn</a>
    </div>
    <div class="info">Copyright © 2020 中科院计算所前瞻实验室分布式组. All rights reserved.</div>
    <div class="info">京ICP备17068009号-2</div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer-container {
  /* position:fixed; */
  height: 100px;
  background: #44474b;
  text-align: center;
  color: #fff;
  font-size: 12px;
  padding: 20px 0px;
}
.info {
  margin: 5px 0px;
}
a:hover {
  color: rgb(84, 164, 235);
}
</style>
