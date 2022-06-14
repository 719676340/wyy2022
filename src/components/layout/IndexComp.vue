<template>
  <div class='layout'>
    <HeaderItem></HeaderItem>
    <div class="layoutbody">
      <div class="layoutmenu" v-if="(route.path.split('/')[1]!='mv')">
        <MenuItem></MenuItem>
      </div>
      <div class="content">
        <div class="contentwarp">
          <!-- <discovery></discovery> -->
          <!-- <PlayList></PlayList> -->
          <!-- <SongsView></SongsView> -->
          <!-- <MVsView></MVsView> -->
          <!-- <SearchView></SearchView> -->
          <!-- <MvView></MvView> -->
          <!-- <PlayListdetail></PlayListdetail> -->
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {RouterView } from 'vue-router'
import HeaderItem from './HeaderItem.vue';
import MenuItem from './MenuItem.vue';
import discovery from '../../views/discovery/IndexView.vue'
import PlayList from '../../views/PlayList.vue';
import SongsView from '../../views/SongsView.vue';
import MVsView from '../../views/MVsView.vue';
import SearchView from '../../views/SearchView.vue';
import MvView from '../../views/MvView.vue';
import PlayListdetail from '../../views/PlayListdetail.vue';
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue';
const router = useRouter()
const route = useRoute()
// var mentshow=ref()
// watch(()=>route.path,()=>{
//   console.log()
// })
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.layout{
  height: calc(100vh - $mini-player-height);
}
.layoutbody{
  display: flex;
  height: calc(100% - $header-height);
}
.layoutmenu{
  height: 100%;
  // flex: 0 0 250px;
  // background-color: red;
}
.content{
  flex: 1 1;
  overflow-y: auto;
  height: calc(100%);
  // margin-bottom: $mini-player-height;
  min-width: $layout-content-min-width;
  // background-color: blue;
  .contentwarp{
    max-width: $center-content-max-width;
    margin: auto;
    // clear: auto;
  }
}
</style>
