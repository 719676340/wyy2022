<template>
  <div class='header'>
      <div class="left">
          <div class="botton" @click="gohome()">
              <i class="iconfont icon-home logo"></i>
          </div>
          <div class="routerhistory">
              <routesHistory></routesHistory>
          </div>
      </div>
      <div class="right">
          <div class="search-wrap">
              <search></search>
          </div>
      </div>
  </div>
</template>

<script setup>
import routesHistory from '../RouteHistory.vue'
import search from '../SearchItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { useMusicStore } from '../../stores/music';
const router = useRouter()
const music=useMusicStore()
function gohome(){
    music.setPlayerShow(false)
    router.push('/')
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $header-height;
    background-color: $header-bgcolor;
}
.left{
    display: flex;
    align-items: center;
    padding-left: $header-fontsize;
}
.botton{
    cursor: pointer;
    opacity: 0.2;
    &:hover{
        opacity: 1;    
    }
}
.logo{
    font-size: $header-logosize;
}
.routerhistory{
    margin-left: 65px;
}
.right{
    display: flex;
    justify-content: center;
}
</style>
