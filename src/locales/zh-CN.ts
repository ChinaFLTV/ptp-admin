/**
 *
 * @author Lenovo
 * @date 2024/7/2 PM 4:43:22
 * @filename zh-CN.ts
 * @description 简体中文语言包
 *
 */

export default {

    // 2024-7-3  17:17-公共组件的语言
    common: {

        bar: {

            side: {

                dashboard: "仪表盘",
                contentManage: "内容管理",
                userManage: "人员管理",
                versionControl: "版本控制"

            },
            top: {

                appTitle: "PTP后台管理平台",
                chatRoom: "聊天室",
                myBlog: "我的博客",
                entertainment: "娱乐",
                contactUs: "与我们联系",
                enterFullscreen: "全屏",
                exitFullscreen: "退出全屏",
                changeLanguage: "语言切换",
                enterLogin: "请登录",
                exitLogin: "退出登录",
                welcome: "欢迎你，{nickname}",
                profile: "个人信息"

            }

        },
        button: {

            confirm: "确认",
            cancel: "取消"

        },
        message: {

            pageRenderError: "页面渲染错误",
            navigationFailure: "导航失败",
            logout: "正在登出...",
            incompleteInformation: "信息不完整"

        },
        page: {

            blankPage: "空白页"

        },
        tips: {

            emptyContent: "空内容"

        }

    },
    // 2024-7-2  21:18-登录页面的语言
    login: {

        loginTitle: "登录",
        accountPlaceholder: "请输入账号",
        nicknamePlaceholder: "请输入用户名",
        passwordPlaceholder: "请输入密码",
        message: {

            incorrectInformation: "账号或密码不正确",
            loginError: "登录出错",
            checkPass: "校验通过，请稍后"

        }

    },
    content: {

        chatRoom: {

            chatRoomName: "未知房间号",
            groupMember: "群成员",
            chatInputPlaceholder: "善语结善缘，恶言伤人心~(拖动、粘贴文件到此，可发送文件)",
            messageContentIsEmpty: "消息内容为空!",
            enterRoom: "正在进入房间...",
            enterRoomFailed: "进入房间失败",
            chatError: "聊天系统异常",
            exitRoom: "您 离开了房间",
            systemBroadcast: "系统广播"

        },
        profile: {

            id: "用户唯一ID",
            account: "账号信息",
            password: "密码",
            changePassword: "修改密码",
            oldPassword: "旧密码",
            newPassword: "新密码",
            confirmPassword: "再次确认新密码",
            oldPasswordInputPlaceholder: "请输入旧密码",
            newPasswordInputPlaceholder: "请输入新密码",
            confirmPasswordInputPlaceholder: "请重复新密码",
            nickname: "用户昵称",
            changeNickname: "修改昵称",
            nicknameInputPlaceholder: "请输入新的昵称",
            registerDate: "注册时间",
            homeAddress: "家庭住址",
            changeHomeAddress: "修改地址",
            avatar: "用户头像",
            changeAvatar: "更换头像",
            choseNewAvatar: "已选中的新头像图片",
            realname: "真实姓名",
            sex: "性别",
            sex_male: "男",
            sex_female: "女",
            sex_secret: "保密",
            credit: "信誉积分",
            message: {

                nicknameCannotBeEmpty: "昵称不能为空~",
                nicknameIsIllegal: "用户昵称不能少于两个字符~",
                newNicknameIsTheSameAsOldNickname: "新昵称与旧昵称相同",
                modifyNicknameSucceeded: "修改昵称成功",
                modifyNicknameFailed: "修改昵称失败",
                wrongOldPassword: "旧密码填写错误",
                differentTwoNewPassword: "前后两次填写的新密码不一致",
                newPasswordIsTheSameAsOldPassword: "新密码与旧密码相同",
                modifyPasswordSucceeded: "修改密码成功",
                modifyPasswordFailed: "修改密码失败",
                newHomeAddressIsTheSameAsOldHomeAddress: "新地址与旧地址相同",
                modifyHomeAddressSucceeded: "修改地址成功",
                modifyHomeAddressFailed: "修改地址失败",
                changeAvatarSucceeded: "更换头像成功",
                changeAvatarFailed: "更换头像失败",
                fetchPictureAbort: "获取本地图片的过程被中断",
                fetchPictureError: "获取本地图片的过程中出现错误"

            }

        },
        contactUs: {

            dialog: {

                title: "联系我们",
                content: "欢迎添加达哥QQ，与达哥一起探索编程世界！"

            }

        }

    }

};
