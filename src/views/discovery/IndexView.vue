<template>
  <div class='discovery'>
    <bannerView></bannerView>
    <PlayList></PlayList>
    <NewSongs></NewSongs>
    <NewMvs></NewMvs>
  </div>
</template>

<script setup>
import bannerView from './bannerView.vue';
import PlayList from './PlayList.vue';
import NewSongs from './NewSongs.vue';
import NewMvs from './NewMvs.vue';
</script>
<style lang="scss" scoped>
.discovery{
  padding: 18px 32px;
  // background-color: red;
}
</style>
