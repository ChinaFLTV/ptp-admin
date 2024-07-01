import {defineStore} from "pinia";
import Administrator from "@/model/Administrator";
import {Ref} from "vue";

export const UserDataStore = defineStore("userData", {

    state: () => {

        const localUserData: Ref<Administrator> = ref(null);
        if (localStorage.getItem("localUserData") != null) {

            localUserData.value = JSON.parse(localStorage.getItem("localUserData")) as Administrator;

        }

        return {localUserData};

    },
    getters: {},
    actions: {

        updateUserData(user) {

            localStorage.setItem("localUserData", JSON.stringify(user));
            this.localUserData = user;

        },
        removeUserData() {

            localStorage.removeItem("localUserData");
            this.localUserData = null;

        },
        getUserData(): Administrator {

            const cachedUserData = localStorage.getItem("localUserData");
            if (cachedUserData === undefined) {

                return null;

            } else {

                try {

                    return JSON.parse(cachedUserData) as Administrator;

                } catch (err) {

                    console.error(err);
                    return null;

                }

            }

        }

    }


});
