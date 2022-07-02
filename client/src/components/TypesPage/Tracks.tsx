import { useSelector } from "react-redux";
import Track from "src/components/Track/Track";
import { IPlaylist, ITrack } from "src/interfaces/audio.interfaces";
import classes from "src/pages/Pages.module.sass";

interface ITracksProps {
    tracks: Array<ITrack>;
    playlist: IPlaylist;
}

const Tracks = ({ tracks, playlist }: ITracksProps) => {
    const { currentTrack } = useSelector((state: any) => state.audio);
    
    return (
        <div>
            <h2 className={classes.ownerBodyTitle}>Треки</h2>
                <ul className={classes.ownerBodyTracksList}>
                {(tracks && tracks.length) ? tracks.map((audio: ITrack, index) => (
                    <Track
                        key={audio.id}
                        index={index}
                        track={audio}
                        activeTrack={currentTrack.id === audio.id}
                        playlist={playlist}
                    />
                )) : <h3
                        style={{fontSize: "18px", paddingLeft: "20px"}}
                        className={classes.ownerBodyTitle}
                    >
                        Ничего нет
                    </h3>}
            </ul>
        </div>
    )
}

export default Tracks;