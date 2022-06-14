import classes from "./Player.module.sass";
import { NavLink } from "react-router-dom";
import React from "react";
import cn from "classnames";
<<<<<<< HEAD
import { IOwner } from "../../interfaces/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentTrack, setIdxTrack } from "../../redux/actions/audio.actions";
import Player from "../../services/Player";
import useMounted from "../../hooks/useIsMounted";
import { getOwnersByTrack } from "../../http/owners.http";
=======
import { IUser } from "../../interfaces/user.interface";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentTrack, setIdxTrack } from "../../redux/actions/audio.actions";
import Player from "../../services/Player";
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

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
<<<<<<< HEAD

const PlayerComponent = (): JSX.Element => {
    const volumeRef = React.useRef<HTMLInputElement>(null);
    const lineRef = React.useRef<HTMLSpanElement>(null);
    const wrapperLineRef = React.useRef<HTMLDivElement>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);
=======
import useMounted from "../../hooks/useIsMounted";

const PlayerComponent = (): JSX.Element => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const volumeRef = React.useRef<HTMLInputElement>(null);
    const lineRef = React.useRef<HTMLSpanElement>(null);
    const wrapperLineRef = React.useRef<HTMLDivElement>(null);
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

    const { currentTrack, audioPlay, idxTrack, currentPlaylist }: any = useSelector((state: any) => state.audio);
    const dispatch: any = useDispatch();

    const [visibleTime, setVisibleTime] = React.useState(false);
    const [visibleVolume, setVisibleVolume] = React.useState(false);
    const [muted, setMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(0.5);
    let [idxCurrentTrack, setIdxCurrentTrack] = React.useState(idxTrack);

    const player = new Player(audioRef.current, idxCurrentTrack, currentPlaylist);
    const timeTrack = player.getTime();
    const isMounted = useMounted();

<<<<<<< HEAD
    const [singers, setSingers] = React.useState<Array<IOwner>>([{
        id: -1,
        name: "",
        audios: [],
        filts: [],
        avatar: ""
    }]);

    React.useEffect(() => {
        isMounted && getOwnersByTrack(currentTrack.id).then(response => setSingers(response.data.owners));
        // eslint-disable-next-line
    }, [isMounted, currentTrack, idxTrack]);

    React.useEffect(() => {
        isMounted && setIdxCurrentTrack(idxTrack);
        // eslint-disable-next-line
    }, [isMounted, idxTrack]);

    React.useEffect(() => {
        isMounted && player.volume(muted);
        // eslint-disable-next-line
    }, [isMounted, muted]);

    React.useEffect(() => {
        isMounted && player.play(audioPlay, currentTrack.audio);
        // eslint-disable-next-line
    }, [isMounted, audioPlay, currentTrack.audio, idxTrack]);

    React.useEffect(() => {
        isMounted && player.init(currentTrack.audio, audioPlay);
        // eslint-disable-next-line
    }, [isMounted, idxTrack, currentTrack.audio]);

    const volumeRangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        if (!volumeRef.current) return;
        setVolume(+volumeRef.current.value);
        +volumeRef.current.value <= 0 ? setMuted(true) : setMuted(false);
=======
    React.useEffect(() => {
        if (isMounted) {
            player.play(audioPlay);
            player.volume(muted);
            setIdxCurrentTrack(idxTrack);
        }

        // eslint-disable-next-line
    }, [isMounted, audioPlay, currentTrack, muted, idxTrack]);

    const playHandler = () => {
        dispatch(setAudioPlay(!audioPlay));
    }

    const volumeRangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        if (!volumeRef.current) return;

        setVolume(+volumeRef.current.value);
        if (+volumeRef.current.value <= 0) {
            setMuted(true);
        } else {
            setMuted(false);
        }

>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
        player.volume(muted, event);
    }

    const mutedHandler = () => {
        if (!volumeRef.current || !audioRef.current) return;
<<<<<<< HEAD
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
=======

        setMuted(!muted);
        
        if (!muted) {
            setVolume(0);
        } else {
            setVolume(audioRef.current.volume);
        }
    }

    const endedTrackHandler = async() => {
        let copyIdx = idxCurrentTrack + 1;

        if (copyIdx > currentPlaylist.audios.length - 1) {
            copyIdx = 0;
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
        }

        dispatch(setIdxTrack(copyIdx));
        const nextTrack = currentPlaylist.audios[copyIdx];
        dispatch(setCurrentTrack(nextTrack, true));
    }

<<<<<<< HEAD
    const endedHandler = () => {
        let copyIdx = idxCurrentTrack + 1;

        if (copyIdx > currentPlaylist.audios.length - 1) copyIdx = 0;
=======
    const switchTrack = (side: "PREV" | "NEXT") => {
        let copyIdx = idxCurrentTrack;

        if (side === "PREV") {
            copyIdx--;
            if (copyIdx < 0) {
                copyIdx = currentPlaylist.audios.length - 1;
            }
        } else {
            copyIdx++;
            if (copyIdx > currentPlaylist.audios.length - 1) {
                copyIdx = 0;
            }
        }
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

        dispatch(setIdxTrack(copyIdx));
        const nextTrack = currentPlaylist.audios[copyIdx];
        dispatch(setCurrentTrack(nextTrack, true));
    }

    return (
        <div className={classes.player} onMouseLeave={() => setVisibleVolume(false)}>
            <audio
<<<<<<< HEAD
                style={{display: "none"}}
                ref={audioRef}
                onTimeUpdate={() => player.changeLine(lineRef.current)}
                onEnded={endedHandler}
            />
=======
                onTimeUpdate={() => player.changeLine(lineRef.current)}
                onEnded={endedTrackHandler}
                ref={audioRef}
                style={{display: "none"}}
                src={currentTrack.audio}
            ></audio>
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
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
<<<<<<< HEAD
                            onClick={() => dispatch(setAudioPlay(!audioPlay))}
=======
                            onClick={playHandler}
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
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
<<<<<<< HEAD
                                {singers.map((owner: IOwner, index: number) => (
=======
                                {currentTrack.owners.map((owner: IUser, index: number) => (
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
                                    <NavLink key={owner.id} to={`/users/${owner.name}`}>
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