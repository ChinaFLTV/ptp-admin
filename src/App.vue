<template>

    <div class="appContainer">
        <router-view></router-view>
    </div>

</template>


<script setup lang="ts">

import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/user";

const router = useRouter();
const userDataStore = UserDataStore();

if (userDataStore.getUserData() !== null) {

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
