<template>
  <div class='player' :class="[music.isPlayerShow?'':'hiden']" v-if="music.currentSong">
      <div class="content">
          <div class="left">  
              <img class="play-bar-support" src="../assets/圆柱头.png" alt="">
              <img class="play-bar" :class="{'play-bar-active':music.playing}" src="../assets/唱片杆.png" alt="">
              <div class="imgout-stay">
                  <div class="imgout-warp">
                      <!-- 这里有一点问题，暂停之后图片转圈是不会归回原位这个后续再解决了 -->
                      <div class="imgwarpout" :class="{'mgwarpout-rotate':music.playing}">
                        <div class="imgwarp">
                            <img :src="music.currentSongimg" alt="">
                        </div>
                      </div>

                  </div>
              </div>
          </div>
          <div class="right">
              <div class="songinfo">
                  <div class="title">
                      <span>{{music.currentSong.name}}</span>
                  </div>
                  <div class="author">
                      <span>歌手：</span>
                      <!-- <span class="name">陈奕迅</span> -->
                        <span class="name" v-for="(item,index) in music.currentSong.ar?music.currentSong.ar.slice(0,Math.min(music.currentSong.ar.length,2)):[]" :key="item.id" >{{item.name}}<span v-if="index!=music.currentSong.ar.length-1">/</span></span>
                        <span v-if="music.currentSong.ar&&music.currentSong.ar.length>2">...</span>
                  </div>
              </div>
              <div class="words">
                  <el-scrollbar class="lyric-wrap" ref="scrollbarRef" height="400px" @scroll="scroll">
                    <div ref="innerRef">
                        <div class="lyric-item" :class="{'lyric-active':index==currenindex-1}" v-for="(item, index) in wordslist" :key="index">
                            <p>{{item.str}}</p>
                        </div>  
                    </div>
                  </el-scrollbar>
              </div>
          </div>
      </div>  
  </div>
</template>

<script setup>
// https://blog.csdn.net/m0_45309753/article/details/116602843?spm=1001.2014.3001.5502
// https://blog.csdn.net/m0_45309753/article/details/116703772
// https://blog.csdn.net/weixin_44200288/article/details/106260705

import { onMounted, reactive, ref, watch } from 'vue';
import {getLyric} from '../api/index'
import {useMusicStore} from '../stores/music'
// https://netease-cloud-music-api-crete722p-hannah-bingo.vercel.app/

var wordsstr=ref('')
var wordslist=reactive([])
const music=useMusicStore()

function words(){
    // music.currentSong.id
    console.log(music.currentSong.id,1)
    getLyric(music.currentSong.id).then((res)=>{
        wordsstr.value=res.lrc.lyric
    }).then(()=>{
        initwords()
    }).catch((err)=>{
        console.log(err)
    })
}
function initwords(){
    wordslist.splice(0,wordslist.length)
    let arr=wordsstr.value.split('\n')
    for(let item of arr){
        // 这个用来筛部分不和规格的数组元素。
        if(item.length<5){
            continue
        }
        wordslist.push(change(item))
    }
    wordslist.sort((a,b)=>{
        return a.time-b.time
    })   
}
function change(str){
    let obj={}
    let arr=str.split(']')
    let [mins,secd]=arr[0].slice(1).split(':')
    let time=Number(secd)+Number(mins)*60
    obj.time=time
    obj.str=arr[1]
    return obj
}

// 滚动歌词的内容
var scrollbarRef=ref(null)
var innerRef=ref(null)
var currenindex=ref(0)

watch(()=>music.currentTime,()=>{
    currenindex.value=wordslist.findIndex((Element)=>{
        return Element.time>music.currentTime
    })
    // console.log(scrollbarRef.value.height)
    scrollbarRef.value.setScrollTop(-200+(currenindex.value-1)*32)
})
watch(()=>music.currentSong,()=>{
    words()
})
const scroll = ({ scrollTop }) => {
  console.log(scrollTop)
}


onMounted(()=>{
    // words()
    // initwords()
})

</script>

<style lang="scss" scoped>
@import '../style/variables.scss';
.player{
    position: fixed;
    display: flex;
    top: $header-height;
    left: 0;
    right: 0;
    padding: 0 45px;
    bottom: $mini-player-height;
    z-index: $player-zindex;
    background-color: $header-bgcolor;
    justify-content: center;
    min-width: 1000px;
    transition: all 0.3s;
    &.hiden{
        transform: translateY(110%);
    }
    &.show{
        transform: translateY(105%);
    }
}
.content{
    display: flex;
    min-width: 1000px;
    flex: 0 1 50%;
    height: 100%;
    // background-color: wheat;
}
.left{
    flex: 1 1 50%;
    position: relative;
    display: flex;
    height: 600px;
    align-items: center;
    overflow: hidden;
    padding-left: 40px;
}
.play-bar-support{
    position: absolute;
    top: -16px;
    left: 50%;
    width: 32px;
    height: 32px;
    z-index: 10;
    transform: translateX(-200%);
}
.play-bar{
    position: absolute;
    top: 0px;
    left: 40%;
    width: 170px;
    height: 190px;
    z-index: 5;
    transform-origin: top left;
    transform: rotate(-20deg);
    transition: all 0.3s;
    // &:hover{
    //     transform: rotate(15deg);
    // }    
}
.play-bar-active{
    transform: rotate(15deg);
}
.imgout-stay{
    position: relative;
    width: 350px;
    height: 350px;
    background-color: gray;
    border-radius: 50%;
}
.imgout-warp{   
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    width: 320px;
    height: 320px;
    transform: translate(-50%,-50%);
    background-color: black;
    border-radius: 50%; 
    
}
.imgwarpout{
    width: 220px;
    height: 220px;
    // animation: ro 10s linear infinite;
}
.mgwarpout-rotate{
    animation: ro 10s linear infinite;
}
.imgwarp{
    position: relative;
    width: 100%;
    padding-top: 100%;
    border-radius: 50%; 
    overflow: hidden;
    img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.right{
    flex: 1 1 50%;
    padding-top: 50px;
}
.songinfo{
    margin-bottom: 20px;
}
.title{
    font-size: 30px;
    margin-bottom: 30px;
}
.name{
    color: rgb(0, 145, 255);
}
.words{
    height: 400px;
}
.lyric-wrap{
}
.lyric-item{
    margin-bottom: 16px;
    color: gray;
}
.lyric-active{
    margin:20px 0;
    color: black;
    font-size: 25px;
}
@keyframes ro{
    to {transform:rotate(360deg);}
}
</style>
