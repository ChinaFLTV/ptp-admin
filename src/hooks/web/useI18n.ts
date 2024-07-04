/**
 *
 * @author Lenovo
 * @date 2024/7/3 PM 6:31:16
 * @filename useI18n.ts
 * @description 与国际化相关的工具库(主要解决异步生成I18n而导致较早获取I18n实例可能为空的情况)
 *
 */
import {i18n} from "@/plugins/vueI18n";

type I18nGlobalTranslation = {


    (key: string): string
    (key: string, locale: string): string
    (key: string, locale: string, list: unknown[]): string
    (key: string, locale: string, named: Record<string, unknown>): string
    (key: string, list: unknown[]): string
    (key: string, named: Record<string, unknown>): string


}


type I18nTranslationRestParameters = [string, any]


function getKey(namespace: string | undefined, key: string): string {

    if (!namespace)
        return key;

    if (key.startsWith(namespace))
        return key;

    return `${namespace}.${key}`;

}


export function useI18n(namespace?: string): {

    t: I18nGlobalTranslation

} {

    const normalFn = {

        t: (key: string): string => {

            return getKey(namespace, key);

        }

    };


    if (!i18n)
        return normalFn;

    const {t, ...methods} = i18n.global;

    function tFn(key: string, ...args: any[]) {

        if (!key)
            return "";

        if (!key.includes(".") && !namespace)
            return key;

        // @ts-ignore
        return t(getKey(namespace, key), ...args as I18nTranslationRestParameters);

    }

    return {

        ...methods,
        t: tFn

    };

}


export const t = (key: string) => key;
