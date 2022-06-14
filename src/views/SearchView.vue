<template>
  <div class='search'>
      <div class="title">
          <span class="searchname">{{route.params.keywords}}</span>
          <!-- <span class="resnum">找到26个搜索结果</span> -->
      </div>
      <div class="types">
          <span @click="changetype('songs')" :class="{'activetype':currtype=='songs'}">歌曲</span>
          <span @click="changetype('playlists')" :class="{'activetype':currtype=='playlists'}">歌单</span>
          <span @click="changetype('mvs')" :class="{'activetype':currtype=='mvs'}">MV</span>
      </div>
      <div class="routeview">
          <!-- <SearchMV></SearchMV> -->
          <!-- <SearchList></SearchList> -->
          <!-- <SearchSongs></SearchSongs>    -->
          <RouterView/>
      </div>
  </div>
</template>

<script setup>
import SearchMV from '../components/SearchMV.vue';
import SearchList from '../components/SearchList.vue';
import SearchSongs from '../components/SearchSongs.vue';
import { RouterLink, RouterView } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const route = useRoute()
var currtype=ref('songs')
function changetype(type){
    let word=route.params.keywords
    // console.log(word,type)
    router.push('/search/'+word+'/'+type)
    currtype.value=type
}
</script>
<style lang="scss" scoped>
.search{

}
.title{
    display: flex;
    height: 80px;
    align-items: flex-end;
}
.searchname{
    font-size: 30px;
}
.resnum{
    color: gray;
}
.types{
    display: flex;
    height: 40px;
    margin: 20px 0 20px;
    color: gray;
    font-size: 20px;
    cursor: pointer;
    span{
        margin: 0 10px;
        &:hover{
            color:black
        }
    }
}
.activetype{
    color: red;
}
.routeview{
}
</style>
