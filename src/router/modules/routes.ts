/**
 *
 * @author
 * @date 2024/2/9 下午 11:44:25
 * @filename routes.ts
 * @description 标记主要的Route
 *
 */
import Login from "@/pages/login/login.vue";
import MainPage from "@/layout/MainLayout.vue";
import Profile from "@/pages/profile/profile.vue";
import Empty from "@/pages/status/empty.vue";


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

                    titleKey: "common.page.blankPage"

                }

            },
            {

                path: "profile",
                name: "profile",
                component: Profile,
                meta: {

                    titleKey: "common.bar.top.profile"

                }

            }

        ]

    }, {

        path: "/login",
        name: "login",
        component: Login,
        meta: {

            titleKey: "login.loginTitle"

        }

    }

];
