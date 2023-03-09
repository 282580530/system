<template>
  <div class="views">
    <div class="menu">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
        :collapse="isCollapse">
        <el-menu-item  v-for="(item,i) in menuList" :index="item.value" :key="i" @click="go(item)"  >
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuList:[
        {
        title:'报告管理',
        value:'report',
      },
        {
        title:'知识库列表',
        value:'knowledgeList'
      }
    ]
    };
  },
  methods: {
    go(item){
console.log(item.value,'item');
this.$router.push(`/index/${item.value}`);
    },
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.views{
  display: flex;
}
.content{
  flex: 1;
}
</style>