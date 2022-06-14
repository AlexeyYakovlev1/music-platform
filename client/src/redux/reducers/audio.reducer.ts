import { IPlaylist, ITrack } from "../../interfaces/audio.interfaces";
import { IActionAudio, IActionPlaylist, IActionAllPlaylists, IActionIdx } from "../../interfaces/redux.interfaces";

<<<<<<< HEAD
=======
// music
import GhScVl from "../../templates/audio/GHOSTEMANE,Scarlxrd-Vladika.mp3";
import GhScNg from "../../templates/audio/GHOSTEMANE,Scarlxrd-Navsegda.mp3";
import GhScMg from "../../templates/audio/GHOSTEMANE,Scarlxrd-Mag.mp3";
import GhVg from "../../templates/audio/Ghostemane-Vagabond.mp3";
import GhAi from "../../templates/audio/Ghostemane-AI.mp3";
import GhFu from "../../templates/audio/Ghostemane-FedUp.mp3";
import Ty from "../../templates/audio/Dido - Thank You (megasongs.me).mp3";
import SaS from "../../templates/audio/09_-_Safe_and_Sound_-_Capital_Cities.mp3";
import FmM from "../../templates/audio/--b2mjbuv-o-fly-me-to-the-moon---lofi-cover-prod-yungrhythm.m4a";
import ClM from "../../templates/audio/90sFlav – Call me.mp3";

>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
interface IInitialState {
    currentTrack: ITrack;
    currentPlaylist: IPlaylist;
    idxTrack: number;
    playlists: IPlaylist[];
    audioPlay: boolean;
}

const initialState: IInitialState = {
    currentTrack: {
        time: "00:00",
        filt: "",
        title: "",
        id: -1,
        owners: [
<<<<<<< HEAD
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: ""
            }
=======
            { id: -1, name: "", email: "", password: "", avatar: "" }
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
        ],
        audio: "",
        cover: ""
    },
    currentPlaylist: {
        name: "",
        id: -1,
        title: "",
        owners: [
<<<<<<< HEAD
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: ""
            }
=======
            { id: -1, name: "", email: "", password: "", avatar: "" }
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
        ],
        audios: [
            {
                time: "00:00",
                filt: "",
                title: "",
                id: -1,
                owners: [
<<<<<<< HEAD
                    {
                        id: -1,
                        name: "",
                        audios: [],
                        filts: [],
                        avatar: ""
                    }
=======
                    { id: -1, name: "", email: "", password: "", avatar: "" }
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
                ],
                audio: "",
                cover: ""
            }
        ],
        cover: ""
    },
    idxTrack: 0,
