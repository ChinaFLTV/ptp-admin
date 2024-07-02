// @ts-ignore
import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import {FileSystemIconLoader} from "unplugin-icons/loaders";


// noinspection JSUnusedGlobalSymbols
export default defineConfig({

    plugins: [

        vue(),
        // 2024-2-6  16:34-ElementPlus开源库所需配置
        AutoImport({

            resolvers: [ElementPlusResolver()]

        }),
        Components({

            resolvers: [

                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({

                    enabledCollections: ["ep", "my"]

                })

            ]

        }),
        // 2024-2-7  12:23-新增配置
        AutoImport({

            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ["vue"],
            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [

                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({

                    prefix: "icon"

                })


            ]


        }),
        // 2024-7-2  22:24-Iconify的详细使用说明 : https://www.cnblogs.com/lovewhatIlove/p/17196751.html
        Icons({

            compiler: "vue3",
            autoInstall: true,
            customCollections: {

                // 2024-7-2  22:23-使用规则是{prefix}-{my}-{add} , prefix没写默认是i , 如果prefix是false的话则是<my-add />、<myAdd />、 <MyAdd /> , my是设置在vite.config.js的集合名称 , add是目录里面的svg文件名称
                "my": FileSystemIconLoader("./src/assets/icons", svg => svg.replace(/^<svg /, "<svg fill=\"currentColor\" "))

            }

        })

    ],
    resolve: {

        alias: {

            // @ts-ignore
            "@": fileURLToPath(new URL("./src", import.meta.url))

        }

    },
    // 2024-2-6  16:23-启用Vite热更新功能
    server: {

        host: "localhost",
        hmr: true

    }

});
