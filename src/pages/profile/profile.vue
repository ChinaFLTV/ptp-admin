<template>

  <div class="user-profile-container">

    <h1 class="profileTitle">{{ $t("common.bar.top.profile") }}</h1>
    <div style="display: flex;">
      <div class="halfProfileArea">

        <h3 class="profileKey">{{ $t("content.profile.id") }}</h3>
        <p class="profileValue">{{ userData?.id }}</p>
        <h3 class="profileKey">{{ $t("content.profile.account") }}</h3>
        <p class="profileValue">{{ userData?.account }}</p>
        <h3 class="profileKey">{{ $t("content.profile.password") }}</h3>
        <p class="profileValue" style="display: inline-block">{{ desensitize(userData?.password, "*", 0) }}</p>
        <span class="modify"
              @click="isShowModifyPasswordDialog = true">{{ $t("content.profile.changePassword") }}</span>
        <h3 class="profileKey">{{ $t("content.profile.nickname") }}</h3>
        <p class="profileValue" style="display: inline-block">{{ userData?.nickname }}</p>
        <span class="modify" @click="isShowRenameDialog = true">{{ $t("content.profile.changeNickname") }}</span>
        <h3 class="profileKey">{{ $t("content.profile.registerDate") }}</h3>
        <p class="profileValue">{{ dayjs(userData?.createTime).format("YYYY年M月D日 HH:mm:ss") }}</p>
        <h3 class="profileKey">{{ $t("content.profile.homeAddress") }}</h3>
        <transition name="el-fade-in-linear">
          <div v-show="isShowUserAddress">

            <p class="profileValue"
               style="margin:1rem auto; display: inline-block; color: dimgray;">{{
                (JSON.parse(userData?.address) as string[])?.join(" ")
              }}</p>
            <span class="modify"
                  @click="isShowUserAddress = false;isShowModifyAddressArea = true;address = JSON.parse(userData.address) as string[]">{{
                $t("content.profile.changeHomeAddress")
              }}</span>

          </div>
        </transition>

        <transition name="el-fade-in-linear">
          <div v-show="isShowModifyAddressArea" style="margin: 1rem auto">

            <el-cascader
                size="large"
                :options="pcaTextArr as CascaderOption[]" v-model="address">
            </el-cascader>
            <el-button @click="isShowUserAddress = true;isShowModifyAddressArea = false;"
                       style="margin-left: 3rem">{{ $t("common.button.cancel") }}
            </el-button>
            <el-button type="primary" @click="modifyAddress">{{ $t("common.button.confirm") }}</el-button>

          </div>
        </transition>

      </div>
      <div class="halfProfileArea">

        <h3 class="profileKey">{{ $t("content.profile.avatar") }}</h3>
        <div class="avatar-container">
          <el-image class="avatar" ref="avatarRef"
                    :src="JSON.parse(userData?.avatar)?.uri" :alt="t('content.profile.avatar')"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="[JSON.parse(userData?.avatar)?.uri]"
                    :initial-index="0"
                    fit="cover" lazy/>
          <span class="modify" @click="isShowChangeAvatarDialog = true">{{
              $t("content.profile.changeAvatar")
            }}</span>
        </div>
        <h3 class="profileKey">{{ $t("content.profile.realname") }}</h3>
        <p class="profileValue">{{ desensitize(userData?.realname) }}</p>
        <h3 class="profileKey">{{ $t("content.profile.sex") }}</h3>
        <p class="profileValue">{{
            userData?.gender === Gender.MALE ? $t("content.profile.sex_male") : userData?.gender === Gender.FEMALE ? $t("content.profile.sex_female") : $t("content.profile.sex_secret")
          }}</p>
        <h3 class="profileKey">{{ $t("content.profile.credit") }}</h3>
        <p ref="creditRef" class="profileValue"
           style="display:inline-block;width: auto;padding: 4px 10px 4px 10px;border-radius: 5px">
          {{ userData?.credit }}</p>

      </div>

    </div>


    <el-dialog v-model="isShowRenameDialog" :title="t('content.profile.changeNickname')" width="500">

      <el-input ref="newNicknameRef" v-model="newNickname" :minlength="2" :maxlength="15"
                :placeholder="t('content.profile.nicknameInputPlaceholder')" clearable
                show-word-limit/>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShowRenameDialog = false">{{ $t("common.button.cancel") }}</el-button>
          <el-button type="primary" @click="modifyNickname">{{ $t("common.button.confirm") }}</el-button>
        </div>
      </template>

    </el-dialog>

    <el-dialog v-model="isShowModifyPasswordDialog" :title="t('content.profile.changePassword')" width="500">

      <p class="modifyPasswordLabel">{{ $t("content.profile.oldPassword") }}:</p>
      <el-input ref="newNicknameRef" v-model="oldPassword" type="password"
                :placeholder="t('content.profile.oldPasswordInputPlaceholder')" clearable/>
      <p class="modifyPasswordLabel">{{ $t("content.profile.newPassword") }}:</p>
      <el-input ref="newNicknameRef" v-model="newPassword" type="password"
                :placeholder="t('content.profile.newPasswordInputPlaceholder')" clearable/>
      <p class="modifyPasswordLabel">{{ $t("content.profile.confirmPassword") }}:</p>
      <el-input ref="newNicknameRef" v-model="newPasswordAgain" type="password"
                :placeholder="t('content.profile.confirmPasswordInputPlaceholder')" clearable/>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="isShowModifyPasswordDialog = false">{{ $t("common.button.cancel") }}</el-button>
          <el-button type="primary" @click="modifyPassword">{{ $t("common.button.confirm") }}</el-button>
        </div>
      </template>

    </el-dialog>


    <!--  2024-8-11  23:29-下面为头像更换对话框  -->
    <el-dialog style="border-radius: 20px;" v-model="isShowChangeAvatarDialog"
               :title="t('content.profile.changeAvatar')"
               width="500" :show-close="false" draggable
               center>

      <div class="change-avatar-dialog-container">

        <input type="file" accept="image/*" id="picture-input" ref="pictureInputRef" @change="handleFileChange">
        <el-image class="change-avatar-dialog-item" style="height: 400px;" ref="choseNewAvatarRef"
                  :src="newAvatarUri"
                  :alt="t('content.profile.choseNewAvatar')" @click="pictureInputRef.click()"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :initial-index="0"
                  fit="cover" :style="{pointerEvents:isPictureChooserDisabled?'none':'auto'}" lazy>
          <template #error>
            <div class="change-avatar-dialog-avatar-slot-container"
                 :style="{pointerEvents:isPictureChooserDisabled?'none':'auto'}"
                 @click.prevent="pictureInputRef.click()">
              <add-picture theme="filled" size="48" fill="#333"/>
            </div>
          </template>
        </el-image>
        <el-button class="change-avatar-dialog-item" type="primary" @click="confirmChangeAvatar"
                   :loading="isConfirmChangeAvatarButtonLoading" :disabled="isConfirmChangeAvatarButtonDisabled">{{
            $t("common.button.confirm")
          }}
        </el-button>
        <el-button class="change-avatar-dialog-item" type="info" :disabled="isCancelChangeAvatarButtonDisabled"
                   @click="cancelChangeAvatar">
          {{ $t("common.button.cancel") }}
        </el-button>

      </div>

    </el-dialog>


  </div>

