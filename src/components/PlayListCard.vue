<template>
  <div class='playlistcard'>
    <div class="imgwrap">
      <img v-lazy="props.picUrl" alt="">
      <div class="desc">
        <span class="title">热门推荐</span>
      </div>
      <i class="iconfont icon-bofang playlogo"></i>
    </div>
    <div class="name">
      <span>{{props.name}}</span>
    </div>
  </div>
</template>

<script setup>
// var url='https://s1.ax1x.com/2022/05/04/OVP0Nq.png'
var props=defineProps(['name','picUrl','id','playCount','trackNumberUpdateTime'])
</script>
<style lang="scss" scoped>
.playlistcard{
    position: relative;
    width: calc(20% - 8px);
    margin: 4px;
    margin-bottom: 32px;
    cursor: pointer;
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
  &:hover{
    .desc{
      transform: translateY(0);
    }
    .playlogo{
      opacity: 0.5;
    }
  }
}
.desc{
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  padding-left: 5px;
  transform: translateY(-100%);
  background-color: rgba(128, 128, 128, 0.5);
  color: white;
  top:0;
  left: 0;
  transition: all 0.3s;
}
.playlogo{
  position: absolute;
  background-color: white;
  opacity: 0;
  border-radius: 50%;
  color: red;
  font-size: 40px;
  bottom:2px;
  right: 2px;
  transition: all 0.3s;
}
.name{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  margin-top: 10px;
}
</style>
