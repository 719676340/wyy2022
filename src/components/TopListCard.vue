<template>
  <div class='toplistcard' v-if="listdetail.length">
      <div class="imgcontent">
        <div class="imgwarp">
            <img v-lazy="listdetail[0].coverImgUrl" alt="">
        </div>
      </div>
      <div class="desc">
          <div class="title">
              <span>{{listdetail[0].name}}</span>
          </div>
          <div class="intro">
              <span>{{listdetail[0].description}}</span>
          </div>
      </div>
      <img class="backgroundimg" :src="listdetail[0].coverImgUrl" alt="">
  </div>
</template>

<script setup>
import { onMounted,reactive} from 'vue';
import {getlistdetail} from '../api';
var url='https://s1.ax1x.com/2022/05/06/OKU3QA.png'
var props=defineProps(['id'])
var listdetail=reactive([])
function getdetail(){
    // console.log(props.id,111)
    getlistdetail(props.id).then((res)=>{
        listdetail.push(res.playlist)
    })
}
onMounted(()=>{
    getdetail()
})
</script>
<style lang="scss" scoped>
.toplistcard{
    position: relative;
    display: flex;
    padding: 20px;
    background-color: gray;
    opacity: 0.99;
    border-radius: 5px;
    height: 150px;
    overflow: hidden;
    cursor: pointer;
}
.imgcontent{
    flex-shrink: 0;
    position: relative;
    width: 150px;
}
.imgwarp{
    position: relative;
    width: 100%;
    padding-top: 100%;
    // overflow: hidden;
    img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
.backgroundimg{
    z-index: -1;
    position: absolute;
    opacity: 0.2;
    top: 0;
    left: 0;
    width: 100%;
}
.desc{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
    margin-left: 10px;
}
.title{
    font-size: 20px;
}
.intro{
    overflow: hidden;
}
</style>
