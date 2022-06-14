<<<<<<< HEAD
import { IOwner } from "./user.interface";
=======
import { IUser } from "./user.interface";
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

export interface ITrack {
    filt: string;
    id: number;
<<<<<<< HEAD
    owners: Array<IOwner>;
=======
    owners: Array<IUser>;
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
    audio: string;
    cover: string;
    title: string;
    time: string;
}

export interface IPlaylist {
    id: number;
    audios: Array<ITrack>;
    title: string;
    cover: string;
<<<<<<< HEAD
    owners: Array<IOwner>;
=======
    owners: Array<IUser>;
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
    name: string;
}