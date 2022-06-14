<template>
  <div class='search' v-if="list.length">
      <div class="list">
          <PlayListCardmain v-for="(item, index) in list" :key="index" v-bind="item" @click="godetail(item.id)"></PlayListCardmain>
      </div>
        <div class="pagination">
            <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next" :total="totelsum" :page-size="30"/>
        </div>
  </div>
</template>

<script setup>
import PlayListCardmain from './PlayListCardmain.vue';
import {getSearch} from '../api/index'
import { ref,reactive,onMounted,watch} from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
var searchword=ref(route.params.keywords)
var type=1000
var currentPage=ref(1)
var list=reactive([])
var totelsum=ref(0)
watch(()=>currentPage.value,()=>{
    getlist()
})
watch(()=>route.params.keywords,()=>{
    searchword.value=route.params.keywords
    gettotal()
})
function gettotal(){
    list.splice(0,list.length)
    getSearch(searchword.value,type,currentPage.value,30).then((res)=>{
        console.log(searchword.value,type,currentPage.value,30)
        totelsum.value=res.result.playlistCount
    }).then(()=>{
        getSearch(searchword.value,type,currentPage.value,30).then((res)=>{
            console.log(res)
            list.push(...res.result.playlists)
        })
    }).catch((err)=>{
        console.log(err)
    })
}
function getlist(){
    list.splice(0,list.length)
    getSearch(searchword.value,type,currentPage.value,30).then((res)=>{
        console.log(res)
        list.push(...res.result.playlists)
    }).catch((err)=>{
        console.log(err)    
    })
}
function godetail(id){
    router.push('/playlist/'+id)
}
onMounted(()=>{
    gettotal()
})
</script>
<style lang="scss" scoped>
.list{
    display: flex;
    flex-wrap: wrap;
}
.pagination{
    display: flex;
    justify-content: flex-end;
}
</style>
