<template>

    <div class="userProfileContainer">

        <h1 class="profileTitle">用户信息</h1>
        <div style="display: flex;">
            <div class="halfProfileArea">

                <h3 class="profileKey">用户唯一ID</h3>
                <p class="profileValue">{{ userData?.id }}</p>
                <h3 class="profileKey">账号信息</h3>
                <p class="profileValue">{{ userData?.account }}</p>
                <h3 class="profileKey">密码</h3>
                <p class="profileValue" style="display: inline-block">{{ desensitize(userData?.password, "*", 0) }}</p>
                <span class="modify" @click="isShowModifyPasswordDialog = true">修改密码</span>
                <h3 class="profileKey">用户昵称</h3>
                <p class="profileValue" style="display: inline-block">{{ userData?.nickname }}</p>
                <span class="modify" @click="isShowRenameDialog = true">修改昵称</span>
                <h3 class="profileKey">注册时间</h3>
                <p class="profileValue">{{ dayjs(userData?.registerDate).format("YYYY年M月D日 HH:mm:ss") }}</p>
                <h3 class="profileKey">家庭住址</h3>
                <transition name="el-fade-in-linear">
                    <div v-show="isShowUserAddress">

                        <p class="profileValue"
                           style="margin:1rem auto; display: inline-block; color: dimgray;">{{
                            (JSON.parse(userData?.address) as string[])?.join(" ")
                            }}</p>
                        <span class="modify"
                              @click="isShowUserAddress = false;isShowModifyAddressArea = true;address = JSON.parse(userData.address) as string[]">修改地址</span>

                    </div>
                </transition>

                <transition name="el-fade-in-linear">
                    <div v-show="isShowModifyAddressArea" style="margin: 1rem auto">

                        <el-cascader
                                size="large"
                                :options="pcaTextArr" v-model="address">
                        </el-cascader>
                        <el-button @click="isShowUserAddress = true;isShowModifyAddressArea = false;"
                                   style="margin-left: 3rem">取消
                        </el-button>
                        <el-button type="primary" @click="submitModifyAddress">确定</el-button>

                    </div>
                </transition>

            </div>
            <div class="halfProfileArea">

                <h3 class="profileKey">用户头像</h3>
                <el-image class="avatar" ref="avatarRef"
                          :src="userData?.avatar" alt="用户头像" @click="previewAvatar"
                          fit="contain"/>
                <h3 class="profileKey">真实姓名</h3>
                <p class="profileValue">{{ desensitize(userData?.realname) }}</p>
                <h3 class="profileKey">性别</h3>
                <p class="profileValue">{{
                    userData?.sex === "male" ? "男" : userData.sex === "female" ? "女" : "保密"
                    }}</p>
                <h3 class="profileKey">信誉积分</h3>
                <p ref="creditRef" class="profileValue"
                   style="display:inline-block;width: auto;padding: 4px 10px 4px 10px;border-radius: 5px">
                    {{ userData?.credit }}</p>

            </div>

        </div>


        <el-dialog v-model="isShowRenameDialog" title="修改用户昵称" width="500">

            <el-input ref="newNicknameRef" v-model="newNickname" :minlength="2" :maxlength="15"
                      placeholder="请输入新的昵称" clearable
                      show-word-limit/>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="isShowRenameDialog = false">取消</el-button>
                    <el-button type="primary" @click="submitRename">确定</el-button>
                </div>
            </template>

        </el-dialog>

        <el-dialog v-model="isShowModifyPasswordDialog" title="修改密码" width="500">

            <p class="modifyPasswordLabel">旧密码:</p>
            <el-input ref="newNicknameRef" v-model="oldPassword" type="password"
                      placeholder="请输入旧密码" clearable/>
            <p class="modifyPasswordLabel">新密码:</p>
            <el-input ref="newNicknameRef" v-model="newPassword" type="password"
                      placeholder="请输入新密码" clearable/>
            <p class="modifyPasswordLabel">再次确认新密码:</p>
            <el-input ref="newNicknameRef" v-model="newPasswordAgain" type="password"
                      placeholder="请重复新密码" clearable/>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="isShowModifyPasswordDialog = false">取消</el-button>
                    <el-button type="primary" @click="submitModifyPassword">确定</el-button>
                </div>
            </template>

        </el-dialog>

    </div>

</template>


<script setup lang="ts">


import {UserDataStore} from "@/store/user";
import Administrator from "@/dao/Administrator";
import * as dayjs from "dayjs";
import {desensitize} from "@/utils/desensitization";
import {ImagePreview} from "@daxiazilong/image-preview";
import {ElMessage} from "element-plus";
import service from "@/http/service";
import {pcaTextArr} from "element-china-area-data";


const avatarRef = ref(null);
const creditRef = ref(null);
const newNicknameRef = ref(null);


const userDataStore = UserDataStore();
// 2024-2-11  10:57-能够进入当前页面，则用户一定已经登录了
const userData = ref(userDataStore.getUserData() as Administrator);
let imagePreview: ImagePreview = null as ImagePreview;
const isShowRenameDialog = ref(false);
const newNickname = ref(null as string);
const isShowModifyPasswordDialog = ref(false);
const oldPassword = ref(null as string);
const newPassword = ref(null as string);
const newPasswordAgain = ref(null as string);
// 2024-2-13  16:27-用于暂存用户的家庭住址数据
const address = ref([] as string[]);
const isShowUserAddress = ref(true);
const isShowModifyAddressArea = ref(false);


