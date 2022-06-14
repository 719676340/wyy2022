<template>
  <div class="songtable">
      <songitem v-for="(item, index) in props.list" :key="index" v-bind="item" :Num="index+1"></songitem>
  </div>
</template>

<script setup>
import songitem from './SongItem.vue';
var props=defineProps(['list'])
</script>
<style lang="scss" scoped>
.songtable{
    display: flex;
    flex-wrap: wrap;
}
</style>
