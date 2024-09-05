<template>
    <el-card>
    <template #header>
      <div class="card-header">
        <el-input v-model="input" style="width: 300px;font-size: 16px" placeholder="请输入用户姓名" />
     <el-button class="btn" :icon="Search" @click="searchUser()"></el-button>
     <el-button class="btn" type="success" @click="addData()">添加</el-button>
      </div>
    </template >
    

   
<el-table :data="tableData" style="width: 100%">
    <el-table-column label="姓名" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span 
          v-show="!scope.row.isEdit" 
          style="margin-left: 10px">
          {{ scope.row.name }}
        </span>
          <el-input ref="inputTitle" @blur="handleBlur(scope.$index)" v-show="scope.row.isEdit" v-model="tableData[scope.$index].name " style="width: 240px"/>
          
        </div>
      </template>
    </el-table-column>
    <el-table-column label="年龄" width="180">
      <template #default="scope">
       <div style="display: flex; align-items: center">
          <span v-show="!scope.row.isEdit" style="margin-left: 10px">{{scope.row.age }}</span>
          <el-input  @blur="handleBlur(scope.$index)" v-show="scope.row.isEdit" v-model="tableData[scope.$index].age " style="width: 240px"/>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="是否为会员" width="180">
      <template #default="scope">
       <div style="display: flex; align-items: center">
          <span v-show="!scope.row.isEdit" style="margin-left: 10px"></span>
          <el-switch
    v-model="scope.row.vip"
    class="mb-2"
    active-text="是"
    inactive-text="不是"
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


    <template #footer><!-- 分页 -->
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

import {nanoid} from 'nanoid'
import { ref,reactive,watch} from 'vue'
import {
  Search
} from '@element-plus/icons-vue'
import { userData }  from '@/Date/Data'
const input = ref('')
const currentPage1 = ref(1)
const pageSize1 = ref(1)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)


let savedData = JSON.parse(localStorage.getItem('tableData')) || []
let tableData=reactive(savedData.length?JSON.parse(localStorage.getItem('tableData')):userData)


const handleSizeChange = (val) => {
   pageSize1.value = val
}
const handleCurrentChange = (val) => {
  currentPage1.value = val
}
/* 增 */
function addData(){
const newdata={
  id:nanoid(),
  name:input.value,
  age:''
}
  
  tableData.unshift(newdata)
 
}
/* 改 */
const handleEdit = (index) => {
  if(tableData [index].hasOwnProperty('isEdit')){
     tableData[index].isEdit=true
  }
  else{
  tableData[index].isEdit=true
  }
}

function handleBlur(index){
  tableData[index].isEdit=false
  if((!tableData[index].name.trim())||(!tableData[index].age.trim())){
    alert('输入不能为空')
    tableData[index].isEdit=reactive(true)
  }
  
}

/* 删 */
const handleDelete = (index) => {
  if(confirm('确定删除吗?')){
   tableData.splice(index,1)
  
  }
}
/* 查 */
const searchUser=(()=>{
  
  const findIndex= tableData.findIndex(data=>data.name.includes(input.value))
    
   
    
    
  if(findIndex!==-1){
    tableData.unshift(tableData[findIndex])
    tableData.splice(findIndex+1,1)
  }
  else{
    alert('未找到匹配项')
  }
    
  })
  
  



/* 本地存储 */
watch(tableData,(value)=>{
  localStorage.setItem('tableData',JSON.stringify(value))  
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
.highlight-row {
  background-color: #f5f5f5 !important;
}

</style>