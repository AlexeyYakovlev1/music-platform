import { IPlaylist, ITrack } from "../../interfaces/audio.interfaces";
import { IActionAudio, IActionPlaylist, IActionAllPlaylists, IActionIdx, IActionPlay, IActionFollowAudio, IActionAllFollow } from "../../interfaces/redux.interfaces";

export const setAllPlaylists = (playlists: IPlaylist[]): IActionAllPlaylists => {
    return {
        type: "SET_ALL_PLAYLISTS",
        payload: playlists
    }
}

export const setCurrentTrack = (track: ITrack, switching: boolean): IActionAudio => {
    return {
        type: "SET_CURRENT_TRACK",
        payload: track,
        switching
    }
}

export const setCurrentPlaylist = (playlist: IPlaylist): IActionPlaylist => {
    return {
        type: "SET_CURRENT_PLAYLIST",
        payload: playlist
    }
}

export const setIdxTrack = (idx: number): IActionIdx => {
    return {
        type: "SET_IDX_TRACK",
        payload: idx
    }
}

export const setAudioPlay = (play: boolean): IActionPlay => {
    return {
        type: "SET_AUDIO_PLAY",
        payload: play
    }
}

export const setAllFollow = (tracks: Array<ITrack>, playlists: Array<IPlaylist>): IActionAllFollow => {
    return {
        type: "SET_ALL_FOLLOW",
        tracks,
        playlists
    }
}

export const setFollowAudio = (follow: boolean, track: boolean, idAudio: number): IActionFollowAudio => {
    return {
        type: "SET_FOLLOW_AUDIO",
        payload: follow,
        track,
        idAudio
    }
}