<template>
  <div class='playlistcard'>
      <div class="imgwrap">
          <img v-lazy="props.coverImgUrl" alt="">
          <div class="desc">
              <span>播放量：{{props.playCount}}</span>
          </div>
          <i class="iconfont icon-bofang playlogo"></i>
      </div>
      <div class="title">
          <span>{{props.name}}</span>
      </div>
  </div>
</template>

<script setup>
var props=defineProps(['coverImgUrl','name','playCount'])
</script>
<style lang="scss" scoped>
.playlistcard{
    width: calc(20% - 10px);
    margin: 5px 5px 35px;
    position: relative;
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
  height: 30px;
  padding-left: 5px;
  transform: translateY(-100%);
  background-color: rgba(128, 128, 128, 0.5);
  color: white;
  top:0;
  left:0;
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
.title{
    margin-top: 5px;
    font-size: 15px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
