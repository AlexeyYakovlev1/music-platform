import { IPlaylist, ITrack } from "./audio.interfaces";

export interface IDefAction {
    type: string;
}

export interface IActionAudio extends IDefAction {
    payload: ITrack;
    switching: boolean;
}

export interface IActionPlaylist extends IDefAction {
    payload: IPlaylist;
}

export interface IActionAllPlaylists extends IDefAction {
    payload: IPlaylist[];
}

export interface IActionIdx extends IDefAction {
    payload: number;
}

export interface IActionPlay extends IDefAction {
    payload: boolean;
}