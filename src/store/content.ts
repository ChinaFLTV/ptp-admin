import {defineStore} from "pinia";

/**
 *
 * @author Lenovo
 * @date 2024/2/17 下午 10:02:29
 * @filename content.ts
 * @description 存储有关内容实体的数据
 *
 */
export const ContentStore = defineStore("contentStore", {

    state: () => {

        const passageTitles: string[] = ["文章ID", "标题", "文章引子", "文章内容", "内容附件", "文章类别", "发布日期", "浏览量", "点赞量", "收藏量", "发布用户ID", "内容文件类型", "文章状态", "配置", "发布地点"];
        const passageProperties: string[] = ["passageID", "title", "contentIntro", "content", "content_accessary", "category", "pubdate", "browseNum", "likeNum", "collectNum", "uid", "fileType", "status", "config", "location"];
        return {

            passageTitles, passageProperties

        };

    },
    getters: {},
    actions: {}

});
