<template>
  <div class='searchsongs' v-if="songlist.length">
      <div class="list">
          <div class="listhead">
            <div class="id"></div>
            <div class="songtitle">
                <span>音乐标题</span>
            </div>
            <div class="author">
                <span>歌手</span>
            </div>
            <div class="album">
                <span>专辑</span>
            </div>
            <div class="time">
                <span>时长</span>
            </div>
          </div>
          <div class="songlist">
              <div class="songitem" v-for="(item, index) in songlist" @click="changecurrentsong(item.id)" :key="index">
                <div class="id">
                    <span>{{index}}</span>
                </div>
                <div class="songtitle" :class="{'title-active':(music.currentSong.id==item.id)}">
                    <span>{{item.name}}</span>
                    <i class="iconfont icon-bofangMV mvplay" v-if="item.mvid!=0"></i>
                </div>
                <div class="author">
                    <span>{{item.artists[0].name}}</span>
                </div>
                <div class="album">
                    <span>{{item.album.name}}</span>
                </div>
                <div class="time">
                    <span>{{secdtomins(item.duration/1000)}}</span>
                </div>                  
              </div>
          </div>
      </div>
        <div class="pagination">
            <el-pagination v-model:currentPage="currentPage" layout="prev, pager, next" :total="totelsum" :page-size="30"/>
        </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref, watch } from 'vue';
import {getSearch2,getSongDetail} from '../api/index'
import { useMusicStore } from '../stores/music';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const music=useMusicStore()

var searchword=ref(route.params.keywords)
var type=1
var currentPage=ref(1)
var songlist=reactive([])
var totelsum=ref(0)
watch(()=>currentPage.value,()=>{
    getlist()
})
watch(()=>route.params.keywords,()=>{
    searchword.value=route.params.keywords
    gettotal()
})
function gettotal(){
    songlist.splice(0,songlist.length)
    getSearch2(searchword.value,type,currentPage.value,30).then((res)=>{
        console.log(res)
        totelsum.value=res.result.songCount
    }).then(()=>{
        getSearch2(searchword.value,type,currentPage.value,30).then((res)=>{
            console.log(res)
            songlist.push(...res.result.songs)
        })
    }).catch((err)=>{
        console.log(err)
    })
}
function getlist(){
    songlist.splice(0,songlist.length)
    getSearch2(searchword.value,type,currentPage.value,30).then((res)=>{
        songlist.push(...res.result.songs)
    }).catch((err)=>{
        console.log(err)    
    })
}
function secdtomins(secd){
    let left=Math.floor(secd/60)>9?Math.floor(secd/60)+'':'0'+Math.floor(secd/60)
    let right=Math.floor(secd%60)>9?Math.floor(secd%60)+'':'0'+Math.floor(secd%60)
    return left+':'+right
}

function changecurrentsong(Songid){
  let index=music.SongIndex(Songid)
  console.log(index)
  getSongDetail(Songid).then((res)=>{
    if(index==-1){
        music.setPlaying(true)
        music.addplaylist([res.songs[0]])
    }else{
      music.setCurrentSong(music.playlist[index])
    }
  })
} 
// function path(){
//     console.log(route.params.keywords)
// }


onMounted(()=>{
    gettotal()
    // path()
})
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.listhead{
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: gray;
}
.id{
    flex: 0 0 50px;
    display: flex;
    justify-content: center;
}
.songtitle{
    flex: 1 1;
    display: flex;
    justify-content: center;
}
.author{
    flex: 1 1;
    display: flex;
    justify-content: center;
}
.album{
    flex: 1 1;
    display: flex;
    justify-content: center;
}
.time{
    flex: 0 0 100px;
    display: flex;
    justify-content: center;
}
.songitem{
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: black;
    &:hover{
        background-color: $menu-blackgroundcolor-active;
    } 
}
.songitem:nth-child(even){
    background-color: $playlist-blackgroundcolor;
    &:hover{
        background-color: $menu-blackgroundcolor-active;
    } 
}
.pagination{
    display: flex;
    justify-content: flex-end;
}
.mvplay{
    font-size: 20px;
    margin-left: 5px;
    color: red;
    cursor: pointer;
}
.title-active{
    color:red;
}
</style>
