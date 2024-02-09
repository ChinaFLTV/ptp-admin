/**
 *
 * @author LiGuanda
 * @date 2024/2/9 下午 3:44:54
 * @description 用于作为超级管理员类实体
 * @class Administrator
 * @filename Administrator.ts
 *
 */

export default class Administrator {


    private readonly id: number;
    private _account: string;
    private _password: string = "";
    private _role: string = "low";
    private _level: number = 0;
    private _nickname: string = "";
    private _avatar: string = "";
    private _registerDate: number;
    private _sex: string = "secret";
    private _address: string = "";
    private _realname: string;
    private _credit: number = 100;
    private _addition: string;


    public constructor() {

    }


    public get account(): string {

        return this._account;

    }


    public set account(_account: string) {

        this._account = _account;

    }


    public get password(): string {

        return this._password;

    }


    public set password(_password: string) {

        this._password = _password;

    }


    public get role(): string {

        return this._role;

    }


    public set role(value: string) {

        this._role = value;

    }

    public get level(): number {

        return this._level;

    }


    public set level(value: number) {

        this._level = value;

    }


    public get nickname(): string {

        return this._nickname;

    }


    public set nickname(value: string) {

        this._nickname = value;

    }


    public get avatar(): string {

        return this._avatar;

    }


    public set avatar(value: string) {

        this._avatar = value;

    }


    public get registerDate(): number {

        return this._registerDate;

    }


    public set registerDate(value: number) {

        this._registerDate = value;

    }


    public get sex(): string {

        return this._sex;

    }


    public set sex(value: string) {

        this._sex = value;

    }


    public get address(): string {

        return this._address;

    }


    public set address(value: string) {

        this._address = value;

    }


    public get realname(): string {

        return this._realname;

    }


    public set realname(value: string) {

        this._realname = value;

    }


    public get credit(): number {

        return this._credit;

    }


    public set credit(value: number) {

        this._credit = value;

    }


    public get addition(): string {

        return this._addition;

    }


    public set addition(value: string) {

        this._addition = value;

    }


}
