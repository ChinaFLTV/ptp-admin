/**
 *
 * @author
 * @date 2024/2/9 下午 11:44:25
 * @filename routes.ts
 * @description 标记主要的Route
 *
 */


export const routes = [

    {

        component: () => import("@/layout/MainLayout.vue"),
        path: "/main",
        name: "main",
        children: [

            {

                path: "empty",
                name: "empty",
                component: () => import("@/pages/status/empty.vue"),
                meta: {

                    titleKey: "common.page.blankPage"

                }

            },
            {

                path: "profile",
                name: "profile",
                component: () => import("@/pages/profile/profile.vue"),
                meta: {

                    titleKey: "common.bar.top.profile"

                }

            },
            {

                // 2024-8-11  16:19-聊天室界面
                path: "chat-room",
                component: () => import("@/pages/chat/room/ChatRoom.vue"),
                name: "chat-room",
                meta: {

                    titleKey: "common.bar.top.chatRoom"

                }

            },
            {

                path: "browse",
                name: "browse",
                // 2024-8-30  21:41-减小入口文件体积 : 采用动态函数加载路由的形式 , 各自的路由文件将会被分别打包 , 这有在解析指定路由时才会加载路由组件 , 这样可以使得入口文件变小 , 首屏加载速度大大提高
                component: () => import("@/pages/browser/Browser.vue")

            },
            // 2024-8-30  22:17-娱乐活动界面
            {

                path: "entertainment",
                name: "entertainment",
                component: () => import("@/pages/entertainment/Entertainment.vue")

            }

        ]

    }, {

        path: "/login",
        name: "login",
        component: () => import("@/pages/login/login.vue"),
        meta: {

            titleKey: "login.loginTitle"

        }

    }

];
