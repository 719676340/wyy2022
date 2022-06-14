<template>
  <div class='playlist' v-if="lists.length!=0">
      <div class="toplist">
          <TopListCard :id="lists[0].id" @click="godetail(lists[0].id)"></TopListCard>
      </div>
      <div class="listwarp">
          <div class="tab">
              <el-tag class="tabitem" type="info" v-for="(item) in tabs" :key="item" @click="currtab=item">
                  <span>{{item}}</span>
              </el-tag>
          </div>
          <div class="playlistcards">
              <PlayListCardmain v-for="(item) in lists" :key="item" :coverImgUrl="item.coverImgUrl" :name="item.name" 
               :playCount="item.playCount" @click="godetail(item.id)"></PlayListCardmain>
          </div>
          <div class="pagination">
              <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next" :total="1000" :page-size="50"/>
          </div>
      </div>
  </div>
</template>

<script setup>
import TopListCard from '../components/TopListCard.vue';
import PlayListCardmain from '../components/PlayListCardmain.vue';
import { onMounted, reactive, readonly, ref, watch } from 'vue';
import { gettoplist } from '../api';
import { useRouter, useRoute } from 'vue-router'
const router=useRouter()
var tabs=reactive([
      "全部",
      "欧美",
      "华语",
      "流行",
      "说唱",
      "摇滚",
      "民谣",
      "电子",
      "轻音乐",
      "影视原声",
      "ACG",
      "怀旧",
      "治愈",
      "旅行"
    ])
var currtab=ref("全部")
// 监听page的数值来修改页面的信息
var currentPage=ref(1)
var lists=reactive([])
var total=ref(0)
watch(()=>currtab.value,()=>{
    getlist()
})
function getlist(){
    lists.splice(0,lists.length)
    gettoplist(currtab.value,currentPage.value).then((res)=>{
        total.value=res.total
        lists.push(...res.playlists)
        console.log(res)
    })
}
function godetail(id){
    router.push('/playlist/'+id)
}
watch(()=>currentPage.value,()=>{
    getlist()
})
onMounted(()=>{
    getlist()
})
</script>
<style lang="scss" scoped>
.playlist{
    padding: 12px;
}
.listwarp{
    margin-top: 20px;
}
.tab{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
.tabitem{
    cursor: pointer;
    margin-left: 5px;
    font-size: 14px;
}
.playlistcards{
    display: flex;
    flex-wrap: wrap;
}
.pagination{
    display: flex;
    justify-content: flex-end;
}
</style>
