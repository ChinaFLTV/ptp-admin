/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/5 PM 9:01:36
 * @filename file.ts
 * @description 文件操作相关的工具类库
 *
 */

/**
 *
 * @author Lenovo/LiGuanda
 * @date 2024/9/5 PM 9:01:47
 * @param path {string} 文件所在路径(可以是本地路径也可以是网络URI)
 * @param retainExtension {boolean} 是否保留文件拓展名(默认保留)
 * @return {string} 文件名称
 * @filename file.ts
 * @description 通过文件路径(不管是本地路径还是网络URI)获取文件的名称
 *
 */
export function getFilenameFromPath(path: string, retainExtension: boolean = true): string {

    if (!path) {

        return path;

    }

    let lastSeparatorIndex: number = path.lastIndexOf("/");

    if (lastSeparatorIndex < 0) {

        lastSeparatorIndex = path.lastIndexOf("\\");

    }

    let filename: string = path.substring(lastSeparatorIndex+1);

    if (!retainExtension) {

        const lastDotIndex: number = path.lastIndexOf(".");
        if (lastDotIndex > 0) {

            filename = filename.substring(0, lastDotIndex);

        }

    }

    return filename;

}
