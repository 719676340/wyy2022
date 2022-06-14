<template>
  <div class='newsongs'>
      <div class="title"><span>最新音乐</span></div>
      <div class="songswarp">
          <SongsCard class="songscard" v-for="(item,index) in arr.slice(0,10)" :key="item.id" :Number="index+1" v-bind="item"></SongsCard>
      </div>
  </div>
</template>

<script setup>
import SongsCard from '../../components/SongsCard.vue';
import { getNewsongs } from '../../api';
import { onMounted, reactive } from 'vue';
var arr=reactive([])
function initsongslist(){
  arr.splice(0,arr.length)
  getNewsongs(20).then((res)=>{
    arr.push(...res.result)
  })
}
onMounted(()=>{
  initsongslist()
})
</script>
<style lang="scss" scoped>
.title{
  font-size: 20px;
  margin-bottom: 10px;
}
.songswarp{
    display: flex;
    flex-wrap: wrap;
}
.songscard{
    flex: 1 1 45%;
}
</style>
