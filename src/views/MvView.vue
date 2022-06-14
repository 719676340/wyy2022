<template>
  <div class='MVview' v-if="mv&&info">
      <div class="left">
          <div class="recommend">
              <span>MV详情</span>
          </div>
          <div class="videoplay">
              <vue3VideoPlay v-bind="mvurl"/>
          </div>
          <div class="author">
              <div class="imgcontent">
                <div class="imgwrap">
                    <img :src="info.artist.cover" alt="">
                </div>

              </div>
                <div class="name">
                    <span>{{info.artist.name}}</span>
                </div>
          </div>
          <div class="titlewrap">
              <div class="title">
                  <span>{{mv.name}}</span>
              </div>
              <div class="decs">
                  <span class="time">
                      <span>发布：{{mv.publishTime}}</span>
                  </span>
                  <span class="number">
                      播放次数：{{mv.playCount}}
                  </span>
              </div>
          </div>
      </div>
      <div class="right">
          <div class="recommend">
              <span>相关推荐</span>
          </div>
          <div class="MVlist">
              <MvsCardsingle v-for="(item, index) in similarmv" :key="index" v-bind="item"></MvsCardsingle>
          </div>
      </div>
  </div>
</template>

<script setup>
import MvsCardsingle from '../components/MvsCardsingle.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import {getMVdetail,getMVURL,getsingerinfo,getsimilarmvs} from '../api/index'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// https://codelife.cc/vue3-video-play/
// var url='https://s1.ax1x.com/2022/05/06/OKU3QA.png'
// 5334103
// var id=5334103
watch(()=>route.params.id,()=>{
    initmv()
})
var mv=ref(undefined)
var mvurl=reactive({
    src:''
})
var info=ref(undefined)
var similarmv=reactive([])
// 这里可以用promise.all的
function initmv(){
    let id=route.params.id
    // console.log(id)
    getMVdetail(id).then((res)=>{
            // console.log(res.data)
        mv.value=res.data
    }).then(()=>{
        getMVURL(id).then((res)=>{
            mvurl.src=res.data.url
        })
    }).then(()=>{
        getsingerinfo(mv.value.artistId).then((res)=>{
            info.value=res.data
        })
    }).then(()=>{
        similarmv.splice(0,similarmv.length)
        getsimilarmvs(mv.value.id).then((res)=>{
            similarmv.push(...res.mvs)
        })
    }).catch((err)=>{
        console.log(err)
    })
}
onMounted(()=>{
    initmv()
})
</script>
<style lang="scss" scoped>
.MVview{
    padding-top: 30px;
    display: flex;
}
.left{
    flex: 1 1;
}
.right{
    flex: 0 0 350px;
}
.recommend{
    margin-bottom: 30px;
}
.MVlist{
    display: flex;
    flex-direction: column;
}
.author{
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-bottom: 40px;
    height: 70px;
}
.imgcontent{
    width: 70px;
}
.imgwrap{
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 50%;
    img{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
}
.name{
    flex: 1 0;
    display: flex;
    font-size: 25px;
    color: gray;
    align-items: center;
    margin-left: 10px;
}
.title{
    font-size: 30px;
    color: gray;
    margin-bottom: 20px;
    span{
        font-weight: bold;
    }
}
.decs{
    color: gray;
    font-size: 14px;
    .time{
        margin-right: 30px;
    }
}
</style>
