import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainLayout from "src/components/Layouts/MainLayout";
import Track from "src/components/Track/Track";
import LoaderContext from "src/context/loader.context";
import useMounted from "src/hooks/useIsMounted";
import { getOneOwner } from "src/http/owners.http";
import { IPlaylist, ITrack } from "src/interfaces/audio.interfaces";
import { IOwner } from "src/interfaces/user.interface";
import { setCurrentPlaylist, setCurrentTrack } from "src/redux/actions/audio.actions";
import classes from "./Pages.module.sass";

const Owner = (): JSX.Element => {
    const [owner, setOwner] = React.useState<IOwner>({
        id: -1,
        name: "",
        audios: [],
        filts: [],
        avatar: ""
    });
    const [playlist, setPlaylist]= React.useState<IPlaylist>({
        name: "",
        id: -1,
        title: "",
        owners: [
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: ""
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
                        avatar: ""
                    }
                ],
                audio: "",
                cover: ""
            }
        ],
        cover: ""
    });

    const { id } = useParams();
    const isMounted = useMounted();
    
    const { setLoad } = React.useContext(LoaderContext);
    const { currentTrack } = useSelector((state: any) => state.audio);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (id && isMounted) {
            setLoad(true);
            getOneOwner(+id).then((response: any) => {
                setOwner(response.data.owner);

                const updatePlaylist = {
                    name: `all`,
                    id: 0,
                    title: `Все треки ${owner.name}`,
                    owners: [{...owner}],
                    audios: response.data.audios,
                    cover: "none"
                };

                setPlaylist(updatePlaylist);
            });
            
            setLoad(false);
        }

        // eslint-disable-next-line
    }, [isMounted, id]);

    return (
        <MainLayout>
            <div className={classes.owner}>
                <header className={classes.ownerHeader}>
                    <img className={classes.ownerHeaderAvatar} src={owner.avatar} alt={owner.name} />
                    <div className={classes.ownerHeaderInfo}>
                        <span className={classes.ownerHeaderInfoType}>исполнитель</span>
                        <h1 className={classes.ownerHeaderInfoName}>{owner.name}</h1>
                    </div>
                </header>
                <div className={classes.ownerBody}>
                    {(playlist.audios.length) ?
                        <React.Fragment>
                            <h2 className={classes.ownerBodyTitle}>Треки</h2>
                            <ul className={classes.ownerBodyTracksList}>
                                {playlist.audios.map((track: ITrack, index: number) => (
                                    <Track
                                        key={track.id}
                                        track={track}
                                        index={index}
                                        activeTrack={track.id === currentTrack.id}
                                    />
                                ))}
                            </ul>
                        </React.Fragment>
                        : <span className={classes.ownerBodyText}>
                            У этого исполнителя нет музыки
                        </span>
                    }
                </div>
            </div>
        </MainLayout>
    );
}

export default Owner;