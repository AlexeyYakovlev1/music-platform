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
import Track from "../components/Track/Track";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentPlaylist } from "../redux/actions/audio.actions";
import { getInfo } from "src/http/playlists.http";
import useMounted from "src/hooks/useIsMounted";
import LoaderContext from "src/context/loader.context";

const Playlist = (): JSX.Element => {
    const { id } = useParams();
    const { currentTrack, currentPlaylist, audioPlay } = useSelector((state: any) => state.audio);
    const dispatch = useDispatch();

    const [activePlaylist, setActivePlaylist] = React.useState<boolean>(currentPlaylist.id === id);
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
                avatar: "",
                playlists: []
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
                        avatar: "",
                        playlists: []
                    }
                ],
                audio: "",
                cover: ""
            }
        ],
        cover: ""
    });
    const [playShow, setPlayShow] = React.useState<boolean>(true);
    const isMounted = useMounted();
    const { setLoad } = React.useContext(LoaderContext);

    if (!playlist.id) {
        setLoad(true);
    }

    React.useEffect(() => {
        if (id && isMounted) {
            setLoad(true);
            getInfo(+id).then((response: any) => {
                setPlaylist({
                    ...response.data.playlist,
                    audios: response.data.audios,
                    owners: response.data.owners
                });
            });
            setActivePlaylist(currentPlaylist.id === +id);
            setLoad(false);
        }

        // eslint-disable-next-line
    }, [isMounted, currentPlaylist, id, audioPlay, currentTrack]);

    React.useEffect(() => {
        if (id && isMounted) {
            setLoad(true);
            if (playlist.audios.some((audio: any) => +audio.id === +currentTrack.id)) {
                setPlayShow(false);
                setPlayShow(!audioPlay);
            }
            setLoad(false);
        }

        // eslint-disable-next-line
    }, [isMounted, id, audioPlay, currentPlaylist, currentTrack]);

    const playHandler = () => {
        if (!activePlaylist) {
            dispatch(setCurrentPlaylist(playlist));
            dispatch(setAudioPlay(true));
        } else {
            dispatch(setAudioPlay(!audioPlay));
        }
    }

    return (
		<MainLayout>
			<div className={classes.playlist}>
				<header className={classes.playlistHeader}>
                    <img src={playlist.cover} alt={`cover for ${playlist.title} playlist`} />
                    <div className={classes.playlistInfo}>
                        <div className={classes.playlistInfoTop}>
                            <h1 className={classes.playlistTitle}>{playlist.title}</h1>
                            <ul className={classes.playlistOwners}>
                                {playlist.owners.map((owner: any, index) => (
                                    <li key={owner.id} className={classes.playlistOwnersItem}>
                                        <NavLink to={`/owner/playlists/${owner.id}`}>
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
                                {playShow ? <PlayIcon /> : <PauseIcon />}
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
                                playlist={playlist}
                            />
                        ))}
                    </ul>
                </div>
			</div>
		</MainLayout>
	);
};

export default Playlist;