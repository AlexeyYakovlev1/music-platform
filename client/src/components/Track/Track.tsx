import classes from "./Track.module.sass";
import cn from "classnames";
import { IPlaylist, ITrack } from "../../interfaces/audio.interfaces";
import Button from "../UI/Button/Button";
import { ReactComponent as PlayIcon } from "../../templates/svgs/play.svg";
import { ReactComponent as PauseIcon } from "../../templates/svgs/pause.svg";
import { ReactComponent as LikeIcon } from "../../templates/svgs/like.svg";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAudioPlay, setCurrentPlaylist, setCurrentTrack, setIdxTrack } from "../../redux/actions/audio.actions";

interface ITrackProps {
    track: ITrack;
    index: number;
    activeTrack: boolean;
    playlist: IPlaylist;
}

const Track = ({ track, index, activeTrack, playlist }: ITrackProps): JSX.Element => {
    const { audioPlay } = useSelector((state: any) => state.audio);
    const dispatch = useDispatch();

    const [hover, setHover] = React.useState<boolean>(false);
    const [visibleActive, setVisibleActive] = React.useState<boolean>(audioPlay);

    const playHandler = () => {
        if (!activeTrack) {
            dispatch(setIdxTrack(index));
            dispatch(setCurrentPlaylist(playlist));
            dispatch(setCurrentTrack(track, true));
            dispatch(setAudioPlay(true));
        } else {
            dispatch(setAudioPlay(!audioPlay));
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
                <span className={classes.index}>{!activeTrack && index + 1}</span>
                {(activeTrack && visibleActive && audioPlay) && <span className={classes.activePlay}></span>}
                {(hover || (activeTrack && !audioPlay)) && <Button className={classes.playButton} onClick={playHandler}>
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
                <span className={classes.time}>{track.duration}</span>
            </div>
        </li>
    );
};

export default Track;