onMounted(() => {

    // 2024-2-11  22:50-根据用户信誉积分调整字体颜色
    const credit = userData.value.credit;
    if (credit >= 80) {

        creditRef.value.style.color = "#00ff00";
        creditRef.value.style.backgroundColor = "#c6ffc6";

    } else if (credit >= 60) {

        creditRef.value.style.color = "#ffff00";
        creditRef.value.style.backgroundColor = "#ffffB8";

    } else {

        creditRef.value.style.color = "#ff0000";
        creditRef.value.style.backgroundColor = "#ffa2a2";

    }

});


onUnmounted(() => {

    imagePreview?.destroy();

});


/**
 *
 * @author LiGuanda
 * @date 2024/2/12 上午 10:55:53
 * @filename Profile.vue
 * @description 用于预览头像图片
 *
 */
function previewAvatar() {

    console.log("开始预览头像图片");
    console.log(userData.value.avatar);
    imagePreview = new ImagePreview({

        imgs: [userData.value.avatar]

    });
    imagePreview.show(0);

}


/**
 *
 * @author LiGuanda
 * @date 2024/2/12 下午 12:38:46
 * @filename Profile.vue
 * @description 用于提供用户的修改昵称操作
 *
 */
function submitRename() {

    if (newNickname.value.length < 2) {

        ElMessage.error("用户昵称不能少于两个字符~");
        return;

    } else {

        isShowRenameDialog.value = false;
        // 2024-2-12  12:55-先更新云端用户数据，待云端用户数据更新完毕后再更新本地用户数据
        const oldNickname = userData.value.nickname;
        userData.value.nickname = newNickname.value;

        service.post("/manage/administrator/update/single", userData.value)
            .then(() => {

                ElMessage({

                    message: "修改昵称成功",
                    showClose: true,
                    type: "success",
                    center: true

                });
                userDataStore.updateUserData(userData.value);
                newNickname.value = "" as string;


            }).catch(err => {

            console.log(err);
            ElMessage.error("更新昵称失败");
            userData.value.nickname = oldNickname;
            userDataStore.updateUserData(userData.value);
            newNickname.value = "" as string;

        });

    }

}


/**
 *
 * @author LiGuanda
 * @date 2024/2/12 下午 9:30:38
 * @filename Profile.vue
 * @description 用于提交修改密码的操作
 *
 */
function submitModifyPassword() {

    if (oldPassword.value === "" || newPassword.value === "" || newPasswordAgain.value === "") {

        ElMessage.error("信息不完整");
        return;

    }

    if (userData.value.password !== oldPassword.value) {

        ElMessage.error("旧密码填写错误");
        return;

    }

    if (newPassword.value !== newPasswordAgain.value) {

        ElMessage.error("前后两次填写的新密码不一致");
        return;

    }

    if (oldPassword.value === newPassword.value) {

        ElMessage.error("新密码不能与旧密码相同");
        return;

    }

    userData.value.password = newPassword.value;
    service.post("/manage/administrator/update/single", userData.value)
        .then(() => {

            ElMessage({

                message: "修改密码成功",
                showClose: true,
                type: "success",
                center: true

            });
            userDataStore.updateUserData(userData.value);
            oldPassword.value = "" as string;
            newPassword.value = "" as string;
            newPasswordAgain.value = "" as string;
            isShowModifyPasswordDialog.value = false;

        }).catch(err => {

        console.log(err);
        ElMessage.error("更新密码失败");

        userData.value.password = oldPassword.value;
        oldPassword.value = "" as string;
        newPassword.value = "" as string;
        newPasswordAgain.value = "" as string;
        isShowModifyPasswordDialog.value = false;

    });

}


/**
 *
 * @author Lenovo
 * @date 2024/2/13 下午 4:58:37
 * @filename Profile.vue
 * @description 用于提交修改用户家庭住址的操作
 *
 */
function submitModifyAddress() {

    console.log(address.value);

    if (userData.value.address === JSON.stringify(address.value)) {

        ElMessage.warning("前后地址相同，无需修改~");
        return;

    }

    const oldAddress = userData.value.address;

    userData.value.address = JSON.stringify(address.value);
    service.post("/manage/administrator/update/single", userData.value)
        .then(() => {

            ElMessage({

                message: "修改地址成功",
                showClose: true,
                type: "success",
                center: true

            });
            userDataStore.updateUserData(userData.value);
            isShowUserAddress.value = true;
            isShowModifyAddressArea.value = false;

        }).catch(err => {

        console.log(err);
        ElMessage.error("更新地址失败");

        userData.value.address = oldAddress;
        userDataStore.updateUserData(userData.value);
        isShowUserAddress.value = true;
        isShowModifyAddressArea.value = false;

    });

}


</script>


<style scoped lang="scss">

.userProfileContainer {

  display: flex;
  flex-direction: column;
  background-color: white;

  > .profileTitle {

    letter-spacing: 1rem;
    color: black;
    font-weight: bolder;
    margin-top: 3rem;
    margin-left: 3rem;

  }

  .halfProfileArea {

    flex: 1;
    padding-left: 3rem;
    margin-top: 3rem;


    > .profileKey {

      font-weight: bolder;
      color: black;
      letter-spacing: 0.1rem;

    }

    > .profileValue {

      margin-top: 1rem;
      margin-bottom: 3rem;
      color: dimgray;

    }

    .modify {

      color: #1cab5b;
      margin-left: 1rem;

      &:hover {

        color: #3ac979;
        cursor: pointer;
        text-decoration: underline;

      }

    }

    .avatar {

      display: inline-block;
      width: 100px;
      height: 100px;
      margin: 2rem auto 2rem auto;

      &:hover {

        cursor: pointer;

      }

    }

  }

  .modifyPasswordLabel {

    margin: 1.5rem 0 1.5rem 0;

  }

}

</style>
