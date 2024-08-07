import {defineStore} from "pinia";
import {Ref} from "vue";
import {User} from "@/model/po/manage/User";

export const UserDataStore = defineStore("userData", {

    state: () => {

        const localUserData: Ref<User> = ref(null);
        if (localStorage.getItem("localUserData") != null) {

            localUserData.value = JSON.parse(localStorage.getItem("localUserData")) as User;

        }

        return {localUserData};

    },
    getters: {},
    actions: {

        updateUserData(user: User) {

            localStorage.setItem("localUserData", JSON.stringify(user));
            this.localUserData = user;

        },
        removeUserData() {

            localStorage.removeItem("localUserData");
            this.localUserData = null;

        },
        getUserData(): User {

            const cachedUserData = localStorage.getItem("localUserData");
            if (cachedUserData === undefined) {

                return null;

            } else {

                try {

                    return JSON.parse(cachedUserData) as User;

                } catch (err) {

                    console.error(err);
                    return null;

                }

            }

        }

    }


});
