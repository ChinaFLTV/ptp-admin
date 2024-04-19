<template>

  <!--  2024-1-16  22:33-不可见组件  -->
  <el-dialog style="border-radius: 20px" width="25%" title="联系我们" draggable center close-on-press-escape
             append-to-body>

    <div class="contact-us-dialog-container">

      <el-text type="primary">欢迎添加达哥QQ，与达哥一起探索编程世界！</el-text>
      <el-image style="width:300px" :src="qq_qrcode" alt="达哥QQ二维码"/>

    </div>

  </el-dialog>

</template>


<script setup lang="ts">

import qq_qrcode from "@/assets/image/qq_qrcode.jpg";
</script>


<style scoped lang="scss">

.contact-us-dialog-container {

  display: flex;
  flex-direction: column;
  align-items: center;

}

</style>
