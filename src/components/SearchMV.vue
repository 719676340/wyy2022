<template>
  <div class='searchMV' v-if="list.length">
      <div class="mvlist">
          <MvsCard v-for="(item, index) in list" :key="index" :picUrl='item.cover' :name='item.name' :artistName='item.artistName' :playCount='item.playCount' :id='item.id'></MvsCard>
      </div>
        <div class="pagination">
            <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next" :total="totelsum" :page-size="28"/>
        </div>
  </div>
</template>

<script setup>
import { ref ,reactive,onMounted,watch} from 'vue';
import {getSearch} from '../api/index'
import MvsCard from './MvsCard.vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
var searchword=ref(route.params.keywords)
var type=1004
var currentPage=ref(1)
var list=reactive([])
var totelsum=ref(0)
watch(()=>currentPage.value,()=>{
    getlist()
})
function gettotal(){
    getSearch(searchword.value,type,currentPage.value,28).then((res)=>{
        console.log(res)
        totelsum.value=res.result.mvCount
    }).then(()=>{
        getSearch(searchword.value,type,currentPage.value,28).then((res)=>{
            list.push(...res.result.mvs)
        })
    }).catch((err)=>{
        console.log(err)
    })
}
function getlist(){
    list.splice(0,list.length)
    getSearch(searchword.value,type,currentPage.value,28).then((res)=>{
        console.log(res)
        list.push(...res.result.mvs)
    }).catch((err)=>{
        console.log(err)    
    })
}
onMounted(()=>{
    gettotal()
})
</script>
<style lang="scss" scoped>
.mvlist{
    display: flex;
    flex-wrap: wrap;
}
.pagination{
    display: flex;
    justify-content: flex-end;
}
</style>
