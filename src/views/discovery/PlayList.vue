<template>
  <div class='PlayList' v-if="arr.length">
    <div class="title"><span>推荐歌单</span></div>
    <div class="listwarp">
      <PlayListCard v-for="(item) in arr" :key="item" v-bind="item" @click="godetail(item.id)"></PlayListCard>
    </div>
  </div>
</template>

<script setup>
import PlayListCard from '../../components/PlayListCard.vue';
import {getdiscoveryplaylist} from '../../api/index'
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router'
const router=useRouter()
var arr=reactive([])
function initpalylisi(){
  arr.splice(0,arr.length)
  getdiscoveryplaylist(10).then((res)=>{
    arr.push(...res.result)
  }).catch((err)=>{
    console.log(err)
  })
}
function godetail(id){
    router.push('/playlist/'+id)
}
onMounted(()=>{
  initpalylisi()
})


</script>
<style lang="scss" scoped>
.listwarp{
  display: flex;
  flex-wrap: wrap;
}
.title{
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
