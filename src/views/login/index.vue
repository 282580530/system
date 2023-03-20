<template>
  <div>
    <div class="login-bg">
      <div class="title">3D数字报告后台管理系统</div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="账号">
          <el-input v-model="form.user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        user: '',
        password: ''
      }
    }
  },
  created(){
      // this.USER_LOGINOUT()
  },
  methods: {
    ...mapMutations(["USER_LOGIN", "USER_LOGINOUT"]),
    onSubmit() {
      if((this.form.user == 'IT'&&this.form.password == '123456')|| (this.form.user == 'IT2'&&this.form.password == '123456')){
        this.USER_LOGIN(this.form);
      this.$router.push("/index").catch(()=>{});
      } else {
        this.$message.error('账号密码错误');
      }
     
    },
   
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size: 20px;
  font-weight: 700;
  padding: 200px 0;
}
</style>