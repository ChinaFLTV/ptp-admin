<template>

  <div class="browser-container">
    <iframe ref="iframeRef" :src="url" width="100%" height="100%" style="border-radius: 10px;"></iframe>
  </div>

</template>


<script setup lang="ts">

import {Ref} from "vue";
import lazyframe from "lazyframe";


const iframeRef: Ref = ref(null);

// 2024-8-29  22:16-当前将要访问的超链接
const url: string = history.state.params.url;

onMounted(() => {

  // 2024-8-29  22:35-LazyFrame使用文档 : https://github.com/vb/lazyframe
  lazyframe(iframeRef.value, {

    debounce: 250, // 2024-8-29  22:37-在用户滚动后 update 函数应何时运行的值（以毫秒为单位）
    lazyload: true,
    autoplay: false

  });

});

</script>


<style scoped lang="scss">


@import "browser.moduule";


</style>
