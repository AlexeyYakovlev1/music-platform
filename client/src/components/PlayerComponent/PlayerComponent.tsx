import classes from "./Player.module.sass";
import { NavLink } from "react-router-dom";
import React from "react";
import cn from "classnames";
import { IOwner } from "../../interfaces/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentTrack, setIdxTrack } from "../../redux/actions/audio.actions";
import Player from "../../services/Player";
import useMounted from "../../hooks/useIsMounted";
import { getOwnersByTrack } from "../../http/owners.http";

// templates
import { ReactComponent as MutedIcon } from "../../templates/svgs/muted.svg";
import { ReactComponent as PlayIcon } from "../../templates/svgs/play.svg";
import { ReactComponent as PauseIcon } from "../../templates/svgs/pause.svg";
import { ReactComponent as PlayListIcon } from "../../templates/svgs/playlist.svg";
import { ReactComponent as VolumeIcon } from "../../templates/svgs/volume.svg";
import { ReactComponent as PreviousIcon } from "../../templates/svgs/prev.svg";
import { ReactComponent as LikeIcon } from "../../templates/svgs/like.svg";
import { ReactComponent as PlusIcon } from "../../templates/svgs/plus.svg";
import { ReactComponent as ShareIcon } from "../../templates/svgs/share.svg";
import LoaderContext from "src/context/loader.context";

