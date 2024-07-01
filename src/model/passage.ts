/**
 *
 * @author Lenovo
 * @date 2024/2/18 下午 12:52:58
 * @filename passage.ts
 * @description 存储有关文章实体的数据
 *
 */
export default interface Passage {


    passageID: string;
    title: string;
    contentIntro: string;
    content: string;
    content_accessary: string;
    category: string;
    pubdate: string;
    browseNum: number;
    likeNum: number;
    collectNum: number;
    uid: string;
    fileType: string;
    status: string;
    config: string;
    location: string;


}
