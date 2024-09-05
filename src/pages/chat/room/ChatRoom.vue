<template>
  <div class="chat-room-container">
    <div class="message-container">
      <div ref="messageTopBarRef" class="message-top-bar-container">
        <div class="room-name-container">
          {{
            chatRoomInfo
                ? chatRoomInfo.name
                : $t("content.chatRoom.chatRoomName")
          }}
        </div>
      </div>
      <div class="message-content-container">
        <el-scrollbar id="messageContentContainer" ref="chatMessageRef">
          <div ref="chatMessageInnerRef">
            <div
                v-for="message in groupMessages"
                :key="message.id"
                :class="[
                'group-message-info-container',
                message.senderId === userDataStore.localUserData?.id
                  ? 'reversed'
                  : '',
              ]"
            >
              <el-avatar
                  style="flex-shrink: 0"
                  :size="40"
                  :src="message.senderAvatarUrl"
                  :alt="message.senderNickname"
              >
                {{ message.senderNickname }}
              </el-avatar>
              <div class="group-message-content-container">
                <div class="group-message-nickname-info-container">
                  <span style="color: #a6a9ad">{{
                      message.senderNickname
                    }}</span>
                  <span class="group-message-senderId-info-container"
                  >({{ message.senderId }})</span
                  >
                  <span class="group-message-datetime-info-container">{{
                      dayjs(message.dateTime).format("MM/DD HH:mm:ss")
                    }}</span>
                </div>
                <div v-if="message.contentType==ContentType.TEXT" class="group-message-content-info-container">
                  {{ message.content }}
                </div>
                <div v-else-if="message.contentType==ContentType.PHOTO" class="group-message-content-info-container"
                     style="padding: 0;width: 100px;height: 100px;">
                  <el-image style="width: 100px; height: 100px;" :src="message.dataUri" :fit="'cover'"
                            :preview-src-list="[message.dataUri]" scroll-container="#messageContentContainer" lazy>
                    <template #error>
                      <div style="width:100%;height:100%;display: flex;justify-content: center;align-items: center;">
                        <error-picture style="padding: 0;margin: 0;" theme="multi-color" size="20"
                                       :fill="['#000' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
                      </div>
                    </template>
                  </el-image>
                </div>
                <div v-if="message.contentType==ContentType.FILE"
                     style="padding: 0;width: 100px;height: 100px;display: flex;justify-content: center;align-items: center;"
                     class="group-message-content-info-container" @click="showDownloadDialog(message)">
                  <file-text-one theme="multi-color" size="24" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="message-input-container">
        <div class="message-extension-container">
          <el-popover
              trigger="click"
              :visible="isEmojiPanelVisible"
              placement="top"
              :width="0"
              :show-arrow="false"
              popper-class="message-extension-emoji-container"
              popper-style="background-color:transparent;border:none;box-shadow:unset;"
          >
            <EmojiPicker theme="dark" @select="onSelectEmoji" native/>
            <template #reference>
              <emotion-happy
                  @click="isEmojiPanelVisible = !isEmojiPanelVisible"
                  theme="multi-color"
                  size="20"
                  :fill="['#333', '#2F88FF', '#FFF', '#43CCF8']"
              />
            </template>
          </el-popover>
          <input style="display: none;" type="file" accept="image/*" ref="photoSelectRef"
                 @change="handlePhotoChange">
          <picture-album
              v-if="contentType!=ContentType.PHOTO"
              theme="multi-color"
              style="margin-left: 10px"
              size="20"
              :fill="['#333', '#2F88FF', '#FFF', '#43CCF8']"
              @click.prevent="photoSelectRef.click()"
          />
          <picture-album v-if="contentType==ContentType.PHOTO" theme="multi-color" size="20" style="margin-left: 10px"
                         :fill="['#333', '#d0021b', '#FFF', '#43CCF8']" @click="cancelSendMediaFile"/>
          <input style="display: none;" type="file" ref="fileSelectRef"
                 @change="handleFileChange">
          <file-addition
              v-if="contentType!=ContentType.FILE"
              theme="multi-color"
              style="margin-left: 10px"
              size="20"
              :fill="['#333', '#2F88FF', '#FFF', '#43CCF8']"
              @click.prevent="fileSelectRef.click()"
          />
          <file-addition
              v-if="contentType==ContentType.FILE"
              theme="multi-color"
              style="margin-left: 10px"
              size="20"
              :fill="['#333', '#d0021b', '#FFF', '#43CCF8']"
              @click="cancelSendMediaFile"
          />
          <voice
              theme="multi-color"
              style="margin-left: 10px"
              size="20"
              :fill="['#FFF', '#2F88FF', '#FFF', '#43CCF8']"
          />
        </div>
        <div class="message-input-bottom-half-container">
          <el-input
              ref="chatInputRef"
              style="border: none"
              class="message-input-component"
              v-model="messageContent"
              type="textarea"
              rows="3"
              resize="none"
              :placeholder="t('content.chatRoom.chatInputPlaceholder')"
              maxlength="500"
              @keyup.enter="sendMessage"
              :disabled="isChatInputDisabled"
              show-word-limit
          />
          <Telegram
              @click="sendMessage"
              class="send-message-icon"
              theme="filled"
              size="20"
              fill="#a6a9ad"
          />
        </div>
      </div>
    </div>

    <div class="contact-container">
      <div class="contact-top-bar-container">
        <div style="margin-left: 15px; color: #e5eaf3">
          {{ $t("content.chatRoom.groupMember") }}
        </div>
        <div style="margin: 0 5px; color: #e5eaf3">·</div>
        <!-- <div style="color: #E5EAF3;">{{ groupMembers?.length ? groupMembers.length : 0 }}</div> -->
        <count-up style="color: #E5EAF3;"
                  :start-val="0"
                  :end-val="groupMembers.length"
                  :duration="1.5"
        ></count-up>
        <el-icon
            @click="updateContactList"
            :size="14"
            style="margin: auto 15px auto auto; color: #e5eaf3"
        >
          <RefreshLeft :class="{ spinning: isSpinning }"/>
        </el-icon>
      </div>

      <div class="contact-list-container">
        <el-scrollbar height="800px">
          <div
              v-for="member in groupMembers"
              :key="member.id"
              class="group-member-info-container"
          >
            <online-dot style="margin-left: 10px" :online="true">
              <el-avatar
                  :size="30"
                  :src="JSON.parse(member?.avatar)?.uri"
                  :alt="member.nickname"
              >
                {{ member.nickname }}
              </el-avatar>
            </online-dot>
            <span class="group-member-info-nickname-container">{{
                member.nickname
              }}</span>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {useI18n} from "@/hooks/web/useI18n";
