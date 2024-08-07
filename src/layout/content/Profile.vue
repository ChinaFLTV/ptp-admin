<template>

  <div class="userProfileContainer">

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
            <el-button type="primary" @click="submitModifyAddress">{{ $t("common.button.confirm") }}</el-button>

          </div>
        </transition>

      </div>
      <div class="halfProfileArea">

        <h3 class="profileKey">{{ $t("content.profile.avatar") }}</h3>
        <el-image class="avatar" ref="avatarRef"
                  :src="JSON.parse(userData?.avatar).uri" :alt="t('content.profile.avatar')"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="[userData?.avatar]"
                  :initial-index="0"
                  fit="cover" lazy/>
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
          <el-button type="primary" @click="submitRename">{{ $t("common.button.confirm") }}</el-button>
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
          <el-button type="primary" @click="submitModifyPassword">{{ $t("common.button.confirm") }}</el-button>
        </div>
      </template>

    </el-dialog>

  </div>

</template>


<script setup lang="ts">


import {UserDataStore} from "@/store/modules/user";
import {desensitize} from "@/utils/desensitization";
import {ElMessage} from "element-plus";
import {pcaTextArr} from "element-china-area-data";
import dayjs from "dayjs";
import {CascaderOption} from "element-plus/lib/components";
import {useI18n} from "vue-i18n";
import {User} from "@/model/po/manage/User";
import {Gender} from "@/enums/Gender";
import {Ref} from "vue";
import {updateSingleUser} from "@/api/content/user";

const {t} = useI18n();


const avatarRef = ref(null);
const creditRef = ref(null);
const newNicknameRef = ref(null);


const userDataStore = UserDataStore();
// 2024-2-11  10:57-能够进入当前页面，则用户一定已经登录了
const userData: Ref<User> = ref(userDataStore.getUserData() as User);
const isShowRenameDialog: Ref<boolean> = ref(false);
const newNickname: Ref<string> = ref("");
const isShowModifyPasswordDialog: Ref<boolean> = ref(false);
const oldPassword: Ref<string> = ref("");
const newPassword: Ref<string> = ref("");
const newPasswordAgain: Ref<string> = ref("");
// 2024-2-13  16:27-用于暂存用户的家庭住址数据
const address: Ref<string[]> = ref([] as string[]);
const isShowUserAddress: Ref<boolean> = ref(true);
const isShowModifyAddressArea: Ref<boolean> = ref(false);


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


/**
 *
 * @author LiGuanda
 * @date 2024/2/12 下午 12:38:46
 * @filename Profile.vue
 * @description 用于提供用户的修改昵称操作
 *
 */
function submitRename() {

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
        .then(() => {

          ElMessage({

            message: t("content.profile.message.modifyNicknameSucceeded"),
            showClose: true,
            type: "success",
            center: true

          });
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
 * @filename Profile.vue
 * @description 用于提交修改密码的操作
 *
 */
function submitModifyPassword() {

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
      .then(() => {

        ElMessage({

          message: t("content.profile.message.modifyPasswordSucceeded"),
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
 * @filename Profile.vue
 * @description 用于提交修改用户家庭住址的操作
 *
 */
function submitModifyAddress() {

  if (userData.value.address === JSON.stringify(address.value)) {

    ElMessage.warning(t("content.profile.message.newHomeAddressIsTheSameAsOldHomeAddress"));
    return;

  }

  const oldAddress = userData.value.address;

  userData.value.address = JSON.stringify(address.value);

  updateSingleUser(userData.value)
      .then(() => {

        ElMessage({

          message: t("content.profile.message.modifyHomeAddressSucceeded"),
          showClose: true,
          type: "success",
          center: true

        });
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
