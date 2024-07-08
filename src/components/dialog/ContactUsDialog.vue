<template>

  <!--  2024-1-16  22:33-不可见组件  -->
  <el-dialog style="border-radius: 20px" width="25%" :title="t('content.contactUs.dialog.title')" draggable center
             close-on-press-escape
             append-to-body>

    <div class="contact-us-dialog-container">

      <el-text type="primary">{{ $t("content.contactUs.dialog.content")}}</el-text>
      <el-image style="width:300px" src="src/assets/image/qq_qrcode.jpg" alt="达哥QQ二维码"/>

    </div>

  </el-dialog>

</template>


<script setup lang="ts">

import {useI18n} from "vue-i18n";

const {t} = useI18n();

</script>


<style scoped lang="scss">

.contact-us-dialog-container {

  display: flex;
  flex-direction: column;
  align-items: center;

}

</style>
