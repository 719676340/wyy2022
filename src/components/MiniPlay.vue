<template>
  <div class='minipaly' v-if="music.currentSong">
      <div class="left" :class="{'left-show':!music.currentSong.id}">
          <div class="imgout" >
            <div class="imgwrap" @click="changeplayershow">
              <img :src="songimg" alt="">
              <i class="iconfont icon-xiangshang uplogo" :class="[music.isPlayerShow?'up':'down']"></i>
              <i class="iconfont icon-xiangxia downlogo" :class="[music.isPlayerShow?'down':'up']"></i>
              <div class="box"></div>
            </div>
          </div>
          <div class="info">
              <div class="title">
                  <span class="name">{{music.currentSong.name}}--</span>
                  <span class="author" v-for="(item,index) in music.currentSong.ar?music.currentSong.ar.slice(0,Math.min(music.currentSong.ar.length,2)):[]" :key="item.id" >{{item.name}}<span v-if="index!=music.currentSong.ar.length-1">/</span></span>
                  <span v-if="music.currentSong.ar&&music.currentSong.ar.length>2">...</span>
              </div>
              <div class="time">
                  <span>{{secdtomins(songdurationtime*songvalue/100)}}/{{secdtomins(songdurationtime)}}</span>
              </div>
          </div>
      </div>
      <div class="mid">
        <i class="iconfont icon-shangyishou prevlogo" @click="prev"></i>
        <i class="iconfont icon-bofang playlogo" :class="{'graylogo':showgray}" v-if="!music.playing" @click="togglePlaying"></i> 
        <i class="iconfont icon-zanting playlogo" :class="{'graylogo':showgray}" v-else @click="togglePlaying"></i>
        <i class="iconfont icon-xiayishou nextlogo" @click="next"></i>
      </div>
      <div class="right">
        <i class="iconfont  playtype" :class="playmode" @click="changeplaytype"></i>
        <i class="iconfont icon-yinleliebiao list" @click="changePlaylistShow"></i>
        <div class="sound">
            <i class="iconfont icon-yinliang soundlogo" @click="soundvalue=0" v-if="soundvalue!=0"></i>
            <i class="iconfont icon-shengyinjingyin soundlogo" v-else></i>
            <el-slider class="slider" v-model="soundvalue"/>
        </div>
      </div>
      <div class="topslider">
          <el-slider class="songslider" size="small" v-model="songvalue" :show-tooltip="false" @change="songtimechange($event)"/>
      </div>
      <audio
        :src="currentSongUrl"
        @canplay="ready"
        @ended="end"
        @timeupdate="updateTime"
        ref="audio"
      >
      </audio>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import {getSongDetail,getSonglist} from '../api/index.js'
import {useMusicStore} from '../stores/music'
import {getsongimg} from '../utils/index'
var audio=ref(null)
const music=useMusicStore()
// var id=33894312
var songReady=ref(false)

var soundvalue=ref(Number(window.localStorage.getItem('soundvalue'))||50)
var songvalue=ref(0)
var songimg=ref('')
// 歌曲信息
var songdurationtime=computed(()=>{
    return Math.floor(music.currentSong.dt/1000)
})
function secdtomins(secd){
    let left=Math.floor(secd/60)
    let right=Math.floor(secd%60)
    return left+':'+right
}
// console.log(music.currentSong.id,music.currentSong.al.id)
// var songimg=computed(()=>{
//     console.log(music.currentSong.id,music.currentSong.al.id)
//     return music.currentSong.id,music.currentSong.al.id
// })


// 按钮操作
function changeplayershow(){
    music.setPlayerShow(!music.isPlayerShow)
}
function togglePlaying(){
    if(!music.currentSong.id){
        return
    }
    music.setPlaying(!music.playing)
}
watch(()=>music.playing,(newplaying)=>{
    nextTick(()=>{
        newplaying?play():pause()
    })
})
watch(()=>music.currentSong.id,async ()=>{
    console.log(music.currentSong.id,music.currentSong.al.id)
    songReady.value=false
    let url
    await getsongimg(music.currentSong.id,music.currentSong.al.id).then((res)=>{
        url=res
    })
    songimg.value=url+'?param=400y400'
    music.setcurrentSongimg(songimg.value)
    insethistorylist(music.currentSong)
})
var showgray=computed(()=>{
    return [1,4].indexOf(music.currentSong.fee)!=-1
})
function insethistorylist(song){
    let arr=JSON.parse(localStorage.getItem('historylist'))
    let index=arr.findIndex((Element)=>{
        return Element.id==song.id
    })
    if(index!=-1){
        arr.splice(index,1)
    }
    arr.unshift(song)
    localStorage.setItem('historylist',JSON.stringify(arr))
}