import {GroupMessage, MessageType, querySingleChatRoom, uploadMediaFile} from "@/api/chat/room";
import {UserDataStore} from "@/store/modules/user";
import dayjs from "dayjs";
import {
  EmotionHappy,
  ErrorPicture,
  FileAddition,
  FileTextOne,
  PictureAlbum,
  Telegram,
  Voice
} from "@icon-park/vue-next";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  DEFAULT_CHAT_ROOM_ID,
  PTP_USER_CHAT_BASE_URL,
  PTP_WEB_CONTEXT_URL,
  PTP_WEB_SITE_WEBSOCKET_URL
} from "@/constants/web";
import {ChatRoom} from "@/model/po/ws/ChatRoom";
import {queryUsersByIds} from "@/api/content/user";
import {RefreshLeft} from "@element-plus/icons-vue";
import {User} from "@/model/po/manage/User";
import EmojiPicker, {EmojiExt} from "vue3-emoji-picker";
// 2024-8-28  21:55-必须要在这个位置处引入表情选择器开源库的CSS , 否则其组件的布局将会变得无限混乱
import "vue3-emoji-picker/css";
import {ContentType} from "@/model/po/ws/ContentType";
import CountUp from "vue-countup-v3";
import randomUUID from "@/utils/uuid";
import {vsprintf} from "sprintf-js";
import {getFilenameFromPath} from "@/utils/file";


const messageTopBarRef: Ref = ref(null);
const chatMessageRef: Ref = ref(null);
const photoSelectRef: Ref = ref(null);
const fileSelectRef: Ref = ref(null);
const chatMessageInnerRef: Ref = ref(null);
const chatInputRef: Ref = ref(null);
const isSpinning: Ref<boolean> = ref(false);

const isEmojiPanelVisible: Ref<boolean> = ref(false);
const isChatInputDisabled: Ref<boolean> = ref(false);

