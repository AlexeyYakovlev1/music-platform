import React from "react";
import classes from "./Pages.module.sass";
import MainLayout from "../components/Layouts/MainLayout";
import { NavLink, useParams } from "react-router-dom";
import Button from "../components/UI/Button/Button";
import { IPlaylist, ITrack } from "../interfaces/audio.interfaces";
import { ReactComponent as PlayIcon } from "../templates/svgs/play.svg";
import { ReactComponent as PauseIcon } from "../templates/svgs/pause.svg"; 
import { ReactComponent as LikeIcon } from "../templates/svgs/like.svg";
import cn from "classnames";
<<<<<<< HEAD
import Track from "../components/Track/Track";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentPlaylist } from "../redux/actions/audio.actions";
import { getInfo } from "src/http/playlists.http";
import useMounted from "src/hooks/useIsMounted";
=======

import GhScVl from "../templates/audio/GHOSTEMANE,Scarlxrd-Vladika.mp3";
import GhScNg from "../templates/audio/GHOSTEMANE,Scarlxrd-Navsegda.mp3";
import GhScMg from "../templates/audio/GHOSTEMANE,Scarlxrd-Mag.mp3";
import Track from "../components/Track/Track";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentPlaylist } from "../redux/actions/audio.actions";
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

const Playlist = (): JSX.Element => {
    const { id } = useParams();
    const { currentTrack, currentPlaylist, audioPlay } = useSelector((state: any) => state.audio);
    const dispatch = useDispatch();

    const [activePlaylist, setActivePlaylist] = React.useState<boolean>(currentPlaylist.id === id);
<<<<<<< HEAD
    const [playlist, setPlaylist] = React.useState<IPlaylist>({
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
    });
    const [playShow, setPlayShow] = React.useState(playlist.audios.some((audio: any) => audio.id === +currentTrack.id));
    const isMounted = useMounted();

    React.useEffect(() => {
        if (id && isMounted) {
            getInfo(+id).then((response: any) => {
                setPlaylist({
                    ...response.data.playlist,
                    audios: response.data.audios,
                    owners: response.data.owners
                });
            });
            setActivePlaylist(currentPlaylist.id === +id);
        }

        // eslint-disable-next-line
    }, [isMounted, currentPlaylist, id, audioPlay, currentTrack]);

    React.useEffect(() => {
        if (isMounted) {
            setPlayShow(playlist.audios.some((audio: any) => +audio.id === +currentTrack.id));
        }

        // eslint-disable-next-line
    }, [isMounted, currentPlaylist, currentTrack]);

    const playHandler = () => {
        if (!activePlaylist) {
            dispatch(setCurrentPlaylist(playlist));
        }

        dispatch(setAudioPlay(!audioPlay));
    }

=======

    React.useEffect(() => {
        if (id) {
            setActivePlaylist(currentPlaylist.id === +id);
        }
    }, [currentPlaylist, id, audioPlay]);

	const playlist: IPlaylist = {
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
                    filt: "ghostemane",
                    title: "навсегда",
                    time: "00:00",
                    id: 849,
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                        { id: 473, name: "Scarlxrd", email: "sca@gmail.com", password: "djsadjnkj", avatar: "https://yt3.ggpht.com/fUURpYxD6ahN54w759yWSFNEi-m1ysahAq2slbmvRS6R7KsCGfqQEkJA6YBXaHJBW7qDSXMI_A=s900-c-k-c0x00ffffff-no-rj" }
                    ],
                    audio: GhScNg,
                    cover: "https://avatars.yandex.net/get-music-content/5282321/526c8737.a.17111695-1/200x200"
                },
                {
                    filt: "ghostemane",
                    title: "маг",
                    id: 321,
                    time: "00:00",
                    owners: [
                        { id: 231, name: "Ghostemane", email: "gh@gmail.com", password: "dsadnjkan", avatar: "https://www.verdammnis.com/img/uploads/2020/05/ghostemane3.jpg" },
                        { id: 473, name: "Scarlxrd", email: "sca@gmail.com", password: "djsadjnkj", avatar: "https://yt3.ggpht.com/fUURpYxD6ahN54w759yWSFNEi-m1ysahAq2slbmvRS6R7KsCGfqQEkJA6YBXaHJBW7qDSXMI_A=s900-c-k-c0x00ffffff-no-rj" }
                    ],
                    audio: GhScMg,
                    cover: "https://avatars.yandex.net/get-music-content/5282321/526c8737.a.17111695-1/200x200"
                }
            ],
            cover: "https://avatars.yandex.net/get-music-content/5282321/526c8737.a.17111695-1/200x200"
    };

    const playHandler = () => {
        dispatch(setAudioPlay(!audioPlay));

        if (!activePlaylist) {
            dispatch(setCurrentPlaylist(playlist));
        }
    }
    
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
    return (
		<MainLayout>
			<div className={classes.playlist}>
				<header className={classes.playlistHeader}>
                    <img src={playlist.cover} alt={`cover for ${playlist.title} playlist`} />
                    <div className={classes.playlistInfo}>
                        <div className={classes.playlistInfoTop}>
                            <h1 className={classes.playlistTitle}>{playlist.title}</h1>
                            <ul className={classes.playlistOwners}>
<<<<<<< HEAD
                                {playlist.owners.map((owner: any, index) => (
=======
                                {playlist.owners.map((owner:any, index) => (
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
                                    <li key={owner.id} className={classes.playlistOwnersItem}>
                                        <NavLink to={`/owners/${owner.id}`}>
                                            {`${owner.name}${index < playlist.owners.length - 1 ? ", " : ""}`}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            <span className={classes.playlistFilt}>
                                <NavLink to={`/tracks/${playlist.name}`}>{playlist.name}</NavLink>
                            </span>
                        </div>
                        <div className={classes.playlistActions}>
                            <Button
                                onClick={playHandler}
                                className={cn(classes.playlistPlay, classes.playlistActionsButton)}
                            >
<<<<<<< HEAD
                                {(!activePlaylist || (playShow && !audioPlay)) ? <PlayIcon /> : <PauseIcon />}
=======
                                {!audioPlay ? <PlayIcon /> : <PauseIcon /> }
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
                                <span>Слушать</span>
                            </Button>
                            <Button
                                background="WHITE"
                                className={cn(classes.playlistLike, classes.playlistActionsButton)}
                            >
                                <LikeIcon />
                            </Button>
                        </div>
                    </div>
                </header>
                <div className={classes.playlistAudio}>
                    <ul className={classes.playlistAudioList}>
                        {playlist.audios.map((audio: ITrack, index: number) => (
                            <Track
                                key={audio.id} 
                                track={audio}
                                index={index}
                                activeTrack={currentTrack.id === audio.id}
                            />
                        ))}
                    </ul>
                </div>
			</div>
		</MainLayout>
	);
};

export default Playlist;