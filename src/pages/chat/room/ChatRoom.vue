<template>

  <div class="chat-room-container">

    <div class="message-container">
      <div class="message-top-bar-container">
        <div class="room-name-container">{{ roomName ? roomName : $t("content.chatRoom.chatRoomName") }}</div>
      </div>
      <div class="message-content-container">
        <el-scrollbar ref="chatMessageRef">
          <div ref="chatMessageInnerRef">
            <div v-for="message in groupMessages" :key="message.id"
                 :class="['group-message-info-container', message.senderId===userDataStore.localUserData.id?'reversed':'']">
              <el-avatar :size="40" :src="message.senderAvatarUrl" :alt="message.senderNickname">
                {{ message.senderNickname }}
              </el-avatar>
              <div class="group-message-content-container">
                <div class="group-message-nickname-info-container">
                  <span style="color: #a6a9ad;">{{ message.senderNickname }}</span>
                  <span class="group-message-senderId-info-container">({{ message.senderId }})</span>
                  <span class="group-message-datetime-info-container">{{
                      dayjs(message.dateTime).format("MM/DD HH:mm:ss")
                    }}</span>
                </div>
                <div class="group-message-content-info-container">{{ message.content }}</div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="message-input-container">
        <div class="message-extension-container">
          <emotion-happy theme="multi-color" size="20" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
          <picture-album theme="multi-color" style="margin-left: 10px;" size="20"
                         :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
          <file-addition theme="multi-color" style="margin-left: 10px;" size="20"
                         :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']"/>
        </div>
        <div class="message-input-bottom-half-container">
          <el-input
              ref="chatInputRef"
              style="border: none;"
              class="message-input-component"
              v-model="messageContent"
              type="textarea"
              rows="3"
              resize="none"
              :placeholder="t('content.chatRoom.chatInputPlaceholder')"
              maxlength="500"
              @keyup.enter="sendMessage"
              show-word-limit
          />
          <Telegram @click="sendMessage" class="send-message-icon" theme="filled" size="20" fill="#a6a9ad"/>
        </div>
      </div>
    </div>

    <div class="contact-container">

      <div class="contact-top-bar-container">
        <div style="margin-left: 15px;color: #E5EAF3;">{{
            $t("content.chatRoom.groupMember")
          }}
        </div>
        <div style="margin: 0 5px;color: #E5EAF3;">·</div>
        <div style="color: #E5EAF3;">1 / 155</div>
      </div>

      <div class="contact-list-container">

        <el-scrollbar height="800px">

          <div v-for="member in groupMembers" :key="member.id" class="group-member-info-container">

            <online-dot style="margin-left: 10px" :online="member.isOnline">
              <el-avatar :size="30" :src="member.avatarUrl" :alt="member.nickname">
                {{ member.nickname }}
              </el-avatar>
            </online-dot>
            <span class="group-member-info-nickname-container">{{ member.nickname }}</span>

          </div>

        </el-scrollbar>

      </div>

    </div>

  </div>

</template>


<script setup lang="ts">


import {Ref} from "vue";
import {useI18n} from "@/hooks/web/useI18n";
import {GroupMember, GroupMessage} from "@/api/chat/room";
import {UserDataStore} from "@/store/modules/user";
import dayjs from "dayjs";
import {EmotionHappy, FileAddition, PictureAlbum, Telegram} from "@icon-park/vue-next";
import {ElMessage} from "element-plus";
import randomUUID from "@/utils/uuid";


const chatMessageRef: Ref = ref(null);
const chatMessageInnerRef: Ref = ref(null);
const chatInputRef: Ref = ref(null);


const {t} = useI18n();
const userDataStore = UserDataStore();


