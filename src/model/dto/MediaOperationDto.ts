/**
 *
 * @author Lenovo
 * @date 2024/6/30 PM 11:47:39
 * @filename MediaOperationDto.ts
 * @description 媒体OSS的操作的DTO
 *
 */
import {MediaOperationType} from "@/enums/MediaOperationType";

export default class MediaOperationDto {


    region?: String;
    bucketName?: String;
    storePath?: String;
    file?: File;
    mediaOperationType?: MediaOperationType;


}