</template>


<script setup lang="ts">


import {UserDataStore} from "@/store/modules/user";
import {ElMessage} from "element-plus";
import {pcaTextArr} from "element-china-area-data";
import {CascaderOption} from "element-plus/lib/components";
import {useI18n} from "vue-i18n";
import {User} from "@/model/po/manage/User";
import {Ref} from "vue";
import {changeAvatar, querySingleUser, updateSingleUser} from "@/api/content/user";
import {AddPicture} from "@icon-park/vue-next";
import {Result} from "@/model/po/response/Result";
import {desensitize} from "@/utils/desensitization";
import dayjs from "dayjs";
import {Gender} from "@/enums/Gender";


const {t} = useI18n();


const avatarRef = ref(null);
const creditRef = ref(null);
const newNicknameRef = ref(null);
const choseNewAvatarRef = ref(null);
const pictureInputRef: Ref<HTMLInputElement> = ref(null);

const userDataStore = UserDataStore();
// 2024-2-11  10:57-能够进入当前页面，则用户一定已经登录了
const userData: Ref<User> = ref(userDataStore.getUserData() as User);
const isShowRenameDialog: Ref<boolean> = ref(false);
const newNickname: Ref<string> = ref("");
const isShowModifyPasswordDialog: Ref<boolean> = ref(false);
const isShowChangeAvatarDialog: Ref<boolean> = ref(false);
const isPictureChooserDisabled: Ref<boolean> = ref(false);
const isConfirmChangeAvatarButtonLoading: Ref<boolean> = ref(false);
const isConfirmChangeAvatarButtonDisabled: Ref<boolean> = ref(false);
const isCancelChangeAvatarButtonDisabled: Ref<boolean> = ref(false);
const oldPassword: Ref<string> = ref("");
const newPassword: Ref<string> = ref("");
const newPasswordAgain: Ref<string> = ref("");
// 2024-2-13  16:27-用于暂存用户的家庭住址数据
const address: Ref<string[]> = ref([] as string[]);
const isShowUserAddress: Ref<boolean> = ref(true);
const isShowModifyAddressArea: Ref<boolean> = ref(false);
// 2024-8-12  17:23-新头像的本地存储路径引用
const newAvatarUri: Ref<string> = ref(undefined);
// 2024-8-12  17:23-新头像的文件实体
let newAvatarFile: File = undefined;


