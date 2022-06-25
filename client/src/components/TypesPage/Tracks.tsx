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
                {tracks.map((audio, index) => (
                    <Track
                        key={audio.id}
                        index={index}
                        track={audio}
                        activeTrack={currentTrack.id === audio.id}
                        playlist={playlist}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Tracks;