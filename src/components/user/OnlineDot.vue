<template>

  <div class="online-dot-container">

    <!--  2024-8-15 17:58-默认插槽(一般是插件等组件)  -->
    <slot></slot>
    <div :class="['dot',props.online?'online':'offline']"></div>

  </div>

</template>


<script setup lang="ts">


const props = defineProps({

  online: {

    type: Boolean,
    default: () => false

  }

});

</script>


<style scoped lang="scss">

.online-dot-container {

  position: relative;

  .dot {

    $dot-size: 8px;

    position: absolute;
    width: $dot-size !important;
    height: $dot-size !important;
    border-radius: 50%;
    bottom: calc(#{$dot-size} / 2);
    right: 0;

  }


  .online {

    background-color: var(--el-color-success);

  }

  .offline {

    background-color: transparent;

  }

}

</style>
