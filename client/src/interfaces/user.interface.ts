export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface IOwner {
    id: number;
    name: string;
    audios: Array<number>;
    filts: Array<string>;
    avatar: string;
}