<template>
  <!-- 语言切换 -->
  <!-- 主题切换 -->
  <div :class="{ 'dark-mode': isDark.value }">
    <el-config-provider :locale="locale">
      <el-button type="primary" class="btnlang" mb-2 @click="toggle">切换语言</el-button>
      <el-button @click="toggleDark" class="btndark">切换主题</el-button>
      <router-view></router-view>
    </el-config-provider>
  </div>

</template>


<script setup>
import { useDark, useToggle } from '@vueuse/core'
import './assets/globle.css'
import { ref, computed } from 'vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const language = ref('zh-cn');
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en));
const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn';
}
const isDark = useDark()
const toggleDark = () => {
  isDark.value = !isDark.value;
}

</script>

<style>

</style>