const {t} = useI18n();
const userDataStore = UserDataStore();

// 2024-8-14  22:44-聊天室在线用户信息列表
const groupMembers: Ref<Array<User>> = ref([]);
// 2024-8-16  21:02-群聊消息(包括部分历史消息)
const groupMessages: Ref<GroupMessage[]> = ref([{
  id: 520,
  senderId: 9,
  senderNickname: "鞠婧祎",
  senderAvatarUrl: "http://loveyou",
  dataUri: "https://ptp-chat-room-1309498949.cos.ap-nanjing.myqcloud.com/file/3622490032992-%E5%9C%A8%E8%AF%BB%E8%AF%81%E6%98%8E.pdf.pdf",
  contentType: ContentType.FILE,
  messageType: MessageType.GROUP_CHAT

} as GroupMessage]);
// 2024-8-20  23:25-用户待发送的消息内容
const messageContent: Ref<string> = ref("");
// 2024-8-24  09:47-聊天房间的信息
const chatRoomInfo: Ref<ChatRoom> = ref();

// 2024-8-23  20:44-用于与后端WebSocket服务器进行交互的WebSocket客户端
const chatRoomClient: WebSocket = new WebSocket(`${PTP_WEB_SITE_WEBSOCKET_URL}${PTP_WEB_CONTEXT_URL}${PTP_USER_CHAT_BASE_URL}/room?roomId=${DEFAULT_CHAT_ROOM_ID}&userId=${userDataStore.localUserData.id}`);
// 2024-9-4  22:04-用户将要发送的多媒体文件(包括图片)
const waitingSendMediaFile: Ref<File> = ref();
// 2024-9-4  22:42-当前发送消息的内容类型
const contentType: Ref<ContentType> = ref(ContentType.TEXT);


// 2024-8-24  09:57-获取一下最新的房间数据
updateChatRoomInfo();


chatRoomClient.addEventListener("open", () => {

  ElMessage({

    message: t("content.chatRoom.enterRoom"),
    showClose: true,
    type: "success",
    center: true

  });

});


chatRoomClient.addEventListener("message", (event) => {

  const wrappedMsgDataMap = JSON.parse(event.data);
  const groupMessage: GroupMessage = wrappedMsgDataMap.message as GroupMessage;

  // 2024-8-23  23:25-如果群聊消息类型为系统消息时 , 则需要重写一下消息数据 , 以方便前端进行展示
  if (groupMessage.messageType >= 1703 && groupMessage.messageType <= 1706) {

    groupMessage.senderId = -1;
    groupMessage.senderNickname = t("content.chatRoom.systemBroadcast");
    groupMessage.senderAvatarUrl = "src/assets/icons/broadcast.svg";
    groupMessage.contentType = ContentType.TEXT;

  }

  groupMessages.value.push(groupMessage);

  scrollToBottom();

  // 2024-8-26  14:39-如果本条消息是用户进入房间/退出房间的系统提示消息 , 则应该要启动一次刷新房间成员列表的任务
  if (groupMessage.messageType === MessageType.SYSTEM_USER_ENTER || groupMessage.messageType === MessageType.SYSTEM_USER_EXIT) {

    refreshContactList();

  }

});


chatRoomClient.addEventListener("error", (error) => {

  ElMessage({

    message: `${t("content.chatRoom.chatError")} : ${error.type}`,
    showClose: true,
    type: "warning",
    center: true

  });

});


chatRoomClient.addEventListener("close", (event) => {

  ElMessage({

    message: t("content.chatRoom.exitRoom"),
    showClose: true,
    type: "success",
    center: true

  });

  if (!event.wasClean) {

    ElMessage({

      message: t("content.chatRoom.chatError"),
      showClose: true,
      type: "warning",
      center: true

    });

  }

});


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/23 PM 6:21:51
 * @filename ChatRoom.vue
 * @description 使群聊消息容器中的滑动容器滑动至底部
 *
 */
