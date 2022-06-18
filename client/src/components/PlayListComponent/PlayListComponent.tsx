import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./PlayList.module.sass";
import cn from "classnames";
import { ITrack } from "../../interfaces/audio.interfaces";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPlaylist, setCurrentTrack } from "../../redux/actions/audio.actions";

// templates
import { ReactComponent as HeartIcon } from "../../templates/svgs/like.svg";
import { ReactComponent as PlayIcon } from "../../templates/svgs/play.svg";
import { ReactComponent as ShareIcon } from "../../templates/svgs/share.svg";
import { ReactComponent as PauseIcon } from "../../templates/svgs/pause.svg";
import { IOwner } from "../../interfaces/user.interface";
import { getInfo } from "../../http/playlists.http";
import useMounted from "src/hooks/useIsMounted";
import LoaderContext from "src/context/loader.context";

export interface IPlayListProps {
    id: number;
    title: string;
    cover: string;
    owners: Array<number | IOwner>;
    name: string;
}

const PlaylistComponent = ({ id, title, cover, owners, name }: IPlayListProps): JSX.Element => {
    const { currentPlaylist, audioPlay } = useSelector((state: any) => state.audio);
    const dispatch = useDispatch();

    const { setLoad } = React.useContext(LoaderContext);

    const [hover, setHover] = React.useState<boolean>(false);
    const [activePlaylist, setActivePlaylist] = React.useState<boolean>(currentPlaylist.id === id);
    const [tracks, setTracks] = React.useState<Array<ITrack>>([{
        duration: "00:00",
        filt: "",
        title: "",
        id: -1,
        owners: [{
            id: -1,
            name: "",
            audios: [],
            filts: [],
            avatar: "",
            playlists: []
        }],
        audio: "",
        cover: ""
    }]);
    const [singers, setSingers] = React.useState<Array<IOwner>>([{
        id: -1,
        name: "",
        audios: [],
        filts: [],
        avatar: "",
        playlists: []
    }]);

    const isMounted = useMounted();

    React.useEffect(() => {
        if (id > 0 && isMounted) {
            setLoad(true);
            getInfo(id).then((response: any) => {
                setTracks(response.data.audios);
                setSingers(response.data.owners);
            });
            setActivePlaylist(currentPlaylist.id === id);
            setLoad(false);
        }

        // eslint-disable-next-line
    }, [isMounted, id, currentPlaylist]);

    const playHandler = async() => {
        dispatch(setCurrentTrack(tracks[0], false));
        dispatch(setCurrentPlaylist({ id, cover, title, owners: singers, audios: tracks, name }));
    }

    return (
        <li
            className={cn(classes.item, {
                [classes.itemActive]: hover
            })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className={cn(classes.photo, {
                [classes.photoActive]: (activePlaylist && audioPlay) || hover
            })}>
                {hover && <div className={classes.actions}>
                    <button className={cn(classes.actionsButton, classes.buttonLike)}>
                        <HeartIcon />
                    </button>
                    <button
                        onClick={playHandler}
                        className={cn(classes.actionsButton, classes.buttonPlay)}
                    >
                        {(activePlaylist && audioPlay) ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button className={cn(classes.actionsButton, classes.buttonShare)}>
                        <ShareIcon />
                    </button>
                </div>}
                {(activePlaylist && audioPlay) && <div className={classes.activePlay}></div>}
                <img
                    className={classes.cover}
                    src={cover}
                    alt="cover"
                />
            </div>
            <div className={classes.body}>
                <h3 className={classes.title}>
                    <NavLink to={`/playlist/${id}`}>{title}</NavLink>
                </h3>
                <span className={classes.owner}>
                    {singers.map((owner, index) => {
                        return (
                            <NavLink key={owner.id} to={`/owner/playlists/${owner.id}`}>
                                {`${owner.name}${index < owners.length - 1 ? ", " : ""}`}
                            </NavLink>
                        )
                    })}
                </span>
            </div>
        </li>
    );
};

export default PlaylistComponent;