// 2024-8-12  15:24-更改头像时 , 读取本地图片文件所需
const fileReader: FileReader = new FileReader();
fileReader.onload = e => {

  newAvatarUri.value = e.target.result;

};
fileReader.onerror = err => {

  ElMessage({

    message: t("content.profile.message.fetchPictureError"),
    showClose: true,
    type: "error",
    center: true

  });
  console.error(err);

  newAvatarUri.value = undefined;
  newAvatarFile = undefined;
  isPictureChooserDisabled.value = false;
  isConfirmChangeAvatarButtonDisabled.value = false;
  isCancelChangeAvatarButtonDisabled.value = false;

};
fileReader.onabort = () => {

  ElMessage({

    message: t("content.profile.message.fetchPictureAbort"),
    showClose: true,
    type: "warning",
    center: true

  });

  newAvatarUri.value = undefined;
  newAvatarFile = undefined;
  isPictureChooserDisabled.value = false;
  isConfirmChangeAvatarButtonDisabled.value = false;
  isCancelChangeAvatarButtonDisabled.value = false;

};


onBeforeMount(() => {

  // 2024-8-8  21:34-每次用户查看个人信息都要更新一下本地用户数据信息为云端最新用户数据信息
  refreshUserData();

});


onMounted(() => {

  // 2024-2-11  22:50-根据用户信誉积分调整字体颜色
  const credit = userData.value.credit;
  if (credit >= 80) {

    creditRef.value.style.color = "#00ff00";
    creditRef.value.style.backgroundColor = "#c6ffc670";

  } else if (credit >= 60) {

    creditRef.value.style.color = "#ffff00";
    creditRef.value.style.backgroundColor = "#ffffB870";

  } else {

    creditRef.value.style.color = "#ff0000";
    creditRef.value.style.backgroundColor = "#ffa2a270";

  }

});


onUnmounted(() => {

  fileReader?.abort();

});


/**
 *
 * @author LiGuanda
 * @date 2024/2/12 下午 12:38:46
 * @filename profile.vue
 * @description 用于提供用户的修改昵称操作
 *
 */
