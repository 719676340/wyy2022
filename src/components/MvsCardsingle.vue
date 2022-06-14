<template>
  <div class='MVcard' @click="gomv">
      <div class="imgcontent">
        <div class="imgwarp">
            <img v-lazy="props.cover" alt="">
              <div class="desc">
                  <i class="iconfont icon-bofangMV"></i>
                  <span>{{props.playCount}}</span>
              </div>
              <i class="iconfont icon-bofang playlogo"></i>
        </div>
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
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
var props=defineProps(['artistName','cover','name','id','playCount'])
function gomv(){
    console.log(props.id)
    router.push('/mv/'+props.id)
}
</script>
<style lang="scss" scoped>
.MVcard{
    position: relative;
    display: flex;
    flex-wrap: wrap;
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
.imgcontent{
    width: 50%;
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
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    color: gray;
    width: 40%;
    align-items: center;
}
.name{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.author{
    width: 100%;
}
</style>
