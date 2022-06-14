<template>
  <div class='search'>
      <el-input
        class="searchinput"
        :prefix-icon="Search"
        @keyup.enter="entersearch()"
        @focus="focusevent()"
        @input="inputevent()"
        @blur="blurevent()"
        placeholder="搜索"
        v-model="searchkeyword"
      />
      <div class="search-panel" v-show="searchPanelShow">
        <div v-if="!pagetype">
          <div class="block">
              <p class="title">热门搜索</p>
              <div class="tags" v-if="hotarr.length">
                <el-tag class="tag" type="info" v-for="(item) in hotarr" @click="clicksearch(item.first)" :key="item">
                  {{item.first}}
                </el-tag>
              </div>
          </div>
          <div class="block">
              <p class="title">搜索历史</p>
              <div class="tags">
                <el-tag class="tag" type="info" v-for="(item) in historyarr.slice(historyarr.length-10,historyarr.length).reverse()" @click="clicksearch(item)" :key="item">
                  {{item}}
                </el-tag>
              </div>
          </div>
        </div>
        <div v-else>
          <div class="songblock">
              <p class="title">单曲</p>
              <div class="songlist">
                <div class="songitem" v-for="(item) in searchsong.slice(0,5)" :key="item" @click="changecurrentsong(item.id)">
                  <span>{{item.name}}--{{item.ar[0].name}}</span>
                </div>
              </div>
          </div>
          <div class="songblock">
              <p class="title">歌单</p>
              <div class="songlist">
                <div class="songitem" v-for="(item) in searchlist.slice(0,5)" :key="item" @click="godetail(item.id)">
                  <span>{{item.name}}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { Searchhot,Searchdetail,getSongDetail} from '../api';
import { useRouter, useRoute } from 'vue-router'
import { useMusicStore } from '../stores/music';
const music=useMusicStore()
const router = useRouter()
const route = useRoute()
const searchkeyword=ref('')
const searchPanelShow=ref(false)
const arr=['孤勇者','孤勇者孤勇者孤勇者孤勇者','孤勇者','孤勇者']
const hotarr=reactive([])
const historyarr=reactive([])
const searchsong=reactive([])
const searchlist=reactive([])

var pagetype=computed(()=>{
  return searchkeyword.value!=''
})
function focusevent(){
  searchPanelShow.value=true
}
function blurevent(){
  // 这个的目的是当点击
  setTimeout(()=>{
    searchPanelShow.value=false
  },500)
}
function inputevent(){
  console.log('inputevent')
}
function clicksearch(name){
  console.log(name)
  router.push('/search/'+name+'/songs')
  let arr=JSON.parse(localStorage.getItem('searchhistory'))
  let itemindex=arr.findIndex((Element)=>{return Element==name})
  if(itemindex==-1){
    arr.push(name)
  }else{
    arr.splice(itemindex,1)
    arr.push(name)
  }
  console.log(arr)
  localStorage.setItem('searchhistory',JSON.stringify(arr))
  
}
function entersearch(){
  let name=searchkeyword.value
  console.log(name)
  router.push('/search/'+name+'/songs')
  let arr=JSON.parse(localStorage.getItem('searchhistory'))
  let itemindex=arr.findIndex((Element)=>{return Element==name})
  if(itemindex==-1){
    arr.push(name)
  }else{
    arr.splice(itemindex,1)
    arr.push(name)
  }
  console.log(arr)
  localStorage.setItem('searchhistory',JSON.stringify(arr)) 
}
function inithot(){
  hotarr.splice(0,hotarr.length)
  Searchhot().then((res)=>{
    hotarr.push(...res.result.hots)
  }).catch((err)=>{
    console.log(err)
  })
}
function initlocal(){
  let history=localStorage.getItem('searchhistory')
  historyarr.splice(0,historyarr.length,...JSON.parse(history))
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



watch(()=>searchkeyword.value,()=>{
  searchsong.splice(0,searchsong.length)
  searchlist.splice(0,searchlist.length)
  Searchdetail(searchkeyword.value,1).then((res)=>{
    // console.log(res)
    searchsong.push(...res.result.songs)
  })
  Searchdetail(searchkeyword.value,1000).then((res)=>{
    // console.log(res)
    searchlist.push(...res.result.playlists)
  })
})
function godetail(id){
    router.push('/playlist/'+id)
}

onMounted(()=>{
  inithot()
  initlocal()
  // localStorage.setItem('searchhistory',JSON.stringify(['爱你']))
})
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.search{
    height: 100%;
    position: relative;
    width: 150px;
    padding-right: 18px;
}
.searchinput .search-panel{
  display: block;
}
.search-panel{
    // display: none;
    z-index: 10;
    position: fixed;
    right: 0;
    top:$header-height;
    // top: 50px;
    width: 300px;
    // background-color: red;
    height: calc(100% - $header-height - $mini-player-height);
    background-color: white;
    box-shadow: 2px 2px 2px 2px gray;
}
.block{
    padding: 20px 30px;
    .title{
        font-size: $header-fontsize;
    }
}
.songblock{
  padding-top: 10px;
  .title{
    font-size:10px
  }
}
.tags{
  display: flex;
  flex-wrap: wrap;
}
.tag{
  cursor: pointer;
  margin: 5px 5px 5px 0;
  :hover{
    color: black;
  }
}
.songlist{
  display: flex;
  flex-wrap: wrap;
  padding-left: 5px;
}
.songitem{
  flex: 0 0 100%;
  font-size: 8px;
  padding: 5px 10px;
  color: gray;
  cursor: pointer;
  &:hover{
    color: white;
    background-color: gray;
  }
}
</style>
