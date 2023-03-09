<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="账号">
          <el-input v-model="form.user" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="密码"></el-input>
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
  methods: {
    ...mapMutations(["USER_LOGIN", "USER_LOGINOUT"]),
    onSubmit() {
      this.USER_LOGIN(this.form);
      this.$router.push("/index").catch(()=>{});
    },
   
  }
}
</script>

<style></style>