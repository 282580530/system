<template>
    <div>
        <div>
            <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="知识库名称" >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
        </div>
        
        <div class="table">
            <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="知识库名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="系统"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="日期">
      </el-table-column>
    </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: '',
        },
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        add(){
          this.$router.push(`/index/knowledge`);
        }
    }
}
</script>

<style lang="scss" scoped>
.el-form{
    display: flex;
    width: 100%;
    padding: 40px 0;
}
.table{
    padding: 0 40px;
}
</style>