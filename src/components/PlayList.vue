<template>
  <div class='playlist'>
      <div class="top">
          <span :class="{'active':(type=='now')}" @click="type='now'">播放列表</span>
          <span :class="{'active':(type=='history')}" @click="type='history'">历史记录</span>
      </div>
      <div class="header">
          <span>总共{{listnum}}首</span>
          <span class="clearsongs" @click="clearlist"><i class="iconfont icon-bofang"></i>清空</span>
      </div>
      <div class="list">
          <div class="listhead">
            <div class="songtitle">
                <span>音乐标题</span>
            </div>
            <div class="author">
                <span>歌手</span>
            </div>
            <div class="time">
                <span>时长</span>
            </div>
          </div>
          <div class="songlist">
              <div class="songitem" v-for="(item, index) in list" :key="index" @click="changecurrentsong(item.id)">
                <div class="songtitle" :class="{'activesong':(item.id==music.currentSong.id)}">
                    <span>{{item.name}}</span>
                </div>
                <div class="author">
                  <span class="author" v-for="(ar,index) in item.ar?item.ar.slice(0,Math.min(item.ar.length,2)):[]" :key="ar.id" >{{ar.name}}<span v-if="index!=item.ar.length-1">/</span></span>
                  <span v-if="item.ar&&item.ar.length>2">...</span>
                </div>
                <div class="time">
                    <span>{{secdtomins(item.dt/1000)}}</span>
                </div>                  
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import {useMusicStore} from '../stores/music'
import { getSongDetail } from '../api';
const music=useMusicStore()
var type=ref('now')
var listnum=ref(0)
var list=reactive([])
function nowinit(){
    listnum.value=music.playlist.length
    list.splice(0,list.length,...music.playlist)
}
function secdtomins(secd){
    let left=Math.floor(secd/60)>9?Math.floor(secd/60)+'':'0'+Math.floor(secd/60)
    let right=Math.floor(secd%60)>9?Math.floor(secd%60)+'':'0'+Math.floor(secd%60)
    return left+':'+right
}
function clearlist(){
    if(type.value=='now'){
        music.clearplaylist()
        music.setCurrentSong({})
        music.setPlaying(false)
    }else{
        localStorage.setItem('historylist',JSON.stringify([]))
    }
    initlist()
}
function inithistorylist(){
    if(!localStorage.getItem('historylist')){
        localStorage.setItem('historylist',JSON.stringify([]))
    }
}
function historyinit(){
    let num=JSON.parse(localStorage.getItem('historylist'))
    listnum.value=num.length
    list.splice(0,list.length,...num)
}
function initlist(){
    if(type.value=='now'){
        nowinit()
    }else{
        historyinit()
    }
}
function changecurrentsong(id){
  let index=music.SongIndex(id)
  console.log(index)
  if(index==-1){
    getSongDetail(id).then((res)=>{
      console.log(res.songs[0])
      music.addplaylist([res.songs[0]])
    })
  }else{
    music.setCurrentSong(music.playlist[index])
  }
  music.setPlaying(true)
}
watch(()=>type.value,()=>{
    initlist()
})
onMounted(()=>{
    initlist()
    inithistorylist()
})
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.playlist{
    position: absolute;
    z-index: $playlist-zindex;
    top: 0;
    right: 0;
    width: 400px;
    height: calc(100vh - $mini-player-height);
    background-color: white;
    box-shadow: 2px -5px 5px 5px rgba(231, 231, 231, 0.865);
}
.top{
    display: flex;
    height: 40px;
    // background-color: red;
    color: gray;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    span{
        margin: 0 10px;
        cursor: pointer;
    }
}
.active{
    color: black;
}
.header{
    display: flex;
    height: 40px;
    color: gray;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 13px;
    i{
        margin-right: 5px;
    }
}
.clearsongs{
    cursor: pointer;
}
.list{
    padding: 0 5px;
    height: calc(100% - 80px);
    overflow-y: scroll;
}
.listhead{
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: gray;
}
.songtitle{
    flex: 1 1 40%;
}
.author{
    flex: 1 1 40%;
}
.time{
    flex: 1 1 20%;
}
.songitem{
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: gray;
    cursor: pointer;
    &:hover{
        background-color: $menu-blackgroundcolor-active;
    } 
}
.activesong{
    color: red;
}
</style>
