/**
 *
 * @author
 * @date 2024/2/9 下午 11:44:25
 * @filename Routes.ts
 * @description 标记主要的Route
 *
 */
import Login from "@/layout/login/index.vue";
import MainPage from "@/layout/content/MainPage.vue";
import Profile from "@/layout/content/Profile.vue";
import Empty from "@/components/status/empty/empty.vue";
import DashBoard from "@/layout/content/DashBoard.vue";
import ContentManage from "@/layout/content/ContentManage.vue";
import UserManage from "@/layout/content/UserManage.vue";
import VersionControl from "@/layout/content/VersionControl.vue";
import {useI18n} from "@/hooks/web/useI18n";

const { t } = useI18n()


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

                            title: t("common.bar.side.dashboard")

                        }

                    }, {

                        path: "contentmanage",
                        name: "contentManage",
                        component: ContentManage,
                        meta: {

                            title: t("common.bar.side.contentManage")

                        }

                    }, {

                        path: "usermanage",
                        name: "userManage",
                        component: UserManage,
                        meta: {

                            title: t("common.bar.side.userManage")

                        }

                    }, {

                        path: "versioncontrol",
                        name: "versionControl",
                        component: VersionControl,
                        meta: {

                            title: t("common.bar.side.versionControl")

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

            title: t("login.loginTitle")

        }

    }

];
