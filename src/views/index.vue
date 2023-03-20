<template>
  <div class="main">
    <div class="views">
      <div class="menu">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-menu-item v-for="(item, i) in menuList" :index="item.value" :key="i" @click="go(item)">
            <i class="el-icon-files" v-if="item.value == 'report'"></i>
            <i class="el-icon-notebook-2" v-else></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <div class="logout">
      <div>{{userInfo.user}}</div>
      <div class="out" @click="logout">登出</div>
    </div>
        <div class="title" v-if="$route.path != '/index/knowledge'">3D数字报告后台管理系统</div>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      menuList: [
        {
          title: '报告管理',
          value: 'report',
        },
        {
          title: '知识库列表',
          value: 'knowledgeList'
        }
      ],
      menuList2: [
        {
          title: '知识库列表',
          value: 'knowledgeList'
        }
      ],
    };
  },
  created(){
     if(this.userInfo.user != 'IT'){
      this.menuList = this.menuList2
     }
  },
  computed: {
    ...mapState([
      "userInfo"
    ]),
  },
  methods: {
     ...mapMutations(["USER_LOGINOUT"]),
    go(item) {
      console.log(item.value, 'item');
      this.$router.push(`/index/${item.value}`);
    },
    logout(){
      this.USER_LOGINOUT()
      this.$router.push(`/login`);
    },
  },
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.main{
  height: 100%;
    display: flex;
    flex-direction: column;
}
.views {
  display: flex;
  height: 100%;
}

.content {
  flex: 1;

  .title {
    padding-top: 20px;
  }
}

.logout {
 padding-top: 10px;
  display: flex;
  justify-content: end;
  margin-right: 20px;
  align-items: center;
  font-size: 16px;
  .out{
    margin-left: 10px;
    color:#1790FF;
    cursor: pointer;
  }
}
</style>