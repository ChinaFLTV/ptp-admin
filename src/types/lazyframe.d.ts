/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/8/29 PM 10:33:09
 * @filename lazyframe.d.ts
 * @description LazyFrame对应的声明文件
 *
 */

declare module "lazyframe" {


    interface LazyframeSettings {


        vendor?: string;
        id?: string;
        src?: string;
        thumbnail?: string;
        title?: string;
        initialized?: boolean;
        y?: number;
        debounce?: number;
        lazyload?: boolean;
        autoplay?: boolean;
        initinview?: boolean;
        onLoad?: (l: LazyframeElement) => void;
        onAppend?: (l: HTMLIFrameElement) => void;
        onThumbnailLoad?: (img: string) => void;


    }


    interface LazyframeElement {


        el: HTMLElement;
        settings: LazyframeSettings;
        iframe?: DocumentFragment;


    }


    interface Lazyframe {


        (elements: string | HTMLElement | HTMLElement[], options?: Partial<LazyframeSettings>): void;


    }


    const Lazyframe: Lazyframe;


    export default Lazyframe;


}
