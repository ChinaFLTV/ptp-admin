// 2024-2-7  16:43-解决ts文件无法识别Vue文件路径
declare module "*.vue" {

    import * as  Vue from "vue";
    export default Vue;

}

// 2024-2-15  16:31-限定Route中的meta中的字段类型
// declare module "vue-router" {
//
//     interface RouteMeta {
//
//         title: string;
//
//     }
//
// }
