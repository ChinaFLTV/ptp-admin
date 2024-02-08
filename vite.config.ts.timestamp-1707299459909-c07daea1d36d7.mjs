// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/WebProjects/ptp-admin/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/WebProjects/ptp-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/WebProjects/ptp-admin/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/WebProjects/ptp-admin/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/WebProjects/ptp-admin/node_modules/unplugin-vue-components/dist/resolvers.js";
import Icons from "file:///D:/WebProjects/ptp-admin/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///D:/WebProjects/ptp-admin/node_modules/unplugin-icons/dist/resolver.js";
var __vite_injected_original_import_meta_url = "file:///D:/WebProjects/ptp-admin/vite.config.ts";
var vite_config_default = defineConfig({
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
          enabledCollections: ["ep"]
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
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      // @ts-ignore
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  // 2024-2-6  16:23-启用Vite热更新功能
  server: {
    host: "localhost",
    hmr: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWJQcm9qZWN0c1xcXFxwdHAtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFdlYlByb2plY3RzXFxcXHB0cC1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovV2ViUHJvamVjdHMvcHRwLWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7Ly8gQHRzLWlnbm9yZVxuaW1wb3J0IHtmaWxlVVJMVG9QYXRoLCBVUkx9IGZyb20gXCJub2RlOnVybFwiO1xuXG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQge0VsZW1lbnRQbHVzUmVzb2x2ZXJ9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIjtcbmltcG9ydCBJY29ucyBmcm9tIFwidW5wbHVnaW4taWNvbnMvdml0ZVwiO1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSBcInVucGx1Z2luLWljb25zL3Jlc29sdmVyXCI7XG5cblxuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkR2xvYmFsU3ltYm9sc1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblxuICAgIHBsdWdpbnM6IFtcblxuICAgICAgICB2dWUoKSxcbiAgICAgICAgLy8gMjAyNC0yLTYgIDE2OjM0LUVsZW1lbnRQbHVzXHU1RjAwXHU2RTkwXHU1RTkzXHU2MjQwXHU5NzAwXHU5MTREXHU3RjZFXG4gICAgICAgIEF1dG9JbXBvcnQoe1xuXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXG5cbiAgICAgICAgfSksXG4gICAgICAgIENvbXBvbmVudHMoe1xuXG4gICAgICAgICAgICByZXNvbHZlcnM6IFtcblxuICAgICAgICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3RUM0XHU0RUY2XG4gICAgICAgICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogW1wiZXBcIl1cblxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIF1cblxuICAgICAgICB9KSxcbiAgICAgICAgLy8gMjAyNC0yLTcgIDEyOjIzLVx1NjVCMFx1NTg5RVx1OTE0RFx1N0Y2RVxuICAgICAgICBBdXRvSW1wb3J0KHtcblxuICAgICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IFZ1ZSBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFyZWYsIHJlYWN0aXZlLCB0b1JlZiBcdTdCNDlcbiAgICAgICAgICAgIGltcG9ydHM6IFtcInZ1ZVwiXSxcbiAgICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKFx1NUUyNlx1NjgzN1x1NUYwRilcbiAgICAgICAgICAgIHJlc29sdmVyczogW1xuXG4gICAgICAgICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogXCJpY29uXCJcblxuICAgICAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgXVxuXG5cbiAgICAgICAgfSksXG4gICAgICAgIEljb25zKHtcblxuICAgICAgICAgICAgYXV0b0luc3RhbGw6IHRydWVcblxuICAgICAgICB9KVxuXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG5cbiAgICAgICAgYWxpYXM6IHtcblxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpXG5cbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICAvLyAyMDI0LTItNiAgMTY6MjMtXHU1NDJGXHU3NTI4Vml0ZVx1NzBFRFx1NjZGNFx1NjVCMFx1NTI5Rlx1ODBGRFxuICAgIHNlcnZlcjoge1xuXG4gICAgICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXG4gICAgICAgIGhtcjogdHJ1ZVxuXG4gICAgfVxuXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFRLGVBQWUsV0FBVTtBQUVqQyxTQUFRLG9CQUFtQjtBQUMzQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUSwyQkFBMEI7QUFDbEMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBVG1JLElBQU0sMkNBQTJDO0FBYTlNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBRXhCLFNBQVM7QUFBQSxJQUVMLElBQUk7QUFBQTtBQUFBLElBRUosV0FBVztBQUFBLE1BRVAsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFFckMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BRVAsV0FBVztBQUFBO0FBQUEsUUFHUCxvQkFBb0I7QUFBQTtBQUFBLFFBRXBCLGNBQWM7QUFBQSxVQUVWLG9CQUFvQixDQUFDLElBQUk7QUFBQSxRQUU3QixDQUFDO0FBQUEsTUFFTDtBQUFBLElBRUosQ0FBQztBQUFBO0FBQUEsSUFFRCxXQUFXO0FBQUE7QUFBQSxNQUdQLFNBQVMsQ0FBQyxLQUFLO0FBQUE7QUFBQSxNQUVmLFdBQVc7QUFBQSxRQUVQLG9CQUFvQjtBQUFBO0FBQUEsUUFFcEIsY0FBYztBQUFBLFVBRVYsUUFBUTtBQUFBLFFBRVosQ0FBQztBQUFBLE1BR0w7QUFBQSxJQUdKLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxNQUVGLGFBQWE7QUFBQSxJQUVqQixDQUFDO0FBQUEsRUFFTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBRUwsT0FBTztBQUFBO0FBQUEsTUFHSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBRXhEO0FBQUEsRUFFSjtBQUFBO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFFSixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsRUFFVDtBQUVKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