function modifyNickname() {

  if (newNickname.value === "") {

    ElMessage.error(t("content.profile.message.nicknameCannotBeEmpty"));
    return;

  } else if (newNickname.value.length < 2) {

    ElMessage.error(t("content.profile.message.nicknameIsIllegal"));
    return;

  } else if (newNickname.value === userData.value.nickname) {

    ElMessage.warning(t("content.profile.message.newNicknameIsTheSameAsOldNickname"));
    return;

  } else {

    isShowRenameDialog.value = false;
    // 2024-2-12  12:55-先更新云端用户数据，待云端用户数据更新完毕后再更新本地用户数据
    const oldNickname = userData.value.nickname;
    userData.value.nickname = newNickname.value;

    updateSingleUser(userData.value)
        .then(res => {

          // 2024-8-8  18:02-排除掉这种HTTP层面正常但业务层面执行失败的情况
          if (!res?.data?.mysql_result?.isUpdated) {

            ElMessage.error(t("content.profile.message.modifyNicknameFailed"));
            userData.value.nickname = oldNickname;
            userDataStore.updateUserData(userData.value);
            newNickname.value = "" as string;
            return;

          }

          ElMessage({

            message: t("content.profile.message.modifyNicknameSucceeded"),
            showClose: true,
            type: "success",
            center: true

          });

          // 2024-8-9  21:34-解决前后多次调用update方法只有第一次成功的BUG-更新一次并持久化回数据库时需要自增版本号
          userData.value.version++;
          userDataStore.updateUserData(userData.value);
          newNickname.value = "" as string;

        }).catch(err => {

      console.log(err);
      ElMessage.error(t("content.profile.message.modifyNicknameFailed"));
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
 * @filename profile.vue
 * @description 用于提交修改密码的操作
 *
 */
function modifyPassword() {

  if (oldPassword.value === "" || newPassword.value === "" || newPasswordAgain.value === "") {

    ElMessage.error(t("common.message.incompleteInformation"));
    return;

  }

  if (userData.value.password !== oldPassword.value) {

    ElMessage.error(t("content.profile.message.wrongOldPassword"));
    return;

  }

  if (newPassword.value !== newPasswordAgain.value) {

    ElMessage.error(t("content.profile.message.differentTwoNewPassword"));
    return;

  }

  if (oldPassword.value === newPassword.value) {

    ElMessage.error(t("content.profile.message.newPasswordIsTheSameAsOldPassword"));
    return;

  }

  userData.value.password = newPassword.value;
  updateSingleUser(userData.value)
      .then(res => {

        // 2024-8-8  18:01-排除掉这种HTTP层面正常但业务层面执行失败的情况
        if (!res?.data?.mysql_result?.isUpdated) {

          ElMessage.error(t("content.profile.message.modifyPasswordFailed"));

          userData.value.password = oldPassword.value;
          oldPassword.value = "" as string;
          newPassword.value = "" as string;
          newPasswordAgain.value = "" as string;
          isShowModifyPasswordDialog.value = false;
          return;

        }

        ElMessage({

          message: t("content.profile.message.modifyPasswordSucceeded"),
          showClose: true,
          type: "success",
          center: true

        });

        // 2024-8-9  21:35-解决前后多次调用update方法只有第一次成功的BUG-更新一次并持久化回数据库时需要自增版本号
        userData.value.version++;
        userDataStore.updateUserData(userData.value);
        oldPassword.value = "" as string;
        newPassword.value = "" as string;
        newPasswordAgain.value = "" as string;
        isShowModifyPasswordDialog.value = false;

      }).catch(err => {

    console.log(err);
    ElMessage.error(t("content.profile.message.modifyPasswordFailed"));

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
 * @filename profile.vue
 * @description 用于提交修改用户家庭住址的操作
 *
 */
function modifyAddress() {

  if (userData.value.address === JSON.stringify(address.value)) {

    ElMessage.warning(t("content.profile.message.newHomeAddressIsTheSameAsOldHomeAddress"));
    return;

  }

  const oldAddress = userData.value.address;

  userData.value.address = JSON.stringify(address.value);

  updateSingleUser(userData.value)
      .then(res => {

        // 2024-8-8  17:55-排除掉这种HTTP层面正常但业务层面执行失败的情况
        if (!res?.data?.mysql_result?.isUpdated) {

          ElMessage.error(t("content.profile.message.modifyHomeAddressFailed"));

          userData.value.address = oldAddress;
          userDataStore.updateUserData(userData.value);
          isShowUserAddress.value = true;
          isShowModifyAddressArea.value = false;
          return;

        }


        ElMessage({

          message: t("content.profile.message.modifyHomeAddressSucceeded"),
          showClose: true,
          type: "success",
          center: true

        });

        // 2024-8-9  21:35-解决前后多次调用update方法只有第一次成功的BUG-更新一次并持久化回数据库时需要自增版本号
        userData.value.version++;
        userDataStore.updateUserData(userData.value);
        isShowUserAddress.value = true;
        isShowModifyAddressArea.value = false;

      }).catch(err => {

    console.log(err);
    ElMessage.error(t("content.profile.message.modifyHomeAddressFailed"));

    userData.value.address = oldAddress;
    userDataStore.updateUserData(userData.value);
    isShowUserAddress.value = true;
    isShowModifyAddressArea.value = false;

  });

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/8 PM 8:36:31
 * @filename profile.vue
 * @description 更新本地用户数据
 *
 */
function refreshUserData() {

  const userDataStore = UserDataStore();
  if (userDataStore.localUserData && userDataStore.localUserData.id > 0) {

    querySingleUser(userDataStore.localUserData.id).then(res => {

      if (res?.data) {

        userDataStore.updateUserData(res.data);
        userData.value = res.data;

      }

    });

  }

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/12 PM 4:34:44
 * @filename profile.vue
 * @description 当图片选择元素中的文件列表出现变动时被触发(主要用于预览用户选择的本地图片)
 *
 */
function handleFileChange(event: Event) {

  const file: File = event.target.files[0];
  if (file) {

    newAvatarFile = file;
    fileReader.readAsDataURL(file);

  }

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/11 PM 10:20:29
 * @filename profile.vue
 * @description 更换用户头像
 *
 */
async function confirmChangeAvatar() {

  try {

    isPictureChooserDisabled.value = true;
    isConfirmChangeAvatarButtonLoading.value = true;
    isConfirmChangeAvatarButtonDisabled.value = true;
    isCancelChangeAvatarButtonDisabled.value = true;

    const userId: number = userData.value?.id;

    const res: Result<string> = await changeAvatar(userId, newAvatarFile);
    const newAvatarUri: string = res.data;

    // 2024-8-12  17:47-表明更新头像成功了
    if (newAvatarUri) {

      // 2024-8-12  17:48-为了避免本地自行修改字段而可能导致本地版本号与云端版本号不匹配的问题 , 这里统一直接从云端再拉取一份新的用户数据
      const newUser: Result<User> = await querySingleUser(userId);

      if (newUser.data) {

        userDataStore.updateUserData(newUser.data);
        userData.value = newUser.data;

        ElMessage({

          message: t("content.profile.message.changeAvatarSucceeded"),
          showClose: true,
          type: "success",
          center: true

        });

        // 2024-8-12  20:05-置相关状态资源为undefined
        cancelChangeAvatar();

      }

    }

  } catch (err) {

    newAvatarUri.value = undefined;
    newAvatarFile = undefined;
    isConfirmChangeAvatarButtonLoading.value = false;
    isConfirmChangeAvatarButtonDisabled.value = false;
    isCancelChangeAvatarButtonDisabled.value = false;

    ElMessage({

      message: t("content.profile.message.changeAvatarFailed"),
      showClose: true,
      type: "error",
      center: true

    });

    console.error(err.message);

  } finally {

    isPictureChooserDisabled.value = false;
    isConfirmChangeAvatarButtonLoading.value = false;
    isConfirmChangeAvatarButtonDisabled.value = false;
    isCancelChangeAvatarButtonDisabled.value = false;

  }

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/12 PM 5:26:05
 * @filename profile.vue
 * @description  取消更换头像
 *
 */
function cancelChangeAvatar() {

  isConfirmChangeAvatarButtonLoading.value = false;
  isConfirmChangeAvatarButtonDisabled.value = false;
  isCancelChangeAvatarButtonDisabled.value = false;
  isShowChangeAvatarDialog.value = false;
  newAvatarUri.value = undefined;
  newAvatarFile = undefined;

}


</script>


<style scoped lang="scss">

.user-profile-container {

  width: 100%;
  height: 100%;
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

    .avatar-container {

      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      margin: 2rem auto 2rem auto;

      .avatar {

        display: inline-block;
        width: 100px;
        height: 100px;

        &:hover {

          cursor: pointer;

        }

      }

    }

  }

  .modifyPasswordLabel {

    margin: 1.5rem 0 1.5rem 0;

  }

  .change-avatar-dialog-container {

    display: flex;
    flex-direction: column;
    align-items: center;

    #picture-input {

      display: none;

    }

    .change-avatar-dialog-item {

      display: block;
      margin: 10px 10px 10px; // 2024-8-12  10:51-覆盖ElementUI plus中的默认margin配置
      width: 400px;
      height: 50px;
      letter-spacing: 4px;

      .change-avatar-dialog-avatar-slot-container {

        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

      }

    }

  }

}

</style>
