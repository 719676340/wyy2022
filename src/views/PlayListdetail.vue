<template>
  <div class='playlistdetail' v-if="listdetail.length!=0">
    <div class="header">
        <div class="headerleft">
            <div class="imgwrap">
                <img :src="listdetail[0].coverImgUrl" alt="">
            </div>
        </div>
        <div class="headerright">
            <div class="listname">
                <span>{{listdetail[0].name}}</span>
            </div>
            <div class="authorinfo">
                <div class="ahthorheader">
                    <div class="imgwrap headlogo">
                        <img :src="listdetail[0].creator.avatarUrl" alt="">
                    </div>
                </div>
                <span class="authorname">{{listdetail[0].creator.nickname}}</span>
                <span class="maketime">{{createtime}}</span>
            </div>
            <div class="playall" @click="addallsongs()">
                <el-button type="danger" round>播放全部</el-button>
            </div>
            <div class="tags">
                <span>标签:</span>
                <el-tag class="tagitem" type="info" v-for="(item) in listdetail[0].tags" :key="item">{{item}}</el-tag>
            </div>
            <div class="decs">
                <span class="songnum">歌曲：{{listnum}}</span>
                <span class="playnum">播放：{{playcount}}万</span>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="listtype">
            <div class="typeitem">
                <span>歌曲列表</span>
                <div class="redline"></div>
            </div>
        </div>
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
                <div class="songitem" v-for="(item, index) in songlist" :key="index" @click="changecurrentsong(item.id)">
                  <div class="id">
                      <span>{{index+1}}</span>
                  </div>
                  <div class="songtitle" :class="{'title-active':(music.currentSong.id==item.id)}">
                      <span>{{item.name}}</span>
                  </div>
                  <div class="author">
                      <!-- 写到这里了 -->
                        <span v-for="(singer,index) in item.ar?item.ar.slice(0,Math.min(item.ar.length,2)):[]" :key="singer.id" >{{singer.name}}<span v-if="index!=item.ar.length-1">/</span></span>
                        <span v-if="item.ar&&item.ar.length>2">...</span>
                      <!-- <span>刘大拿{{}}</span> -->
                  </div>
                  <div class="album">
                      <span>{{item.al.name}}</span>
                  </div>
                  <div class="time">
                      <span>{{secdtomins(item.dt/1000)}}</span>
                  </div>                  
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref ,reactive,computed, watch} from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getlistsongs ,getSongDetail,getlistdetail} from '../api';
import { useMusicStore } from '../stores/music';
import dayjs from 'dayjs'

const route=useRoute()
const music=useMusicStore()

var id=ref(route.params.id)
watch(()=>route.params.id,()=>{
    id.value=route.params.id
    getlist()
})
// var url='https://s1.ax1x.com/2022/05/06/OKU3QA.png'
var listdetail=reactive([])
var songlist=reactive([])
var listnum=computed(()=>{
    return songlist.length
})
var createtime=computed(()=>{
    return dayjs(listdetail[0].createTime).format('YYYY-MM-DD');
})
var playcount=computed(()=>{
    return Math.ceil(listdetail[0].playCount/10000)
})
function getlist(){
    songlist.splice(0,songlist.length)
    listdetail.splice(0,listdetail.length)
    getlistsongs(id.value).then((res)=>{
        console.log(res)
        songlist.push(...res.songs)
    })
    // 获取歌单的相关描述
    getlistdetail(id.value).then((res)=>{
        console.log(res,111)
        listdetail.push(res.playlist)
        // songlist.push(...res.songs)
    })
}
function secdtomins(secd){
    let left=Math.floor(secd/60)>9?Math.floor(secd/60)+'':'0'+Math.floor(secd/60)
    let right=Math.floor(secd%60)>9?Math.floor(secd%60)+'':'0'+Math.floor(secd%60)
    return left+':'+right
}
function changecurrentsong(id){
  let index=music.SongIndex(id)
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
function addallsongs(){
    music.addplaylist(songlist)
    changecurrentsong(songlist[0].id)
}
onMounted(()=>{
    getlist()
})
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.playlistdetail{
    padding-top: 20px;
}
.header{
    display: flex;
    flex-wrap: nowrap;
    height: 300px;
}
.headerleft{
    width: 300px;
}
.headerright{
    padding-left: 20px;
}
.imgwrap{
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    img{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
}
.listname{
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 25px;
}
.authorinfo{
    display: flex;
    flex-wrap: nowrap;
    color: gray;
    align-items: center;
}
.authorname{
    margin: 0 10px;
}
.ahthorheader{
    width: 50px;
    height: 50px;
}
.headlogo{
    border-radius: 50%;
}
.playall{
    margin: 15px 0;
}
.tags,.decs{
    margin: 5px 0;
}
.tagitem{
    margin-left: 10px;
}
.playnum{
    margin-left: 5px;
}
.content{
    margin-top: 20px;
}
.listtype{
    height: 30px;
    font-size: 20px;
    span{
        font-weight: bold;
    }
}
.typeitem{
    display: flex;
    display: inline-block;
    align-items: center;
    position: relative;
    clear: both;
}
.redline{
    position: absolute;
    width: 80%;
    height: 4px;
    border-radius: 5px;
    background-color: red;
    left: 50%;
    transform: translateX(-50%);
    bottom: -5px;
}
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
    color: gray;
    &:hover{
        color: black;
        background-color: $menu-blackgroundcolor-active;
    } 
}
.songitem:nth-child(even){
    background-color: $playlist-blackgroundcolor;
    &:hover{
        background-color: $menu-blackgroundcolor-active;
    } 
}
.title-active{
    color:red;
}
</style>
