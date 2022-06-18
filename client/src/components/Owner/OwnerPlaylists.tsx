import PlaylistComponent from "src/components/PlayListComponent/PlayListComponent";
import { IPlaylist } from "src/interfaces/audio.interfaces";
import classes from "src/pages/Pages.module.sass";

interface IOwnerPlaylistsProps {
    playlists: Array<IPlaylist>;
}

const OwnerPlaylists = ({ playlists }: IOwnerPlaylistsProps) => {
    return (
        <div>
            <h2 className={classes.ownerBodyTitle}>Плейлисты</h2>
            <ul className={classes.ownerBodyPlaylistsList}>
                {playlists.map((playlist: IPlaylist) => (
                    <PlaylistComponent
                        key={playlist.id}
                        {...playlist}
                    />
                ))}
            </ul>
        </div>
    )
}

export default OwnerPlaylists