// 这个主要侧重于前后播放的时候能够连续播放的情形
watch(()=>songReady.value,(newplaying)=>{
    if(newplaying&&music.playing){
        play()
    }
})
// audio.value.volume=0.2  直接调用这个api控制播放器的音量大小
watch(()=>soundvalue.value,(newVal)=>{
    audio.value.volume=newVal/100
    localStorage.setItem('soundvalue',newVal)   
})
// 根据进度条改歌曲进度的
function songtimechange(val){
    audio.value.currentTime=(music.currentSong.dt/1000)*val/100
}
function next(){
    // 切换歌曲的时候都需要重新检测歌曲的播放状态
    if(music.playlist.length!=0){
        songReady.value=false
        music.setCurrentSong(music.nextsong)
    }

}
function prev(){
    // 切换歌曲的时候都需要重新检测歌曲的播放状态
    if(music.playlist.length!=0){
        songReady.value=false
        music.setCurrentSong(music.prevsong)
    }

}
function changeplaytype(){
    let map=['sequence','loop','random']
    console.log(music.playMode) 
    let index=map.findIndex((Element)=>{
        return Element==music.playMode
    })+1
    if(index>=map.length){
        index=0
    }
    music.setplayMode(map[index])
}
// :class="playmode"
var playmode=computed(()=>{
    var map={
        'sequence':'icon-shunxubofang',
        'loop':'icon-danquxunhuan',
        'random':'icon-24gl-shuffle'
    }
    return map[music.playMode]
})
function changePlaylistShow(){
    music.setPlaylistShow(!music.isPlaylistShow)
}
// audio的操作 通过id拿歌曲的url
var currentSongUrl=computed(()=>{
    return 'https://music.163.com/song/media/outer/url?id='+music.currentSong.id+'.mp3'
})
function ready(){
    songReady.value = true
}
function pause(){
    audio.value.pause()
}
async function play(){
    if(songReady.value){
        try{
            await audio.value.play()
            audio.value.volume=0.2
        }catch(err){
            music.setPlaying(false)
        }
    }
}
// 返回dt是1000的倍数了
function updateTime(e){
    let time=e.target.currentTime
    songvalue.value=Math.min(time*1000/music.currentSong.dt, 1)*100
    music.setcurrentTime(songdurationtime.value*songvalue.value/100)
}
function end(){
    next()
}

function initsonglist(){
    getSonglist(6452,10).then((res)=>{
        music.addplaylist(res.songs)
        music.setCurrentSong(res.songs[0])
        // console.log(music.currentSong.id,music.currentSong.al.id)
    })
}
function initenv(){
    // console.log(soundvalue.value,window.localStorage.getItem('soundvalue'))
    // soundvalue.value=window.localStorage.getItem('soundvalue')
    // console.log(soundvalue.value,window.localStorage.getItem('soundvalue'))
    audio.value.volume=soundvalue.value/100
}
onMounted(()=>{
    // initsonglist()
    initenv()
})
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.minipaly{
    // min-width: $layout-content-min-width;
    position: relative;
    // overflow-x: hidden;
    display: flex;
    height: $mini-player-height;
    left: 0;
    width: 100%;
    z-index: $mini-player-zindex;
    background-color: white;
    // bottom: $mini-player-height;
    bottom: 0;
}
.left{
    flex:1 0 250px;
    display: flex;
    align-items: center;
    padding-left: 10px;
}
.left-show{
    visibility: hidden;
}
.imgout{
    width: 45px;
}
.imgwrap{
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    cursor: pointer;
    img{
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.uplogo{
    z-index: 10;
    position: absolute;
    color: white;
    font-size: 25px;
    top: 50%;
    left: 50%;
    // transform:translateX(-50%) translateY(-20%);
    
}
.downlogo{
    z-index: 10;
    position: absolute;
    color: white;
    font-size: 25px;
    top: 50%;
    left: 50%;
    // transform:translateX(-50%) translateY(-80%)
    
}
.up{
    transform:translateX(-50%) translateY(-80%);
}
.down{
    transform:translateX(-50%) translateY(-20%)
}

.box{
    position: absolute;
    background-color: black;
    opacity: 0.5;
    top: 0;
    left: 0;    
    width: 100%;
    height: 100%;
}
.info{
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
    color: gray;
}
.title{
    margin-bottom: 5px;
    flex: 0 0 100%;
    display: flex;
    font-size: 10px;
    align-items: center;
}
.time{
    flex: 0 0 100%;
    font-size: 10px;
    display: flex;
    align-items: center;
}
.mid{
    flex: 5 0 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.prevlogo,.nextlogo{
    color: red;
    font-size: 30px;
    cursor: pointer;
}
.playlogo{
    margin: 0 10px;
    color: red;
    font-size: 50px;   
    cursor: pointer; 
}
.graylogo{
    color:gray
}
.right{
    flex:1 0 250px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.playtype,.list{
    font-size: 20px;
    color: gray;
    cursor: pointer;
    margin: 0 10px;
}
.sound{
    flex: 1 1 200px;
    // width: 300px;
    display: flex;
    padding-right: 50px;
    align-items: center;
    flex-wrap: nowrap;
    .soundlogo{
        color: gray;
        cursor: pointer;
        font-size: 20px;
        flex: 0 0 30px;
    }
    .slider{

    }
}
.topslider{
    position: absolute;
    z-index: 1001;
    top: -12px;
    left: 0;
    width: 98%;
}
</style>
