/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/6 AM 10:31:43
 * @filename permisssion.ts
 * @description 权限校验与认证相关的存储库
 *
 */
import {defineStore} from "pinia";

export const usePermissionStore = defineStore("permission", {

    state: () => {

        let authorization: string = localStorage.getItem("authorization") ?? "BLANK AUTHORIZATION";

        return {

            authorization

        };

    },
    getters: {

        getAuthorization(): string {

            return this.authorization;

        }

    },
    actions: {

        updateAuthorization(newAuthorization: string) {

            // 2024-8-6  21:59-||与??的使用区别
            // || : 只要前面是假(falsy)值(如null、undefined、""、‘’、0),就使用后面的值
            // ?? : 只有前面的值是null或undefined的时候才启用后面的值
            this.authorization = newAuthorization || "EMPTY AUTHORIZATION";
            // 2024-8-7  18:09-持久化用户凭证信息(生命周期由 会话级 转变为 持久级)
            localStorage.setItem("authorization", newAuthorization);

        },
        removeAuthorization() {

            this.authorization = "AUTHORIZATION HAS BEEN REMOVED";
            localStorage.removeItem("authorization");

        }

    }

});
