import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import MainLayout from "src/components/Layouts/MainLayout";
import LoaderContext from "src/context/loader.context";
import useMounted from "src/hooks/useIsMounted";
import { getOneOwner } from "src/http/owners.http";
import { IPlaylist, ITrack } from "src/interfaces/audio.interfaces";
import { IOwner } from "src/interfaces/user.interface";
import classes from "./Pages.module.sass";
import cn from "classnames";
import Tracks from "src/components/TypesPage/Tracks";
import Playlists from "src/components/TypesPage/Playlists";
import ModalContext from "src/context/modal.context";
import Modal from "src/components/UI/Modal/Modal";

const Owner = (): JSX.Element => {
    const [owner, setOwner] = React.useState<IOwner>({
        id: -1,
        name: "",
        audios: [],
        filts: [],
        avatar: "",
        playlists: []
    });
    const [playlists, setPlaylists] = React.useState<Array<IPlaylist>>([{
        name: "",
        id: -1,
        title: "",
        owners: [
            {
                id: -1,
                name: "",
                audios: [],
                filts: [],
                avatar: "",
                playlists: []
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
                        avatar: "",
                        playlists: []
                    }
                ],
                audio: "",
                cover: ""
            }
        ],
        cover: ""
    }]);
    const [tracks, setTracks] = React.useState<Array<ITrack>>([{
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
                        avatar: "",
                        playlists: []
                    }
                ],
                audio: "",
                cover: ""
    }]);
    const currentPlaylist: IPlaylist = {
        name: `${owner.name}-all`,
        id: 0,
        title: `Все треки ${owner.name}`,
        owners: [{...owner}],
        audios: tracks,
        cover: "none"
    };

    const { type, id } = useParams();
    const { pathname } = useLocation();
    const isMounted = useMounted();

    const { setLoad } = React.useContext(LoaderContext);
    const { setVisible } = React.useContext(ModalContext);

    const linksRoutes = [
        {
            name: "Плейлисты",
            url: `/owner/${id}/playlists`
        },
        {
            name: "Треки",
            url: `/owner/${id}/tracks`
        }
    ];

    React.useEffect(() => {
        if (id && isMounted) {
            setLoad(true);
            getOneOwner(+id).then((response: any) => {
                setOwner(response.data.owner);
                setTracks(response.data.audios);
                setPlaylists(response.data.playlists);
            });
            setLoad(false);
        }
        
        // eslint-disable-next-line
    }, [isMounted, id, pathname]);

    return (
        <MainLayout>
            <Modal>
                <img src={owner.avatar} alt={owner.name} />
            </Modal>
            <div className={classes.owner}>
                <header className={classes.ownerHeader}>
                    <img
                        onClick={() => setVisible(true)}
                        className={classes.ownerHeaderAvatar}
                        src={owner.avatar}
                        alt={owner.name}
                    />
                    <div className={classes.ownerHeaderInfo}>
                        <span className={classes.ownerHeaderInfoType}>исполнитель</span>
                        <h1 className={classes.ownerHeaderInfoName}>{owner.name}</h1>
                    </div>
                </header>
                <div className={classes.ownerBody}>
                    <header className={classes.ownerBodyHeader}>
                        <nav className={classes.ownerBodyNav}>
                            <ul className={classes.ownerBodyNavList}>
                                {linksRoutes.map(link => (
                                    <li
                                        key={link.url}
                                        className={cn(classes.ownerBodyNavItem, {
                                            [classes.ownerBodyNavItemActive]: link.url === pathname
                                        })}
                                    >
                                        <NavLink to={link.url}>{link.name}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </header>
                    {type === "tracks" && <Tracks playlist={currentPlaylist} tracks={tracks} />}
                    {type === "playlists" && <Playlists playlists={playlists} />}
                </div>
            </div>
        </MainLayout>
    );
}

export default Owner;