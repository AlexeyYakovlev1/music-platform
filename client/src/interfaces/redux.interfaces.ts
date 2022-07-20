import { IPlaylist, ITrack } from "./audio.interfaces";
import { IUser } from "./user.interface";

export interface IDefAction { type: string };

export interface IActionAudio extends IDefAction {
    payload: ITrack;
    switching: boolean;
};

export interface IActionPlaylist extends IDefAction { payload: IPlaylist };
export interface IActionAllPlaylists extends IDefAction { payload: IPlaylist[] };
export interface IActionIdx extends IDefAction { payload: number };
export interface IActionPlay extends IDefAction { payload: boolean };
export interface IActionSearch extends IDefAction { payload: string };

export interface IActionAllFollow extends IDefAction {
    tracks: Array<ITrack>;
    playlists: Array<IPlaylist>;
};

export interface IActionFollowAudio extends IDefAction {
    payload: boolean;
    track: boolean;
    idAudio: number;
};

export interface IActionUser extends IDefAction {
    payload: IUser;
    logout: boolean;
};