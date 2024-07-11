<template>

  <div ref="waveArea" class="container">

    <div ref="waveElement" class="waveElement">
      <slot>
        <span>{{ $t("common.emptyContent") }}</span>
      </slot>
    </div>

  </div>

</template>


<script setup lang="ts">

import {Ref} from "vue";


const props = defineProps({

  multiple: {

    type: Number,
    required: false,
    default: 10

  }

});

const waveArea: Ref<HTMLDivElement> = ref(null);
const waveElement: Ref<HTMLDivElement> = ref(null);


function wave(mouseX: number, mouseY: number) {

  const rectangle: DOMRect = waveElement.value.getBoundingClientRect();
  const dx: number = -(mouseY - rectangle.y - rectangle.height / 2) / props.multiple;
  const dy: number = (mouseX - rectangle.x - rectangle.width / 2) / props.multiple;

  waveElement.value.style.transform = `rotateX(${dx}deg) rotateY(${dy}deg)`;

}

onMounted(() => {

  waveArea.value.addEventListener("mousemove", (e: MouseEvent) => {

    window.requestAnimationFrame(() => {

      wave(e.clientX, e.clientY);

    });

  });

  waveArea.value.addEventListener("mouseleave", () => {

    waveElement.value.style.transform = "rotateX(0deg) rotateY(0deg)";

  });

});

</script>


<style scoped lang="scss">

.container {

  display: flex;
  justify-content: center;
  align-items: center;

  .waveElement {

    transition: all .1s;

  }

}

</style>
