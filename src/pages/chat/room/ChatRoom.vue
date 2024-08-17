<template>

  <div class="chat-room-container">

    <div class="message-container">
      <div class="message-top-bar-container">
        <div class="room-name-container">{{ roomName ? roomName : $t("content.chatRoom.chatRoomName") }}</div>
      </div>
      <div class="message-content-container">
        <el-scrollbar>
          <div v-for="message in groupMessages" :key="message.id" class="group-message-info-container">
            <el-avatar :size="40" :src="message.senderAvatarUrl" :alt="message.senderNickname">
              {{ message.senderNickname }}
            </el-avatar>
            <div class="group-message-content-container">
              <div class="group-message-nickname-info-container">
                <span>{{ message.senderNickname }}</span>
                <span class="group-message-datetime-info-container">{{
                    dayjs(message.dateTime).format("MM/DD HH:mm:ss")
                  }}</span>
              </div>
              <div class="group-message-content-info-container">{{ message.content }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="message-input-container"></div>
    </div>

    <div class="contact-container">

      <div class="contact-top-bar-container">
        <div style="margin-left: 15px;">{{ $t("content.chatRoom.groupMember") }}</div>
        <div style="margin: 0 5px;">·</div>
        <div>1 / 155</div>
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
import {t} from "@/hooks/web/useI18n";
import {GroupMember, GroupMessage} from "@/api/chat/room";
import {UserDataStore} from "@/store/modules/user";
import dayjs from "dayjs";


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


</script>


<style scoped lang="scss">

@use "@/style/dimensions" as *;
@use "@/style/themes/default" as *;

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
      background-color: blueviolet;
      border-radius: $global-dialog-radius $global-dialog-radius 0 0;

      .room-name-container {

        font-size: $global-middle-window-primary-font-size;
        letter-spacing: $global-middle-window-primary-letter-spacing;
        font-weight: bold;

      }

    }

    .message-content-container {

      width: 100%;
      flex-grow: 1;
      background-color: darksalmon;
      padding: 20px;

      .group-message-info-container {

        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: start;
        margin: 10px 0;

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

              .group-message-datetime-info-container {

                display: inline;

              }

            }

          }

        }

      }

    }

    .message-input-container {

      height: 120px;
      width: 100%;
      background-color: crimson;
      border-radius: 0 0 $global-dialog-radius $global-dialog-radius;

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
      background-color: darkorange;
      border-radius: $global-dialog-radius $global-dialog-radius 0 0;
      color: $global-text-color-primary;

    }

    .contact-list-container {

      width: 100%;
      height: calc(720px - #{$top-bar-height});
      flex-grow: 1;
      background-color: fuchsia;
      border-radius: 0 0 $global-dialog-radius $global-dialog-radius;
      padding: 10px 10px;

      .group-member-info-container {

        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        width: 100%;
        height: 50px;

        &:hover {

          color: #E5EAF3;
          background-color: #484d5f;
          border-radius: 10px;

        }

        .group-member-info-nickname-container {

          max-width: 120px;
          margin-left: 10px;
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

        }

      }

    }

  }

}

</style>
