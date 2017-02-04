export class User {

    private _authToken: string;
    public get token(): string {
        return this._authToken;
    }
    public set token(v: string) {
        this._authToken = v;
    }

    private _username: string;
    public get username(): string {
        return this._username;
    }
    public set username(v: string) {
        this._username = v;
    }
}
