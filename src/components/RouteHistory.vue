<template>
  <div class='route-history'>
      <div class="icon" @click="back">
        <i class="iconfont icon-xiangzuo1"></i>
      </div>
      <div class="icon" @click="go">
        <i class="iconfont icon-xiangyou1"></i>
      </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
function go(){
  router.go(1)
}
function back(){
  router.go(-1)
}
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.route-history{
    display: flex;
    align-items: center;
}
.icon{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-right: 15px;
  border-radius: 50%;
  &:hover{
    background-color: rgb(231, 231, 231)
  }
  i{
    font-size: 10px;
  }
}
</style>
