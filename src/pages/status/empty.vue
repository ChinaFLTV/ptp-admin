<template>

    <div class="emptyContainer">

        <el-image class="emptyLogo" src="/src/assets/image/content_empty.png" fit="contain"/>
        <h1 class="emptyTips">空空如也~_~</h1>

    </div>

</template>


<script setup lang="ts">

</script>


<style scoped lang="scss">

.emptyContainer {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .emptyLogo {

    width: 400px;
    height: 400px;

  }

  .emptyTips {

    font-weight: bolder;
    margin-top: 3rem;
    letter-spacing: 1rem;

  }

}

</style>
