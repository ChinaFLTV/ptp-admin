/**
 *
 * @author Lenovo
 * @date 2024/7/1 PM 9:22:50
 * @filename MediaOperationType.ts
 * @description 媒体内容操作类型的枚举类
 *
 */

export enum MediaOperationType {


    GET_STREAM = 1101, // get the input stream of a file
    DOWNLOAD = 1102, // download a file
    DOWNLOAD_BATCH = 1103, // download multiple files in a batch
    UPDATE = 1104, // update a file
    DELETE = 1105, // delete a file
    DELETE_BATCH = 1106 // delete multiple files in a batch


}
