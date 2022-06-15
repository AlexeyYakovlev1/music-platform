import { IOwner } from "./user.interface";

export interface ITrack {
    filt: string;
    id: number;
    owners: Array<IOwner>;
    audio: string;
    cover: string;
    title: string;
    duration: string;
}

export interface IPlaylist {
    id: number;
    audios: Array<ITrack>;
    title: string;
    cover: string;
    owners: Array<IOwner>;
    name: string;
}