/**
 *
 * @author Lenovo
 * @date 2024/2/18 下午 12:52:58
 * @filename passage.ts
 * @description 存储有关文章实体的数据
 *
 */
export default class Passage {


    public passageID: string;
    public title: string;
    public contentIntro: string;
    public content: string;
    public content_accessary: string;
    public category: string;
    public pubdate: string;
    public browseNum: number;
    public likeNum: number;
    public collectNum: number;
    public uid: string;
    public fileType: string;
    public status: string;
    public config: string;
    public location: string;


    constructor(passageID: string, title: string, contentIntro: string, content: string, content_accessary: string, category: string, pubdate: string, browseNum: number, likeNum: number, collectNum: number, uid: string, fileType: string, status: string, config: string, location: string) {
        this.passageID = passageID;
        this.title = title;
        this.contentIntro = contentIntro;
        this.content = content;
        this.content_accessary = content_accessary;
        this.category = category;
        this.pubdate = pubdate;
        this.browseNum = browseNum;
        this.likeNum = likeNum;
        this.collectNum = collectNum;
        this.uid = uid;
        this.fileType = fileType;
        this.status = status;
        this.config = config;
        this.location = location;
    }

    public getPassageID(): string {
        return this.passageID;
    }

    public setPassageID(passageID: string): void {
        this.passageID = passageID;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getContentIntro(): string {
        return this.contentIntro;
    }

    public setContentIntro(contentIntro: string): void {
        this.contentIntro = contentIntro;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public getContent_accessary(): string {
        return this.content_accessary;
    }

    public setContent_accessary(content_accessary: string): void {
        this.content_accessary = content_accessary;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }

    public getPubdate(): string {
        return this.pubdate;
    }

}
