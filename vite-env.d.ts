// 2024-2-7  16:43-解决ts文件无法识别Vue文件路径
declare module "*.vue" {

    import * as  Vue from "vue";
    export default Vue;

}