function scrollToBottom() {

  nextTick(() => {

    // const scrollTop: number = chatMessageInnerRef.value.clientHeight - chatMessageRef.value.wrapRef.clientHeight;
    chatMessageRef.value.setScrollTop(chatMessageInnerRef.value.clientHeight);

  });

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/24 AM 12:31:51
 * @filename ChatRoom.vue
 * @description 初始化房间信息UI
 *
 */
async function updateChatRoomInfo() {

  const res = await querySingleChatRoom(DEFAULT_CHAT_ROOM_ID);
  chatRoomInfo.value = res["data"];

  messageTopBarRef.value.style.backgroundImage = `url(${res["data"].avatarUrl})`;

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/26 PM 2:40:58
 * @filename ChatRoom.vue
 * @description 刷新聊天房间的在线成员列表
 *
 */
const refreshContactList = async () => {

  if (chatRoomInfo?.value?.id) {

    const newChatRoomInfo: ChatRoom = (await querySingleChatRoom(chatRoomInfo.value.id)).data;
    chatRoomInfo.value = newChatRoomInfo;
    if (newChatRoomInfo.onlineUsers || newChatRoomInfo.onlineUsers?.size > 0) {

      groupMembers.value = (await queryUsersByIds(newChatRoomInfo?.onlineUsers)).data;

    }

  }

};


// 2024-8-20  15:11-后台每10s刷新一次在线成员列表(延迟6s之后开始定时执行)
let refreshContactListInterval: number;
setTimeout(() => {

  refreshContactListInterval = setInterval(refreshContactList, 10000);

}, 6000);


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/26 PM 6:42:21
 * @filename ChatRoom.vue
 * @description 手动更新当前聊天房间的最新的在线用户列表
 *
 */
const updateContactList = async () => {

  try {

    isSpinning.value = true;
    await refreshContactList();

  } catch (err) {

    console.error(err);

  } finally {

    isSpinning.value = false;

  }

};


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/5 PM 8:44:26
 * @filename ChatRoom.vue
 * @description
 *
 */
function showDownloadDialog(message: GroupMessage) {

  ElMessageBox.confirm(
      vsprintf(t("content.chatRoom.confirmToDownloadFile"), [decodeURIComponent(getFilenameFromPath(message.dataUri, true)) as string]),
      t("content.chatRoom.fileDownload"),
      {
        confirmButtonText: t("common.button.confirm"),
        cancelButtonText: t("common.button.cancel"),
        type: "info"
      }
  ).then(() => {

    ElMessage({

      message: vsprintf(t("content.chatRoom.startDownloadFile"), [decodeURIComponent(getFilenameFromPath(message.dataUri, true)) as string]),
      showClose: true,
      type: "info",
      center: true

    });

    // 2024-9-5  22:25-下载文件体积较大&传参量不大 , 则建议使用get方式下载文件 , 该种方式下回自动打开然后关闭新的窗口 , 不会阻塞住 , 对用户体验很友好
    // 文件体积不大或者传参量比较大 , 则建议使用post方式去下载(手动创建一个用于download的a元素并模拟点击) , 该方式不会打开新页面
    // 资料来源 : https://www.cnblogs.com/zzwlong/p/15540482.html
    window.open(message.dataUri);

  });

}

/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/27 PM 9:39:42
 * @filename ChatRoom.vue
 * @param emoji {EmojiExt} 用户选择的表情
 * @description 用户选择了某个表情之后的回调函数
 *
 */
function onSelectEmoji(emoji: EmojiExt) {

  const cursorOldIndex: number = chatInputRef?.value?.ref?.selectionStart;
  messageContent.value = messageContent.value.slice(0, cursorOldIndex) + emoji.i + messageContent.value.slice(cursorOldIndex);

  chatInputRef.value.focus();
  isEmojiPanelVisible.value = false;

  nextTick(() => {

    const cursorNewIndex: number = cursorOldIndex + emoji.i.length;
    chatInputRef.value.ref.setSelectionRange(cursorNewIndex, cursorNewIndex);

  });

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/4 PM 10:00:34
 * @filename ChatRoom.vue
 * @description 当图片选择元素中的文件列表出现变动时被触
 *
 */
function handlePhotoChange(event: Event) {

  const file: File = (event.target as HTMLInputElement).files[0];
  if (file) {

    isChatInputDisabled.value = true;
    waitingSendMediaFile.value = file;
    contentType.value = ContentType.PHOTO;
    messageContent.value = file.name;

  } else {

    // 2024-9-5  19:51-啥媒体文件都没有选择 , 则回退至文本发送模式
    waitingSendMediaFile.value = undefined;
    isChatInputDisabled.value = false;
    contentType.value = ContentType.TEXT;
    messageContent.value = "";

  }

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/5 PM 7:49:00
 * @filename ChatRoom.vue
 * @description 当文件选择元素中的文件列表出现变动时被触
 *
 */
function handleFileChange(event: Event) {

  const file: File = (event.target as HTMLInputElement).files[0];
  if (file) {

    isChatInputDisabled.value = true;
    waitingSendMediaFile.value = file;
    contentType.value = ContentType.FILE;
    messageContent.value = file.name;

  } else {

    // 2024-9-4  22:43-啥媒体文件都没有选择 , 则回退至文本发送模式
    waitingSendMediaFile.value = undefined;
    isChatInputDisabled.value = false;
    contentType.value = ContentType.TEXT;
    messageContent.value = "";

  }

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/4 PM 11:12:30
 * @filename ChatRoom.vue
 * @description 取消多媒体文件的选择&上传
 *
 */
function cancelSendMediaFile() {

  waitingSendMediaFile.value = undefined;
  // 2024-9-4  23:13-只要取消当前非文本模式的发送操作 , 便统一回退至文本发送模式
  contentType.value = ContentType.TEXT;
  isChatInputDisabled.value = false;
  messageContent.value = "";

}


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/21 PM 11:56:13
 * @filename ChatRoom.vue
 * @description 发送群聊消息
 *
 */
async function sendMessage() {

  try {

    if (messageContent.value.trim() == "") {

      ElMessage({

        message: t("content.chatRoom.messageContentIsEmpty"),
        showClose: true,
        type: "warning",
        center: true

      });

      // 2024-8-23  23:38-避免在持续回车的情况下发送消息导致消息发送失败而消息输入框中的内容出现多行文字的情况
      messageContent.value = "";

      return;

    }

    const newMessage: GroupMessage = {

      id: randomUUID(),
      content: messageContent.value,
      senderId: userDataStore.localUserData.id,
      senderNickname: userDataStore.localUserData.nickname,
      senderAvatarUrl: JSON.parse(userDataStore.localUserData?.avatar)?.uri,
      receiverId: -1,
      dateTime: new Date(),
      contentType: ContentType.TEXT,
      messageType: MessageType.GROUP_CHAT

    };

    switch (contentType.value) {

      case ContentType.PHOTO:

        const dataUri1: string = (await uploadMediaFile(userDataStore.localUserData.id, newMessage.id, ContentType.PHOTO, waitingSendMediaFile.value)).data;

        if (dataUri1) {

          newMessage.contentType = ContentType.PHOTO;
          newMessage.dataUri = dataUri1;

        }

        break;

      case ContentType.FILE:

        const dataUri2: string = (await uploadMediaFile(userDataStore.localUserData.id, newMessage.id, ContentType.FILE, waitingSendMediaFile.value)).data;

        if (dataUri2) {

          newMessage.contentType = ContentType.FILE;
          newMessage.dataUri = dataUri2;

        }

        break;

    }

    chatRoomClient.send(JSON.stringify(newMessage));

  } catch (e) {

    console.error(e);
    ElMessage({

      message: t("content.chatRoom.messageSendFailed"),
      showClose: true,
      type: "error",
      center: true

    });

  } finally {

    // 2024-9-4  23:05-不管当前发送的消息类型是什么 , 发生完毕后统一重置为文本发送模式
    waitingSendMediaFile.value = undefined;
    isChatInputDisabled.value = false;
    contentType.value = ContentType.TEXT;
    messageContent.value = "";

  }

}


onUnmounted(() => {

  // 2024-8-23  21:49-页面关闭将关闭连接 , 以防止资源泄漏
  chatRoomClient.close(1000, t("content.chatRoom.exitRoom"));

  // 2024-8-26  15:10-清除定时器 , 防止网络请求任务无线堆积
  clearInterval(refreshContactListInterval);

});

</script>


<style scoped lang="scss">
@use "@/style/dimensions" as *;
@use "@/style/themes/default" as *;

$dark-background: #323644;
$dark-primary-text: #e5eaf3;
$dark-secondary-text: #a6a9ad;
$chat-room-container-width: 58vw;
$chat-room-container-height: 70vh;
$message-top-bar-container-height: 5vh;
$message-input-container-height: 16vh;
$contact-container-width: 11vw;

.chat-room-container {
  width: $chat-room-container-width;
  height: $chat-room-container-height;
  max-height: $chat-room-container-height;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .message-container {
    flex: 9;
    height: 100%;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .message-top-bar-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: $message-top-bar-container-height;
      background-color: $dark-background;
      border-radius: $global-dialog-radius $global-dialog-radius 0 0;
      border-bottom: 1px solid #272a37;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      .room-name-container {
        font-size: $global-middle-window-primary-font-size;
        letter-spacing: $global-middle-window-primary-letter-spacing;
        font-weight: bold;
        color: $dark-primary-text;
      }
    }

    .message-content-container {
      width: 100%;
      height: calc(
          #{$chat-room-container-height} - #{$message-top-bar-container-height} -
          #{$message-input-container-height}
      ); // 2024-8-22  00:18-避免聊天记录滚动区域意外溢出(至于为什么是这个数值，我也不清楚，我一下子给了这个数值，就)
      background-color: $dark-background;
      padding: 20px 0;

      .group-message-info-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        margin: 20px 0 0 0;
        padding: 0 20px;

        .group-message-content-container {
          display: flex;
          flex-direction: column;
          align-items: start;
          margin-left: 10px;

          .group-message-nickname-info-container {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            font-size: 12px;
            margin-bottom: 2px;

            .group-message-senderId-info-container {
              display: none;
            }

            .group-message-datetime-info-container {
              margin-left: 10px;
              display: none;
            }
          }

          .group-message-content-info-container {
            background-color: #484d5f;
            color: #e5eaf3;
            padding: 5px 15px 5px 10px;
            border-radius: 0 20px 20px 20px;
            overflow: hidden;
          }

          &:hover {
            .group-message-nickname-info-container {
              .group-message-senderId-info-container {
                color: $dark-secondary-text;
                display: inline;
              }

              .group-message-datetime-info-container {
                color: $dark-secondary-text;
                display: inline;
              }
            }
          }
        }
      }

      .reversed {
        flex-direction: row-reverse;
        justify-content: end;

        .group-message-content-container {
          align-items: end;
          margin-right: 10px;

          .group-message-nickname-info-container {
            flex-direction: row-reverse;
            justify-content: end;

            .group-message-datetime-info-container {
              margin-right: 10px;
            }
          }

          .group-message-content-info-container {
            border-radius: 20px 0 20px 20px;
            padding: 5px 10px 5px 15px;
          }
        }
      }
    }

    .message-input-container {
      height: $message-input-container-height;
      width: 100%;
      padding: 15px;
      background-color: $dark-background;
      border-radius: 0 0 $global-dialog-radius $global-dialog-radius;
      border-top: 1px solid #272a37;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .message-extension-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;

        .message-extension-emoji-container {
          padding: 0 !important;
        }
      }

      .message-input-bottom-half-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: end;

        ::v-deep(.el-textarea__inner) {
          padding: 0;
          box-shadow: none;
          border: none;
          background-color: transparent;
          color: #bfbbb4;
        }

        ::v-deep(.el-input__count) {
          background-color: transparent;
        }

        .message-input-component {
          font-size: 16px;
        }

        .send-message-icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }

  .contact-container {
    $top-bar-height: 5vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: $contact-container-width;
    height: 100%;

    .contact-top-bar-container {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      width: 100%;
      height: $top-bar-height;
      border-radius: $global-dialog-radius $global-dialog-radius 0 0;
      border-bottom: 1px solid #272a37;
      background-color: $dark-background;
      font-size: 0.8vw;

      .spinning {
        animation: spin 1s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }

    .contact-list-container {
      width: 100%;
      height: calc(100% - #{$top-bar-height});
      border-radius: 0 0 $global-dialog-radius $global-dialog-radius;
      padding: 10px 10px;
      background-color: $dark-background;

      .group-member-info-container {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 50px;

        &:hover {
          color: #e5eaf3;
          border-radius: 10px;
          background-color: #484d5f;
        }

        .group-member-info-nickname-container {
          max-width: 120px;
          margin-left: 10px;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #a6a9ad;
        }
      }
    }
  }
}
</style>
