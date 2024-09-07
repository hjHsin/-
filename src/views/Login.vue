<template >
  <div class="login">
 <el-card style="max-width: 480px" class="logincard">
      <div class="card-header">
        <span>后台管理系统</span>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="ruleFormRef"
 label-width="auto" style="max-width: 600px">
       <el-form-item class="input" label="账号" prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入账号"/>
    </el-form-item>
         <el-form-item class="input" label="密码" prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password/>
    </el-form-item>
    </el-form>
  
       <div id="footer">
        <el-button  class="btn" type="primary" @click="handleSubmit()" >登录</el-button>
       </div>
       
   
  </el-card>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import {reactive,ref } from 'vue'
import { ElMessage } from 'element-plus'


const router=useRouter()

const ruleFormRef = ref(null)

const rules=reactive({
  username:[{required: true,message:"账号不能为空",trigger: 'blur'}],
  password:[{required: true,message:"密码不能为空",trigger: 'blur'}]
})

const loginForm = ref({
  username: '',
  password: ''
})
const handleSubmit=()=>{
  if (ruleFormRef.value) {
    ruleFormRef.value.validate(async (valid) => {
      if (valid) {
        axios.post('/api/login', loginForm.value)
          .then(response => {
            if (response.data.code === 200) {
              const { token } = response.data.data;
              localStorage.setItem('token', token); // 存储 token 以保持登录状态
              ElMessage.success('登录成功');
              router.push('/index'); // 跳转到首页
            } else {
              ElMessage.error(response.data.message);
            }
          })
          .catch(error => {
            console.error(error);
            ElMessage.error('登录失败');
          });
      } else {
        ElMessage.error('表单验证失败，请检查输入');
      }
    });
  }
}


</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.login {
 
  width: 100%;
   height: 100vh; 
   background-image: url(../assets/image/loginimage.webp);
}

.logincard {
    position: relative;
    left:35%;
    top:35%;
    width: 100%;
     max-width: 480px;
}
.card-header {
  margin-bottom: 30px;
}
.btn {
  width: 70px;
  position: relative;
  left: 37%;
  margin:10px;
  font-size: 16px;
}
.el-input{
  height:30px;
  font-size: 16px;
}
.card-header[data-v-08aaad4e] {
  font-size: 20px;
}
.el-form-item__label {
  font-size: 16px;
}
.custom-class {
  --el-tag-bg-color: red;
}
.login-container {
  max-width: 400px;
  margin: 100px auto;
}
.input {
  margin:20px;
}
</style>
