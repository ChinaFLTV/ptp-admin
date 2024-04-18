/**
 *
 * @author
 * @date 2024/2/9 下午 11:44:25
 * @filename Routes.ts
 * @description 标记主要的Route
 *
 */
import Login from "@/views/person/login.vue";
import MainPage from "@/components/main/MainPage.vue";
import Profile from "@/views/person/Profile.vue";
import Empty from "@/views/common/empty.vue";
import DashBoard from "@/views/content/DashBoard.vue";
import ContentManage from "@/views/content/ContentManage.vue";
import UserManage from "@/views/content/UserManage.vue";
import VersionControl from "@/views/content/VersionControl.vue";


export const routes = [

    {

        path: "/main",
        name: "main",
        component: MainPage,
        children: [

            {

                path: "empty",
                name: "empty",
                component: Empty,
                meta: {

                    title: "空白页"

                }

            }, {

                path: "user",
                name: "user",
                children: [

                    {

                        path: "profile",
                        name: "profile",
                        component: Profile,
                        meta: {

                            title: "个人信息"

                        }

                    }

                ]

            }, {

                path: "/content",
                name: "content",
                children: [

                    {

                        path: "dashboard",
                        name: "dashboard",
                        component: DashBoard,
                        meta: {

                            title: "仪表盘"

                        }

                    }, {

                        path: "contentmanage",
                        name: "contentManage",
                        component: ContentManage,
                        meta: {

                            title: "数据管理"

                        }

                    }, {

                        path: "usermanage",
                        name: "userManage",
                        component: UserManage,
                        meta: {

                            title: "用户管理"

                        }

                    }, {

                        path: "versioncontrol",
                        name: "versionControl",
                        component: VersionControl,
                        meta: {

                            title: "版本控制"

                        }


                    }

                ]

            }

        ]

    }, {

        path: "/login",
        name: "login",
        component: Login,
        meta: {

            title: "用户登录"

        }

    }

];