<<<<<<< HEAD
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
                time: "00:00",
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
=======
    playlists: [
        {
            name: "lofi",
            id: 85,
            title: "Lofi",
            owners: [
                { id: 863, name: "Capital Cities", email: "cs@gmail.com", password: "i843lk", avatar: "https://avatars.yandex.net/get-music-user-playlist/71140/1034563997.1000.86597/200x200?1617267585858" },
            ],
            audios: [
                {
                    time: "00:00",
                    filt: "lofi",
                    title: "Thank You",
                    id: 950,
                    owners: [
                        { id: 863, name: "Capital Cities", email: "cs@gmail.com", password: "i843lk", avatar: "https://avatars.yandex.net/get-music-user-playlist/71140/1034563997.1000.86597/200x200?1617267585858" },
                    ],
                    audio: Ty,
                    cover: "https://upload.wikimedia.org/wikipedia/ru/7/72/Didothankyou.jpg"
                },
                {
                    time: "00:00",
                    filt: "lofi",
                    title: "Safe and Sound",
                    id: 849,
                    owners: [
                        { id: 863, name: "Capital Cities", email: "cs@gmail.com", password: "i843lk", avatar: "https://avatars.yandex.net/get-music-user-playlist/71140/1034563997.1000.86597/200x200?1617267585858" },
                    ],
                    audio: SaS,
                    cover: "https://avatars.yandex.net/get-music-content/2433821/bdb77ed6.a.1953677-2/m1000x1000"
                },
                {
                    time: "00:00",
                    filt: "lofi",
                    title: "Fly me to the moon",
                    id: 321,
                    owners: [
                        { id: 863, name: "Capital Cities", email: "cs@gmail.com", password: "i843lk", avatar: "https://avatars.yandex.net/get-music-user-playlist/71140/1034563997.1000.86597/200x200?1617267585858" },
                    ],
                    audio: FmM,
                    cover: "https://i1.sndcdn.com/artworks-000124398962-pzh6l8-t500x500.jpg"
                },
                {
                    time: "00:00",
                    filt: "lofi",
                    title: "90sFlav – Call me",
                    id: 859,
                    owners: [
                        { id: 863, name: "90sFlav", email: "sf@gmail.com", password: "93ldj", avatar: "https://avatars.yandex.net/get-music-content/117546/1e684161.a.6096950-1/150x150" },
                    ],
                    audio: ClM,
                    cover: "https://avatars.yandex.net/get-music-content/117546/1e684161.a.6096950-1/150x150"
                }
            ],
            cover: "https://avatars.yandex.net/get-music-user-playlist/71140/1034563997.1000.86597/200x200?1617267585858"
        },
        {
            name: "ghostemane",
            id: 23,
            title: "LXRDMAGE",
            owners: [
                { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                { id: 473, name: "Scarlxrd", email: "sca@gmail.com", password: "djsadjnkj", avatar: "https://yt3.ggpht.com/fUURpYxD6ahN54w759yWSFNEi-m1ysahAq2slbmvRS6R7KsCGfqQEkJA6YBXaHJBW7qDSXMI_A=s900-c-k-c0x00ffffff-no-rj" }
            ],
            audios: [
                {
                    time: "00:00",
                    filt: "ghostemane",
                    title: "владыка",
                    id: 832,
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                        { id: 473, name: "Scarlxrd", email: "sca@gmail.com", password: "djsadjnkj", avatar: "https://yt3.ggpht.com/fUURpYxD6ahN54w759yWSFNEi-m1ysahAq2slbmvRS6R7KsCGfqQEkJA6YBXaHJBW7qDSXMI_A=s900-c-k-c0x00ffffff-no-rj" }
                    ],
                    audio: GhScVl,
                    cover: "https://avatars.yandex.net/get-music-content/5282321/526c8737.a.17111695-1/200x200"
                },
                {
                    time: "00:00",
                    filt: "ghostemane",
                    title: "навсегда",
                    id: 849,
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                        { id: 473, name: "Scarlxrd", email: "sca@gmail.com", password: "djsadjnkj", avatar: "https://yt3.ggpht.com/fUURpYxD6ahN54w759yWSFNEi-m1ysahAq2slbmvRS6R7KsCGfqQEkJA6YBXaHJBW7qDSXMI_A=s900-c-k-c0x00ffffff-no-rj" }
                    ],
                    audio: GhScNg,
                    cover: "https://avatars.yandex.net/get-music-content/5282321/526c8737.a.17111695-1/200x200"
                },
                {
                    time: "00:00",
                    filt: "ghostemane",
                    title: "маг",
                    id: 321,
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                        { id: 473, name: "Scarlxrd", email: "sca@gmail.com", password: "djsadjnkj", avatar: "https://yt3.ggpht.com/fUURpYxD6ahN54w759yWSFNEi-m1ysahAq2slbmvRS6R7KsCGfqQEkJA6YBXaHJBW7qDSXMI_A=s900-c-k-c0x00ffffff-no-rj" }
                    ],
                    audio: GhScMg,
                    cover: "https://avatars.yandex.net/get-music-content/5282321/526c8737.a.17111695-1/200x200"
                }
            ],
            cover: "https://avatars.yandex.net/get-music-content/5282321/526c8737.a.17111695-1/200x200"
        },
        {
            name: "ghostemane",
            id: 84,
            title: "ANTI-ICON",
            owners: [
                { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" }
            ],
            audios: [
                {
                    time: "00:00",
                    filt: "ghostemane",
                    title: "Vagabond",
                    id: 123,
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                    ],
                    audio: GhVg,
                    cover: "https://avatars.yandex.net/get-music-content/2442093/4bde5d14.a.12486640-1/200x200"
                },
                {
                    time: "00:00",
                    filt: "ghostemane",
                    title: "AI",
                    id: 930,
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                    ],
                    audio: GhAi,
                    cover: "https://avatars.yandex.net/get-music-content/2442093/4bde5d14.a.12486640-1/200x200"
                },
                {
                    time: "00:00",
                    filt: "ghostemane",
                    title: "Fed up",
                    id: 753,
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                    ],
                    audio: GhFu,
                    cover: "https://avatars.yandex.net/get-music-content/2442093/4bde5d14.a.12486640-1/200x200"
                }
            ],
            cover: "https://avatars.yandex.net/get-music-content/2442093/4bde5d14.a.12486640-1/200x200"
        }
    ],
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
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