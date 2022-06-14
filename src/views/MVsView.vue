<template>
  <div class='mvsview'>
      <div class="tabs">
          <div class="area">
              <span>地区:</span>
                <el-tag class="tabitem" :class="{'tabitemactive':(index==area)}" @click="area=index" type="info" v-for="(item,index) in areaTabs" :key="item">
                  <span>{{item}}</span>
                  <div class="line" v-if="index!=areaTabs.length-1"></div>
                </el-tag>
          </div>
          <div class="type">
              <span>类型:</span>
                <el-tag class="tabitem" :class="{'tabitemactive':(index==type)}" @click="type=index" type="info" v-for="(item,index) in typeTabs" :key="item">
                  <span>{{item}}</span>
                  <div class="line" v-if="index!=typeTabs.length-1"></div>
                </el-tag>
          </div>
          <div class="sort">
              <span>排序:</span>
                <el-tag class="tabitem" :class="{'tabitemactive':(index==sort)}" @click="sort=index" type="info" v-for="(item,index) in sortTabs" :key="item" >
                  <span>{{item}}</span>
                  <div class="line" v-if="index!=sortTabs.length-1"></div>
                </el-tag>
          </div>
      </div>
      <div class="mvlist">
          <MvsCard v-for="(item, index) in mvlist" :key="index" v-bind="item" :id="item.id" :picUrl="item.cover" @click="gomv(item.id)"></MvsCard>
      </div>
        <div class="pagination">
            <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next" :total="1000" />
        </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import MvsCard from '../components/MvsCard.vue';
import { getallMvs } from '../api';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const areaTabs = ["全部", "内地", "港台", "欧美", "日本", "韩国"]
const typeTabs = ["全部", "官方版", "原声", "现场版", "网易出品"]
const sortTabs = ["上升最快", "最热", "最新"]
var currentPage=ref(1)
var area=ref(0)
var type=ref(0)
var sort=ref(0)
var mvlist=reactive([])

watch(()=>area.value,()=>{
  currentPage.value=1
  getmv()
})
watch(()=>type.value,()=>{
  currentPage.value=1
  getmv()
})
watch(()=>sort.value,()=>{
  currentPage.value=1
  getmv()
})
watch(()=>currentPage.value,()=>{
  getmv()
})
function getmv(){
  mvlist.splice(0,mvlist.length)
  getallMvs({'limit':40,'area':areaTabs[area.value],'type':typeTabs[type.value],'order':sortTabs[sort.value],'offset':(currentPage.value-1)*40}).then((res)=>{
    mvlist.push(...res.data)
  })
}
function gomv(id){
  router.push('/mv/'+id)
}
onMounted(()=>{
  getmv()
})
</script>
<style lang="scss" scoped>
.mvsview{
    color: gray;
    padding: 18px 36px;
}
.area,.type,.sort{
    margin: 10px 0;
}
.tabitem{
    position: relative;
    cursor: pointer;
    min-width: 55px;
    height: 30px;
    margin: 0 20px;
    font-size: 14px;
    clear: both;
    .line{
        position: absolute;
        height: 100%;
        border-left: 1px solid gray;
        top:0;
        right: -20px;
    }
}
.tabitemactive{
  color: red;
}
.mvlist{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
}
.pagination{
    display: flex;
    justify-content: flex-end;
}
</style>
