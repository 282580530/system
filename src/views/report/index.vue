<template>
  <div>
    <div>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="流水号">
          <el-input v-model="form.name" placeholder="请输入流水号"></el-input>
        </el-form-item>
        <el-form-item label="病人编号">
          <el-input v-model="form.name" placeholder="请输入病人编号"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
      v-model="form.name"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onSubmit">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
    
      <el-table  :header-cell-style="{'text-align':'center'}"
    :cell-style="{'text-align':'center'}" :data="tableData" style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column
      type="selection"
      width="55">
    </el-table-column>
        <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
        <el-table-column prop="date" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="年龄" width="180">
        </el-table-column>
        <el-table-column prop="address" label="性别">
        </el-table-column>
        <el-table-column prop="address" label="流水号">
        </el-table-column>
        <el-table-column prop="address" label="检查日期">
        </el-table-column>
        <el-table-column prop="address" label="病人编号">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
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
      currentPage4: 4,
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
      }],
      multipleSelection:[]
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val,'val');
        this.multipleSelection = val;
      },
    onSubmit() {
      console.log('submit!');
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(){

      }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  display: flex;
  width: 100%;
  padding: 40px 0;
  flex-direction: row;
  .el-form-item{
    width: 250px;
  }
}

.table {
  padding: 0 40px;
}
.page{
  margin-top: 20px;
}
</style>