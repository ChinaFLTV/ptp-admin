<template>

    <div class="appContainer">
        <router-view></router-view>
    </div>

</template>


<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter();

if (localStorage.getItem("user")) {

    router.push({

        name: "main"

    });

} else {

    router.push({

        name: "login"

    });

}

</script>


<style scoped lang="scss">

.appContainer {

  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;

}

</style>
