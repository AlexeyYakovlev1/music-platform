import { getOneTrack } from "src/http/tracks.http";
import { IPlaylist, ITrack } from "../../interfaces/audio.interfaces";
import { IActionAudio, IActionPlaylist, IActionAllPlaylists, IActionIdx } from "../../interfaces/redux.interfaces";

interface IFollow {
    playlists: Array<IPlaylist>;
    tracks: Array<ITrack>;
}

interface IInitialState {
    currentTrack: ITrack;
    currentPlaylist: IPlaylist;
    idxTrack: number;
    playlists: IPlaylist[];
    audioPlay: boolean;
    follow: IFollow;
}

const initialState: IInitialState = {
    follow: {
        playlists: [{
            follow: false,
            name: "",
            id: -1,
            title: "",
            owners: [
                {
                    id: -1,
                    name: "",
                    audios: [],
                    filts: [],
                    avatar: "",
                    playlists: []
                }
            ],
            audios: [
                {
                    follow: false,
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
                            avatar: "",
                            playlists: []
                        }
                    ],
                    audio: "",
                    cover: ""
                }
            ],
            cover: ""
        }],
        tracks: [{
            follow: false,
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
                    avatar: "",
                    playlists: []
                }
            ],
            audio: "",
            cover: ""
        }]
    },
    currentTrack: {
        follow: false,
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
                avatar: "",
                playlists: []
            }
        ],
        audio: "",
        cover: ""
    },
    currentPlaylist: {
        follow: false,
        name: "",
        id: -1,
        title: "",
        owners: [
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: "",
                playlists: []
            }
        ],
        audios: [
            {
                follow: false,
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
                        avatar: "",
                        playlists: []
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
        follow: false,
        name: "",
        id: -1,
        title: "",
        owners: [
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: "",
                playlists: []
            }
        ],
        audios: [
            {
                follow: false,
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
                        avatar: "",
                        playlists: []
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
const SET_FOLLOW_AUDIO = "SET_FOLLOW_AUDIO";

function audioReducer(state = initialState, action: TAction) {
    switch (action.type) {
        case SET_FOLLOW_AUDIO:
            const followAction: any = action;

            if (followAction.track) {
                let allTracks: any = [];

                for (let i = 0; i < state.playlists.length; i++)
                    allTracks = allTracks.concat(state.playlists[i].audios);

                const findTrack = allTracks.filter((trackId: number) => +followAction.idAudio === +trackId);
                const idxFindTrack: number = state.follow.tracks.findIndex((track: ITrack) => track.id === findTrack[0]);

                // track unfollow
                if (!followAction.payload) {
                    state.follow.tracks.splice(idxFindTrack, 1);

                    return { ...state };
                }

                getOneTrack(findTrack[0]).then((response: any) => {
                    const currentTrack = response.data.track;
                    currentTrack.follow = followAction.payload;

                    const newFollowTracks: Array<ITrack> = [currentTrack];

                    for (let i = 0; i < state.follow.tracks.length; i++) {
                        const track = state.follow.tracks[i];
                        if (track.id !== findTrack[0].id) newFollowTracks.push(track);
                    }

                    return { ...state, follow: { ...state.follow, tracks: newFollowTracks } };
                });
            } else {
                // for playlist...
            }

            return { ...state };
        case SET_CURRENT_TRACK:
            const obj = { ...state, currentTrack: action.payload };
            const currentAction: any = action;

            if (currentAction.switching) return obj;

            const selectTrack: any = action.payload;
            const trackInPlaylist = state.currentPlaylist.audios.filter(item => item.id === selectTrack.id);

            if (trackInPlaylist.length) obj["audioPlay"] = !state.audioPlay;
            else obj["audioPlay"] = true;

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