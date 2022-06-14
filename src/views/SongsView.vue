<template>
    <div class='songs'>
        <div class="tabs">
            <el-tag class="tabitem" :class="{'tabitem-active':index==currtagtype}" @click="changetype(index)" type="info" v-for="(item,index) in tabs" :key="item">
                <span>{{item.title}}</span>
            </el-tag>
        </div>
        <div class="songlistwrap">
            <SongTable :list="songlist"></SongTable>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import SongTable from '../components/SongTable.vue';
import {getTopSongs} from '../api/index'
var songlist=reactive([])
var currtagtype=ref(0)
var tabs = [
      { title: "全部", type: 0 },
      { title: "华语", type: 7 },
      { title: "欧美", type: 96 },
      { title: "日本", type: 8 },
      { title: "韩国", type: 16 }
    ]
watch(()=>currtagtype.value,(newplaying)=>{
    getsonglist(tabs[newplaying].type)
})
function getsonglist(type){
    songlist.splice(0,songlist.length)
    getTopSongs(type).then((res)=>{
        console.log(type,res.data)
        songlist.push(...res.data)
    })
}
function changetype(index){
    currtagtype.value=index
}
onMounted(()=>{
    getsonglist(0)
})
</script>
<style lang="scss" scoped>
.songs{
    padding: 13px;
}
.tabs{
    display: flex; 
    justify-content: flex-end;
    margin-bottom: 10px;
}
.tabitem{
    cursor: pointer;
    margin-left: 5px;
    font-size: 14px;
}
.tabitem-active{
    color: red;
}
</style>
