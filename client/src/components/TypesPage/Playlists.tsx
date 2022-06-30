import PlaylistComponent from "src/components/PlayListComponent/PlayListComponent";
import { IPlaylist } from "src/interfaces/audio.interfaces";
import classes from "src/pages/Pages.module.sass";

interface IPlaylistsProps {
    playlists: Array<IPlaylist>;
}

const Playlists = ({ playlists }: IPlaylistsProps) => {
    return (
        <div>
            <h2 className={classes.ownerBodyTitle}>Плейлисты</h2>
            <ul className={classes.ownerBodyPlaylistsList}>
                {playlists.length ? playlists.map((playlist: IPlaylist) => (
                    <PlaylistComponent
                        key={playlist.id}
                        {...playlist}
                    />
                )) : <h3
                        style={{fontSize: "18px", paddingLeft: "10px"}}
                        className={classes.ownerBodyTitle}
                    >
                        Ничего нет
                    </h3>}
            </ul>
        </div>
    )
}

export default Playlists;