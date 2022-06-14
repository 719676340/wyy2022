<template>
  <div class=''>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in bannerlist" :key="item">
        <img class="banner-item" :src="item.imageUrl+'?param=1000y400'" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { getBanner } from '../../api';
var bannerlist=reactive([])
function initbanner(){
  bannerlist.splice(0,bannerlist.length)
  getBanner().then((res)=>{
    bannerlist.push(...res.banners)
  })
}
onMounted(()=>{
  initbanner()
})
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.banner-item{
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
