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


export const routes = [

    {

        path: "/user/login",
        name: "login",
        component: Login

    },
    {

        path: "/main",
        name: "main",
        component: MainPage

    },
    {

        path: "/user/profile",
        name: "profile",
        component: Profile

    }

];