// 2024-8-13  21:55-聊天室的房间名称
const roomName: Ref<string> = ref(t(""));
// 2024-8-14  22:44-聊天室在线用户信息列表
const groupMembers: Ref<Array<GroupMember>> = ref([{

  id: userDataStore.localUserData.id,
  avatarUrl: JSON.parse(userDataStore.localUserData?.avatar)?.uri,
  nickname: userDataStore.localUserData.nickname,
  isOnline: true

} as GroupMember, {

  id: userDataStore.localUserData.id,
  avatarUrl: JSON.parse(userDataStore.localUserData?.avatar)?.uri,
  nickname: userDataStore.localUserData.nickname,
  isOnline: false

} as GroupMember, {

  id: userDataStore.localUserData.id,
  avatarUrl: JSON.parse(userDataStore.localUserData?.avatar)?.uri,
  nickname: "这是一非常非常非常非常非常非常非常非常非常非常非常非常长的昵称",
  isOnline: true

} as GroupMember]);
// 2024-8-16  21:02-群聊消息(包括部分历史消息)
const groupMessages: Ref<GroupMessage[]> = ref([{
  id: 1,
  content: "Hey everyone, how's it going?",
  senderId: 101,
  senderNickname: "Alice",
  senderAvatarUrl: "https://example.com/avatar/alice.png",
  receiverId: -1,
  dateTime: new Date("2024-08-16T10:15:00Z"),
  type: 1
},
  {
    id: 2,
    content: "All good here! Working on the new project.",
    senderId: 102,
    senderNickname: "Bob",
    senderAvatarUrl: "https://example.com/avatar/bob.png",
    receiverId: -1,
    dateTime: new Date("2024-08-16T10:17:00Z"),
    type: 1
  },
  {
    id: 3,
    content: "Don't forget about the meeting at 3 PM.",
    senderId: 103,
    senderNickname: "Charlie",
    senderAvatarUrl: "https://example.com/avatar/charlie.png",
    receiverId: -1,
    dateTime: new Date("2024-08-16T10:20:00Z"),
    type: 1
  },
  {
    id: 4,
    content: "Can someone review my latest commit?",
    senderId: 101,
    senderNickname: "Alice",
    senderAvatarUrl: "https://example.com/avatar/alice.png",
    receiverId: -1,
    dateTime: new Date("2024-08-16T10:25:00Z"),
    type: 1
  },
  {
    id: 5,
    content: "你们说的啥呀？我咋听不懂捏",
    senderId: 102,
    senderNickname: "Bob",
    senderAvatarUrl: "https://example.com/avatar/bob.png",
    receiverId: -1,
    dateTime: new Date("2024-08-16T10:30:00Z"),
    type: 1
  }]);
// 2024-8-20  23:25-用户待发送的消息内容
const messageContent: Ref<string> = ref("");


/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/21 PM 11:56:13
 * @filename ChatRoom.vue
 * @description 发送群聊消息
 *
 */
function sendMessage() {

  if (messageContent.value.trim() == "") {

    ElMessage({

      message: t("content.chatRoom.messageContentIsEmpty"),
      showClose: true,
      type: "warning",
      center: true

    });
    return;

  }

  groupMessages.value.push({

    id: randomUUID(),
    content: messageContent.value,
    senderId: userDataStore.localUserData.id,
    senderNickname: userDataStore.localUserData.nickname,
    senderAvatarUrl: JSON.parse(userDataStore.localUserData?.avatar)?.uri,
    receiverId: -1,
    dateTime: new Date()

  } as GroupMessage);

  nextTick(() => {

    const scrollTop: number = chatMessageInnerRef.value.clientHeight - chatMessageRef.value.wrapRef.clientHeight;
    chatMessageRef.value.setScrollTop(chatMessageInnerRef.value.clientHeight);

  });

  messageContent.value = "";

}

</script>


<style scoped lang="scss">

@use "@/style/dimensions" as *;
@use "@/style/themes/default" as *;

$dark-background: #323644;
$dark-primary-text: #E5EAF3;
$dark-secondary-text: #a6a9ad;

.chat-room-container {

  width: 60%;
  height: 700px;
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
      height: 60px;
      background-color: $dark-background;
      border-radius: $global-dialog-radius $global-dialog-radius 0 0;
      border-bottom: 1px solid #272A37;

      .room-name-container {

        font-size: $global-middle-window-primary-font-size;
        letter-spacing: $global-middle-window-primary-letter-spacing;
        font-weight: bold;
        color: $dark-primary-text;

      }

    }

    .message-content-container {

      width: 100%;
      height: 500px; // 2024-8-22  00:18-避免聊天记录滚动区域意外溢出(至于为什么是这个数值，我也不清楚，我一下子给了这个数值，就)
      flex-grow: 1;
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

            background-color: #484D5F;
            color: #E5EAF3;
            padding: 5px 15px 5px 10px;
            border-radius: 0 20px 20px 20px;

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

      height: 120px;
      width: 100%;
      padding: 15px;
      background-color: $dark-background;
      border-radius: 0 0 $global-dialog-radius $global-dialog-radius;
      border-top: 1px solid #272A37;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .message-extension-container {

        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;

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
          color: #BFBBB4;

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

    $top-bar-height: 60px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 2;
    height: 100%;

    .contact-top-bar-container {

      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      width: 100%;
      height: $top-bar-height;
      border-radius: $global-dialog-radius $global-dialog-radius 0 0;
      border-bottom: 1px solid #272A37;
      background-color: $dark-background;

    }

    .contact-list-container {

      width: 100%;
      height: calc(720px - #{$top-bar-height});
      flex-grow: 1;
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

          color: #E5EAF3;
          border-radius: 10px;
          background-color: #484D5F;

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
