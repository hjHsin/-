<template>
    <div class="welcome">
    <h1>Welcome!</h1>
    <h2>后台管理系统</h2>
  </div>
</template>

<script setup>

</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
h1,h2 {
  padding: 100px;
  text-align: center;
  color:rgb(77, 113, 179);
}
.welcome {
  width:100%;
  height: 100%;
  background-image: url(../assets/image/loginimage.webp);
}
.custom-class {
  --el-tag-bg-color: red;
}
img {
  float: right;
}
</style>
