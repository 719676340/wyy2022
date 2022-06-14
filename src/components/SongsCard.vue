<template>
  <div class='songscard' @click="changecurrentsong">
    <div class="number"><span>{{props.Number}}</span></div>
    <div class="imgwrap">
      <img v-lazy="props.picUrl" alt="">
      <i class="iconfont icon-bofang playlogo"></i>
    </div>
    <div class="author">
      <div class="word">{{props.name}}</div>
      <div class="word">{{props.song.artists[0].name}}</div>
    </div>
  </div>
</template>

<script setup>
import { useMusicStore } from '../stores/music';
import { getSongDetail } from '../api';
var props=defineProps(['id','name','picUrl','song','Number'])
const music=useMusicStore()
function changecurrentsong(){
  let index=music.SongIndex(props.song.id)
  if(index==-1){
    getSongDetail(props.song.id).then((res)=>{
      console.log(res.songs[0])
      music.addplaylist([res.songs[0]])
    })
  }else{
    music.setCurrentSong(music.playlist[index])
  }
  music.setPlaying(true)
} 
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.songscard{
  display: flex;
  padding: 8px;
  cursor: pointer;
  &:hover{
    background-color: $menu-blackgroundcolor-active;
  }
}
.number{
  display: flex;
  align-items: center;
  width: 30px;
  margin-right: 8px;
}
.imgwrap{
  position: relative;
  width: 60px;
  padding-top: 60px;
  overflow: hidden;
  img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .playlogo{
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 20px;
    background-color: white;
    opacity: 0.5;
    color: red;
    border-radius: 50%;
    transform: translate(-50%,-50%);
  }
}
.author{
  margin-left: 8px;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  .word{
    display: flex;
    flex: 1 1 100%;
    align-items: center;
  }
}
</style>
