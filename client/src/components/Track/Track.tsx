import classes from "./Track.module.sass";
import cn from "classnames";
import { ITrack } from "../../interfaces/audio.interfaces";
import Button from "../UI/Button/Button";
import { ReactComponent as PlayIcon } from "../../templates/svgs/play.svg";
import { ReactComponent as PauseIcon } from "../../templates/svgs/pause.svg";
import { ReactComponent as LikeIcon } from "../../templates/svgs/like.svg";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentTrack } from "../../redux/actions/audio.actions";
<<<<<<< HEAD
import Player from "../../services/Player";
import useMounted from "../../hooks/useIsMounted";
=======
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

interface ITrackProps {
    track: ITrack;
    index: number;
    activeTrack: boolean;
}

const Track = ({ track, index, activeTrack }: ITrackProps): JSX.Element => {
<<<<<<< HEAD
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const { audioPlay, idxTrack, currentPlaylist } = useSelector((state: any) => state.audio);
=======
    const { audioPlay } = useSelector((state: any) => state.audio);
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
    const dispatch = useDispatch();

    const [hover, setHover] = React.useState<boolean>(false);
    const [visibleActive, setVisibleActive] = React.useState<boolean>(audioPlay);
<<<<<<< HEAD
    let [idxCurrentTrack, setIdxCurrentTrack] = React.useState(idxTrack);

    const player = new Player(audioRef.current, idxCurrentTrack, currentPlaylist);
    const isMounted = useMounted();

    React.useEffect(() => {
        setIdxCurrentTrack(idxTrack);

        // eslint-disable-next-line
    }, [isMounted]);
=======
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830

    const playHandler = () => {
        dispatch(setAudioPlay(!audioPlay));
    
        if (!activeTrack) {
            dispatch(setCurrentTrack(track, false));
        }
    };

    const enterHandler = () => {
        setHover(true)
        setVisibleActive(false);
    }

    const leaveHandler = () => {
        setHover(false)
        setVisibleActive(true);
    }

    return (
        <li
            onMouseEnter={enterHandler}
            onMouseLeave={leaveHandler}
            className={cn(classes.track, {
                [classes.trackActive]: activeTrack || hover 
            })}
        >
            <div className={classes.left}>
<<<<<<< HEAD
                <audio
                    ref={audioRef}
                    style={{display: "none"}}
                    src={track.audio}
                />
=======
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
                <span className={classes.index}>{!activeTrack && index + 1}</span>
                {(activeTrack && visibleActive) && <span className={classes.activePlay}></span>}
                {hover && <Button className={classes.playButton} onClick={playHandler}>
                    {
                        (!activeTrack || !audioPlay) ?
                        <PlayIcon width={20} height={20} /> :
                        <PauseIcon width={20} height={20} style={{marginLeft: "-2px"}} />
                    }
                </Button>}
                <span className={classes.title}>{track.title}</span>
            </div>
            <div className={classes.right}>
                <button className={classes.likeButton}>
                    <LikeIcon width={20} height={20} />
                </button>
<<<<<<< HEAD
                <span className={classes.time}>{player.getTime()}</span>
=======
                <span className={classes.time}>{track.time}</span>
>>>>>>> 508dc407da35eae1d114c604f0ea20818d5bd830
            </div>
        </li>
    );
};

export default Track;