<template>
  <div >
    <el-container class="layout-container-demo" style="height: 100vh">
      <!-- header -->
      <el-header class="header" >
        <el-page-header>
    <template #content>
      <div class="flex items-center">
       
        <span class="text-large font-600 mr-3">后台管理系统 </span>
        
        <el-tag>control</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
         <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
         <el-dropdown>
    <span class="el-dropdown-link">
      用户名
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
       
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </div>
    </template>
  </el-page-header></el-header>

      <el-container>
       <!--  菜单栏 -->
        <el-aside width="200px">
          <el-row >
    <el-col :span="300">
      
      <el-menu
       router :default-active="activePath"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/index" @click="saveActiveNav('/index')" >
          <el-icon>
            <location />
          </el-icon>
          <span>首页</span>
        </el-menu-item>
          
        <el-menu-item index="/user/list" @click="saveActiveNav('/index/list')">
          <el-icon><setting /></el-icon>
          <span >用户管理</span>
        </el-menu-item>
        
        <el-menu-item index="/Admin/admin" @click="saveActiveNav('/Admin/admin')">
          <el-icon><document /></el-icon>
          <span>管理员界面</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </el-row>
        </el-aside>
        <!-- 主要内容 -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import '@/router'
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();
// 挂载 DOM 之前
onBeforeMount(() => {
    activePath.value = sessionStorage.getItem("activePath")
        ? sessionStorage.getItem("activePath")
        : "/index"
})
let activePath = ref("");
// 保存链接的激活状态
const saveActiveNav = (path) => {
    sessionStorage.setItem("activePath", path);
    activePath.value = path;
}
const logout = () => {
    // 清除缓存
    sessionStorage.clear();
    router.push("/login");
}



</script>

<style scoped>
body {
  background-color: #FFFFFF;
  width: 100%;
  height: 100%;
}

.header {
  background-color: rgb(77, 113, 179);
}
.el-page-header{
  
  margin-top: 10px;
}
.el-dropdown-link {
  margin-top: 10px;
  margin-left:5px ;
  color: #FFFFFF;
}
.home {
  text-decoration: none;
}
.el-menu {
  border-right: 0;
}
.el-aside {
  width: 125px;
}
.el-main {
  padding:5px;
} 
.custom-class {
  --el-tag-bg-color: red;
}
.router-link-no-underline {
  text-decoration: none;
}
</style>