const PlayerComponent = (): JSX.Element => {
    const volumeRef = React.useRef<HTMLInputElement>(null);
    const lineRef = React.useRef<HTMLSpanElement>(null);
    const wrapperLineRef = React.useRef<HTMLDivElement>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const { currentTrack, audioPlay, idxTrack, currentPlaylist }: any = useSelector((state: any) => state.audio);
    const dispatch: any = useDispatch();

    const [visibleTime, setVisibleTime] = React.useState(false);
    const [visibleVolume, setVisibleVolume] = React.useState(false);
    const [muted, setMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(0.5);
    let [idxCurrentTrack, setIdxCurrentTrack] = React.useState(idxTrack);

    const player = new Player(audioRef.current, idxTrack, currentPlaylist);
    const timeTrack = player.getTime();
    const isMounted = useMounted();
    const { setLoad } = React.useContext(LoaderContext);

    const [singers, setSingers] = React.useState<Array<IOwner>>([{
        id: -1,
        name: "",
        audios: [],
        filts: [],
        avatar: "",
        playlists: []
    }]);

    React.useEffect(() => {
        setLoad(true);
        isMounted && getOwnersByTrack(currentTrack.id).then(response => setSingers(response.data.owners));
        setLoad(false);
        // eslint-disable-next-line
    }, [isMounted, currentTrack, idxTrack]);

    React.useEffect(() => {
        setLoad(true);
        isMounted && setIdxCurrentTrack(idxTrack);
        setLoad(false);
        // eslint-disable-next-line
    }, [isMounted, idxTrack]);

    React.useEffect(() => {
        setLoad(true);
        isMounted && player.volume(muted);
        setLoad(false);
        // eslint-disable-next-line
    }, [isMounted, muted]);

    React.useEffect(() => {
        setLoad(true);
        if (isMounted) {
            player.play(audioPlay, currentTrack.audio);
        }
        setLoad(false);
        // eslint-disable-next-line
    }, [isMounted, audioPlay, currentTrack.audio, idxTrack, currentPlaylist]);

    React.useEffect(() => {
        setLoad(true);
        isMounted && player.init(currentTrack.audio);
        setLoad(false);
        // eslint-disable-next-line
    }, [isMounted, currentTrack.audio, currentPlaylist]);

    const volumeRangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        if (!volumeRef.current) return;
        setVolume(+volumeRef.current.value);
        +volumeRef.current.value <= 0 ? setMuted(true) : setMuted(false);
        player.volume(muted, event);
    }

    const mutedHandler = () => {
        if (!volumeRef.current || !audioRef.current) return;
        setMuted(!muted);
        !muted ? setVolume(0) : setVolume(audioRef.current.volume);
    }

    const switchTrack = (side: "PREV" | "NEXT") => {
        let copyIdx = idxCurrentTrack;
        
        if (side === "PREV") {
            copyIdx--;
            if (copyIdx < 0) copyIdx = currentPlaylist.audios.length - 1;
        } else {

            copyIdx++;
            if (copyIdx > currentPlaylist.audios.length - 1) copyIdx = 0;
        }

        dispatch(setIdxTrack(copyIdx));
        const nextTrack = currentPlaylist.audios[copyIdx];
        dispatch(setCurrentTrack(nextTrack, true));
    }

    const endedHandler = () => {
        let copyIdx = idxCurrentTrack + 1;

        if (copyIdx > currentPlaylist.audios.length - 1) copyIdx = 0;

        dispatch(setIdxTrack(copyIdx));
        const nextTrack = currentPlaylist.audios[copyIdx];
        dispatch(setCurrentTrack(nextTrack, true));
    }

    return (
        <div className={classes.player} onMouseLeave={() => setVisibleVolume(false)}>
            <audio
                style={{display: "none"}}
                ref={audioRef}
                onTimeUpdate={() => player.changeLine(lineRef.current)}
                onEnded={endedHandler}
            />
            <div
                ref={wrapperLineRef}
                className={classes.top}
                onClick={event => player.setProgress(wrapperLineRef.current, event)}
                onMouseEnter={() => setVisibleTime(true)}
                onMouseLeave={() => setVisibleTime(false)}
            >
                <span className={classes.line} ref={lineRef}></span>
                <span className={cn(classes.time, {
                    [classes.timeVisible]: visibleTime
                })}>
                    {timeTrack}
                </span>
            </div>
            <div className={classes.down}>
                <div className={classes.left}>
                    <div className={classes.actions}>
                        <button
                            onClick={() => switchTrack("PREV")}
                            className={classes.actionsButton}
                            title="Предыдущий трек"
                        >
                            <PreviousIcon />
                        </button>
                        <button
                            onClick={() => dispatch(setAudioPlay(!audioPlay))}
                            className={classes.actionsButton}
                            title="Играть/Пауза"
                        >
                            {!audioPlay ? <PlayIcon /> : <PauseIcon />}
                        </button>
                        <button
                            style={{transform: "rotate(180deg)"}}
                            onClick={() => switchTrack("NEXT")}
                            className={classes.actionsButton}
                            title="Следующий трек"
                        >
                            <PreviousIcon />
                        </button>
                        <button className={classes.actionsButton} title="Плейлист воспроизведения">
                            <PlayListIcon />
                        </button>
                    </div>
                    <div className={classes.music}>
                        <NavLink to="/">
                            <img width={50} height={50} src={currentTrack.cover} alt="cover" />
                        </NavLink>
                        <div className={classes.musicInfo}>
                            <span className={classes.name}>
                                <NavLink to="/">{currentTrack.title}</NavLink>
                            </span>
                            <span className={classes.owner}>
                                {singers.map((owner: IOwner, index: number) => (
                                    <NavLink key={owner.id} to={`/owner/playlists/${owner.name}`}>
                                        {`${owner.name}${index < currentTrack.owners.length - 1 ? ", " : ""}`}
                                    </NavLink>
                                ))}
                            </span>
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <button className={classes.actionsButton} title="Добавьте текущий трек в коллекцию">
                            <LikeIcon />
                        </button>
                        <button className={classes.actionsButton} title="Добавить в плейлист">
                            <PlusIcon />
                        </button>
                        <button className={classes.actionsButton} title="Поделиться треком">
                            <ShareIcon />
                        </button>
                    </div>
                </div>
                <div className={classes.right}>
                    {visibleVolume && <div className={classes.volume}>
                        <input
                            ref={volumeRef}
                            onChange={volumeRangeHandler}
                            max="1"
                            min="0"
                            value={volume}
                            step="0.01"
                            className={classes.volumeInput}
                            type="range"
                        />
                    </div>}
                    <button
                        onMouseEnter={() => setVisibleVolume(true)}
                        title="Настроить звук"
                        className={classes.actionsButton}
                        onClick={mutedHandler}
                    >
                        {muted ? <MutedIcon /> : <VolumeIcon />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlayerComponent;