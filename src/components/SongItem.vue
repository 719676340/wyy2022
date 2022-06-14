<template>
  <div class='songitem' v-if="song" @click="changecurrentsong">
      <div class="songnum">
          <span>{{props.Num}}</span>
      </div>
      <div class="wrap">
        <div class="imgwrap">
            <img v-lazy="props.album.picUrl" alt="">
            <i class="iconfont icon-bofang play"></i>
        </div>
      </div>
      <div class="title" :class="{'title-active':(music.currentSong.id==song.id)}">
          <span>{{song.name}}</span>
          <div class="logo" v-show="song.mv!=0"><i class="iconfont icon-bofang playlogo"></i></div>
      </div>
      <div class="author">
        <span v-for="(item,index) in song.ar?song.ar.slice(0,Math.min(song.ar.length,2)):[]" :key="item.id" >{{item.name}}<span v-if="index!=song.ar.length-1">/</span></span>
        <span v-if="song.ar&&song.ar.length>2">...</span>
      </div>
      <div class="name">
          <span>{{song.al.name}}</span>
      </div>
      <div class="time">
          <span>{{secdtomins(song.dt/1000)}}</span>
      </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getSongDetail } from '../api';
import { useMusicStore } from '../stores/music';
const music=useMusicStore()
var props=defineProps(['Num','album','id',])
var song=ref(undefined)

function initsong(){
    getSongDetail(props.id).then((res)=>{
        song.value=res.songs[0]
    })
}

// var songdurationtime=computed(()=>{
//     return Math.floor(music.currentSong.dt/1000)
// })
function secdtomins(secd){
    let left=Math.floor(secd/60)>9?Math.floor(secd/60)+'':'0'+Math.floor(secd/60)
    let right=Math.floor(secd%60)>9?Math.floor(secd%60)+'':'0'+Math.floor(secd%60)
    return left+':'+right
}
function changecurrentsong(){
  let index=music.SongIndex(song.value.id)
  music.setPlaying(true)
  console.log(index)
  if(index==-1){
    music.addplaylist([song.value])
  }else{
    music.setCurrentSong(music.playlist[index])
  }
}

onMounted(()=>{
    initsong()
})
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.songitem{
    display: flex;
    height:80px;
    width: 100%;
    color: gray;
    padding: 5px;
    &:hover{
        background-color: $menu-blackgroundcolor-active;
    }
}
.songnum{
    flex: 0 0 5%;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrap{
    flex: 0 0 80px;
    // padding: 5px;
}
.imgwrap{
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 5px;
    img{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
    }
}
.play{
  position: absolute;
  background-color: white;
  opacity: 0.5;
  border-radius: 50%;
  color: red;
  font-size: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    cursor: pointer;
}
.title,.author,.name{
    flex: 1 1 25%;
    // color: gray;
    display: flex;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
}
.title-active{
    color:red;
}
.logo{
    padding-left: 5px;
    cursor: pointer;
}
.playlogo{
    color: red;
    font-size: 20px;
}
.time{
    flex: 0 0 5%;
    // color: gray;
    display: flex;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
}
</style>
