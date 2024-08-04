<template>

  <div class="appContainer">
    <router-view></router-view>
  </div>

</template>


<script setup lang="ts">

import {useRouter} from "vue-router";
import {UserDataStore} from "@/store/modules/user";
import LwFireworks from "lw_firewords";
import {querySingleAnnouncement} from "@/api/content/announcement";
import {useCookie} from "@/hooks/web/useCookie";
import {login} from "@/api/content/user/login";

const router = useRouter();
const userDataStore = UserDataStore();

// 2024-4-19  11:07-重新放置烟花初始化代码于此处,避免直接登入后烟花效果消失的BUG
// 2024-2-8  15:02-初始化鼠标点击出现烟花的效果的开源库
const lw_f = new LwFireworks();//创建实例
lw_f.init();//启动事件

if (userDataStore.getUserData() !== null) {

  router.push({

    name: "main"

  });

} else {

  router.push({

    name: "login"

  });

}

/*useCookie().set("login_client_info", "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJwdHAtdXNlci1sb2dpbi1pbmZvIiwib2JqZWN0X2luZm8iOiJ7XCJsb2dpbkluZm9cIjp7XCJhZGRyZXNzSW5mb1wiOntcImFsdGl0dWRlXCI6NDQuMCxcImNpdHlcIjpcIuaYjOWQieWbnuaXj-iHquayu-W3nlwiLFwiY2l0eUlEXCI6XCI0OFwiLFwiY291bnRyeVwiOlwibm9uIHV0IGFtZXRcIixcImNvdW50cnlJRFwiOlwiNzJcIixcImNvdW50eVwiOlwibm9zdHJ1ZCBjb21tb2RvXCIsXCJjb3VudHlJRFwiOlwiNjRcIixcImRldGFpbGVkTG9jYXRpb25cIjpcImRvbG9yIHVsbGFtY28gZXVcIixcImlkXCI6MjksXCJsYXRpdHVkZVwiOjI1LjAsXCJsb25naXR1ZGVcIjoxMS4wLFwicHJvdmluY2VcIjpcIuemj-W7uuecgVwiLFwicHJvdmluY2VJRFwiOlwiMjVcIn0sXCJkZXZpY2VJbmZvXCI6e1wiQUJJc1wiOltcImFkIGlkIG5vblwiXSxcIlNES1ZlcnNpb25Db2RlXCI6MzIsXCJTREtWZXJzaW9uTmFtZVwiOlwi6K-d6aKY5Y-CXCIsXCJhZGJFbmFibGVkXCI6ZmFsc2UsXCJhbmRyb2lkSURcIjpcIjgzXCIsXCJkZXZpY2VJRFwiOlwiV0VCOjU4ODYyODE5NjI0ODQyNlwiLFwiZW11bGF0b3JcIjp0cnVlLFwibWFjQWRkcmVzc1wiOlwi6ZmV6KW_55yB6KGi5bee5biCLVwiLFwibWFudWZhY3R1cmVyXCI6XCJVdFwiLFwibW9kZWxcIjpcInN1bnQgYW1ldCBjb25zZWN0ZXR1ciBjb25zZXF1YXQgZWFcIixcInJvb3RlZFwiOnRydWUsXCJ0YWJsZXRcIjpmYWxzZSxcInZlcnNpb25JSURcIjozNCxcInZlcnNpb25PSURcIjpcIjkxXCJ9LFwibmV0d29ya0luZm9cIjp7XCJpcHY0XCI6XCJpcHN1bSBwYXJpYXR1ciBkb2xvclwiLFwiaXB2NlwiOlwiZG9sb3JcIixcImlzcFwiOlwidGVtcG9yIGNvbW1vZG8gYWRpcGlzaWNpbmcgYWRcIn0sXCJ1aWRcIjo1fSxcIm5pY2tuYW1lXCI6XCLmmKXnianlj5nkuovmm7JcIixcInBhc3N3b3JkXCI6XCJcIn0iLCJpc3MiOiJJU1MiLCJpYXQiOjE3MjI2OTYxNjksImV4cCI6MTcyMzMwMDk2OSwianRpIjoicHRwLW9iamVjdC1qd3QifQ.NfMxD40ob_-chhqHqfCZ4CJ-Qyv5fWAz9CQ60b6tjRs"
    , {sameSite: "None", secure: true});*/

login()

querySingleAnnouncement(6666).then(res => {

  console.log("=========querySingleAnnouncement==========>");
  console.log(res);
  console.log("=========querySingleAnnouncement==========>");

}).catch(err => {

  console.log(err.response.data);

});


/*console.log("==================TEST================>");
deleteSingleAnnouncement(6666).then(res => {

  console.log("==============RESPONSE==============>");
  console.log(res);

}).catch(error => {

  console.log("===============ERROR===============>");
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
    // 而在node.js中是 http.ClientRequest 的实例
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    console.log("Error", error.message);
  }

});*/

</script>


<style scoped lang="scss">

.appContainer {

  height: 100vh;
  background-color: antiquewhite;

}

</style>
