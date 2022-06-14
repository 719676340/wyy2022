<template>
  <div class='MVcard' @click="gomv">
      <div class="imgwarp">
          <img v-lazy="props.picUrl" alt="">
            <div class="desc">
                <i class="iconfont icon-bofangMV"></i>
                <span>{{props.playCount}}</span>
            </div>
            <i class="iconfont icon-bofang playlogo"></i>
      </div>
      <div class="title">
          <div class="name">
              <span>{{props.name}}</span>
          </div>
          <div class="author">
              <span>{{props.artistName}}</span>
          </div>
      </div>
  </div>
</template>

<script setup>
// var url='https://s1.ax1x.com/2022/05/04/OVP0Nq.png'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
var props=defineProps(['picUrl','name','artistName','playCount','id'])
function gomv(){
    router.push('/mv/'+props.id)
}
</script>
<style lang="scss" scoped>
.MVcard{
    position: relative;
    width: calc(25% - 24px);
    padding: 0 12px;
    margin: 0 0 36px;
    cursor: pointer;
    &:hover{
        .desc{
            transform: translateY(0);
        }
        .playlogo{
            opacity: 0.5;
        }
    }
}
.imgwarp{
    position: relative;
    width: 100%;
    padding-top: 60%;
    overflow: hidden;
    border-radius: 5px;
    img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .desc{
        position: absolute;
        color: white;
        top: 0;
        right: 10px;
        transform: translateY(-100%);
        transition: all 0.3s;
    }
    .playlogo{
        position: absolute;
        font-size: 50px;
        color: red;
        background-color: white;
        border-radius: 50%;
        opacity: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        transition: all 0.3s;
    }
}
.title{

}
.name{
    margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author{
    margin-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
