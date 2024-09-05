<template>
    <el-card>
    <template #header>
      <div class="card-header">
        <el-input v-model="input" style="width: 300px;font-size: 16px" placeholder="请输入用户姓名" />
     <el-button class="btn" plain :icon="Search" @click="searchUser()"></el-button>
     <el-button class="btn" type="primary" @click="adddata()">添加用户</el-button>
      </div>
    </template >
    

   
<el-table :data="roleData" style="width: 100%">
    <el-table-column label="用户名" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span v-show="!scope.row.isEdit" style="margin-left: 10px">{{ scope.row.username }}</span>
          <el-input ref="inputTitle" @blur="handleBlur(scope.$index)" v-show="scope.row.isEdit" v-model="roleData[scope.$index].username " style="width: 240px"/>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="邮箱" width="250">
      <template #default="scope">
       <div style="display: flex; align-items: center">
          <span v-show="!scope.row.isEdit" style="margin-left: 10px">{{ scope.row.email}}</span>
          <el-input  @blur="handleBlur(scope.$index)" v-show="scope.row.isEdit" v-model="roleData[scope.$index].email " style="width: 240px"/>
        </div>
      </template>
    </el-table-column>

     <el-table-column label="角色" width="180">
      <template #default="scope">
       <div style="display: flex; align-items: center">
          <span v-show="!scope.row.isEdit" style="margin-left: 10px">{{ scope.row.role }}</span>
          <el-input  @blur="handleBlur(scope.$index)" v-show="scope.row.isEdit" v-model="roleData[scope.$index].role " style="width: 240px"/>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="状态" width="180">
      <template #default="scope">
       <div style="display: flex; align-items: center">
          <span v-show="!scope.row.isEdit" style="margin-left: 10px"></span>
          <el-switch
    v-model="scope.row.status"
    class="mb-2"
    active-text="启用"
    inactive-text="禁用"
  />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button   v-show="!scope.row.isEdit" size="small"   @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
         删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

<!-- 分页 -->
    <template #footer>
    <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage1"
      v-model:page-size="pageSize1"
      :page-sizes="[1]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  </template>
  </el-card>
</template>

<script setup>
import {adminData}  from '@/Date/Data'
import {nanoid} from 'nanoid'
import { ref,reactive,watch} from 'vue'
import {
  Search
   
} from '@element-plus/icons-vue'
const input = ref('')
const currentPage1 = ref(1)
const pageSize1 = ref(1)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)

let savedData = JSON.parse(localStorage.getItem('roleData')) || []
let roleData=reactive(savedData.length?JSON.parse(localStorage.getItem('roleData')):adminData)




const handleSizeChange = (val) => {
   pageSize1.value = val
}
const handleCurrentChange = (val) => {
  currentPage1.value = val
}
/* 增 */
function adddata(){
const newdata={
  id:nanoid(),
  username:input.value,
  age:''
}
  roleData.unshift(newdata)
  
}
/* 改 */
const handleEdit = (index) => {
  if( roleData[index].hasOwnProperty('isEdit')){
     roleData[index].isEdit=true
  }
  else{
  roleData[index].isEdit=true
  }
}

function handleBlur(index){
  roleData[index].isEdit=false
  if(!roleData[index].username.trim()||!roleData[index].role.trim()||!roleData[index].email.trim()){
    alert('输入不能为空')
    roleData[index].isEdit=reactive(true)
  }
}

/* 删 */
const handleDelete = (index) => {
  if(confirm('确定删除吗?')){
   roleData.splice(index,1)
    
  }
}

/* 查 */
const searchUser=(()=>{
  
  const findIndex= roleData.findIndex(data=>data.username.includes(input.value))
    
   
    
    
  if(findIndex!==-1){
    roleData.unshift(roleData[findIndex])
    roleData.splice(findIndex+1,1)
  }
  else{
    alert('未找到匹配项')
  }
    
  })
/* 本地存储 */
watch(roleData,(value)=>{
  localStorage.setItem('roleData',JSON.stringify(value))  
})
</script>

<style>
*{
  margin: 0;
  padding:0;
}
.el-input--small .el-input__wrapper,.btn {
  height:30px;
}
.cell {
  font-size: 16px;
}
.el-pagination--small .btn-next, .el-pagination--small .btn-prev, .el-pagination--small .el-pager li {
 font-size: 16px;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.custom-class {
  --el-tag-bg-color: red;
}

</style>