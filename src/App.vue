<template>
  <div class="app">
    <layout></layout>
    <MiniPlay></MiniPlay>
    <Player></Player>
    <PlayList v-if="music.isPlaylistShow"></PlayList>
  </div>
  <!-- <RouterView /> -->
</template>
<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import layout from './components/layout/IndexComp.vue'
import MiniPlay from './components/MiniPlay.vue';
import PlayList from './components/PlayList.vue';
import Player from './components/PlayerItem.vue';
import {useMusicStore} from './stores/music'
import { onMounted } from 'vue';
const music=useMusicStore()
</script>
<style lang="scss">
@import './style/variables.scss';
.app{
  height: 100%;
  overflow-y: unset;
}
</style>
