import { IPlaylist, ITrack } from "../../interfaces/audio.interfaces";
import { IActionAudio, IActionPlaylist, IActionAllPlaylists, IActionIdx } from "../../interfaces/redux.interfaces";

interface IInitialState {
    currentTrack: ITrack;
    currentPlaylist: IPlaylist;
    idxTrack: number;
    playlists: IPlaylist[];
    audioPlay: boolean;
}

const initialState: IInitialState = {
    currentTrack: {
        duration: "00:00",
        filt: "",
        title: "",
        id: -1,
        owners: [
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: ""
            }
        ],
        audio: "",
        cover: ""
    },
    currentPlaylist: {
        name: "",
        id: -1,
        title: "",
        owners: [
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: ""
            }
        ],
        audios: [
            {
                duration: "00:00",
                filt: "",
                title: "",
                id: -1,
                owners: [
                    {
                        id: -1,
                        name: "",
                        audios: [],
                        filts: [],
                        avatar: ""
                    }
                ],
                audio: "",
                cover: ""
            }
        ],
        cover: ""
    },
    idxTrack: 0,
    playlists: [{
        name: "",
        id: -1,
        title: "",
        owners: [
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: ""
            }
        ],
        audios: [
            {
                duration: "00:00",
                filt: "",
                title: "",
                id: -1,
                owners: [
                    {
                        id: -1,
                        name: "",
                        audios: [],
                        filts: [],
                        avatar: ""
                    }
                ],
                audio: "",
                cover: ""
            }
        ],
        cover: ""
    }],
    audioPlay: false
};

type TAction = IActionAudio | IActionPlaylist | IActionAllPlaylists | IActionIdx;

const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
const SET_CURRENT_PLAYLIST = "SET_CURRENT_PLAYLIST";
const SET_IDX_TRACK = "SET_IDX_TRACK";
const SET_ALL_PLAYLISTS = "SET_ALL_PLAYLISTS";
const SET_AUDIO_PLAY = "SET_AUDIO_PLAY";

function audioReducer(state = initialState, action: TAction) {
    switch (action.type) {
        case SET_CURRENT_TRACK:
            const obj = { ...state, currentTrack: action.payload };
            const currentAction: any = action;

            if (currentAction.switching) return obj;

            const selectTrack: any = action.payload;
            const trackInPlaylist = state.currentPlaylist.audios.filter(item => item.id === selectTrack.id);

            if (trackInPlaylist.length) {
                obj["audioPlay"] = !state.audioPlay;
            } else {
                obj["audioPlay"] = true;
            }

            return obj;
        case SET_CURRENT_PLAYLIST:
            const playlist: any = action.payload;
            return {
                ...state,
                currentPlaylist: action.payload,
                currentTrack: playlist.audios[0]
            };
        case SET_IDX_TRACK:
            return {
                ...state,
                idxTrack: action.payload
            };
        case SET_ALL_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
            }
        case SET_AUDIO_PLAY:
            return {
                ...state,
                audioPlay: action.payload
            }
        default:
            return state;
    }
}

export default audioReducer;