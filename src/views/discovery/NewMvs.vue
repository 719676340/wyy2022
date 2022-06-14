<template>
  <div class='newMVs'>
      <div class="title"><span>推荐MV</span></div>
      <div class="MVwarp">
          <MVscard v-for="(item) in arr" :key="item" v-bind="item" @click="gomv(item.id)"></MVscard>
      </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';

import MVscard from '../../components/MvsCard.vue';
import { getNewMVs } from '../../api';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

var arr=reactive([1,2,3,4])
function initMvs(){
  arr.splice(0,arr.length)
  getNewMVs().then((res)=>{
    arr.push(...res.result)
  })
}
function gomv(id){
  router.push('/mv/'+id)
}

onMounted(()=>{
  initMvs()
})
</script>
<style lang="scss" scoped>
.newMVs{
  margin-top: 10px;
}
.title{
  font-size: 20px;
  margin-bottom: 10px;
}
.MVwarp{
  display: flex;
  flex-wrap: wrap;
}

</style>
